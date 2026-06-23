import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Prevent server process from crashing and failing to respond with JSON.
process.on("uncaughtException", (err) => {
  console.error("GLOBAL UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (reason, promise) => {
  console.error("GLOBAL UNHANDLED REJECTION AT:", promise, "REASON:", reason);
});

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load Gemini client to prevent server from crashing when API key is missing.
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(customKey?: string): GoogleGenAI {
  const apiKey = customKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY가 설정되지 않았습니다. AI Studio 우측 상단의 Settings > Secrets 메뉴에서 GEMINI_API_KEY를 등록하거나, 화면에 유효한 API Key를 직접 입력해 주세요.");
  }
  
  if (!customKey && aiClient) {
    return aiClient;
  }

  const client = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  if (!customKey) {
    aiClient = client;
  }
  return client;
}

// Robust fallback wrapper for generating content across multiple Google Gemini models
async function generateContentWithFallback(
  ai: GoogleGenAI,
  options: {
    contents: string | any[];
    config?: any;
  }
) {
  // Ordered candidate list from preferred to highly-available fallback options.
  const models = [
    "gemini-3.5-flash",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite"
  ];

  let lastError: any = null;

  for (const modelName of models) {
    try {
      console.log(`[Gemini Fallback Engine] Attempting model: ${modelName}`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: options.contents,
        config: options.config,
      });
      console.log(`[Gemini Fallback Engine] Success with model: ${modelName}`);
      return response;
    } catch (err: any) {
      const errMsg = (err.message || "").toUpperCase();
      console.warn(`[Gemini Fallback Engine] Model ${modelName} failed. Error:`, err.message || err);
      
      lastError = err;

      // Fast-fail if the key is explicitly invalid to prevent wasteful retries
      if (
        errMsg.includes("API_KEY_INVALID") || 
        errMsg.includes("INVALID_ARGUMENT") || 
        errMsg.includes("API KEY NOT VALID") ||
        errMsg.includes("KEY_INVALID")
      ) {
        throw err;
      }
    }
  }

  throw lastError || new Error("All candidate models failed to produce content.");
}

// 1. Health & Config Status Endpoint
app.get("/api/status", (req, res) => {
  const hasApiKey = !!process.env.GEMINI_API_KEY;
  res.json({
    status: "ok",
    hasApiKey,
    message: hasApiKey 
      ? "AI 시스템이 정상 작동 중입니다." 
      : "GEMINI_API_KEY 부족. 우측 상단의 Secrets에서 설정해 주세요."
  });
});

// Added Endpoint: Real-time Gemini API Key Verification
app.post("/api/verify-key", async (req, res) => {
  const { apiKey } = req.body;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
    return res.status(400).json({ valid: false, error: "API Key를 올바르게 입력하지 않았습니다." });
  }

  try {
    const testGen = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    // Make an execution test call to verify is valid key using fallback models
    const testRep = await generateContentWithFallback(testGen, {
      contents: "Confirm key",
    });

    if (testRep && testRep.text) {
      return res.json({ valid: true, message: "API Key가 유효하며 성공적으로 승인되었습니다!" });
    } else {
      return res.status(400).json({ valid: false, error: "API Key 검증 호출에서 빈 응답이 반환되었습니다." });
    }
  } catch (error: any) {
    console.error("API Key Verification Error:", error);
    let detailedMsg = "유효하지 않은 API Key이거나 네트워크에 장애가 발생했습니다.";
    if (error?.message) {
      detailedMsg = error.message;
      try {
        const jsonMatch = error.message.match(/({[\s\S]*})/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed?.error?.message) {
            detailedMsg = parsed.error.message;
          }
        }
      } catch (e) {
        // ignore
      }
    }
    return res.status(400).json({ valid: false, error: detailedMsg });
  }
});

// Master Prompt configuration for AI assistant
const SYSTEM_INSTRUCTION = `
당신은 대한민국 고용노동부 산하 공공 고용센터에서 근무하는 직업상담사를 보조하는 전문적인 '초기상담 보조 AI 어시스턴트'입니다.
본 시스템은 공공기관 직업상담사가 내담자와의 초기 면담 내용을 기록하고, 최적의 지원제도가 무엇인지 검토하도록 돕는 정교한 실무 도구입니다.

반드시 다음 기본 원칙을 엄격하게 준수하여 작성해야 합니다:

1. 모든 분류, 해석, 연계 제안은 '참고용 초안'이며, 실제 지원요건 부합 여부 및 최종 연계 시행 등 최종 판단과 책임은 전적으로 상담사에게 있음을 상기하는 "주의문구"를 양식에 맞춰 무조건 기재하세요.
2. 입력 내용에 내담자의 실명, 주민등록번호, 연락처, 세부 주소 등 식별 가능한 개인정보가 노출되어 있을 경우, 분석 결과나 요약문 등 답변 어디에도 이를 다시 노출시키지 말고 오직 '내담자' 혹은 '관리번호'로 통일하여 대체하십시오.
3. 내담자에 대해 어떠한 정신질환 진단도 함부로 내리지 마십시오. (예: 우울증, 불안장애, 공황장애, 무기력증 환자 등으로 단정 금지). 내담자의 심리 상태는 오직 "면찰 중 관찰된 행동 및 진술된 표현" 수준(예: '비슷한 일을 수차례 거절당해 면접에 대한 두려움을 토로함', '장기 구직으로 지치고 위축된 어조를 보임')으로만 객관적으로 진술하십시오.
4. 내담자에 대해 추측성 주관적 낙인, 평가적 표현은 절대적으로 차단하십시오.
   - 절대 사용 불가능한 금지 표현: '의지가 없다', '게으르다', '성격이 부적합하다', '사회성이 심각하게 떨어진다', '눈이 너무 높다', '자존감이 없다' 등
   - 사용해아 하는 바람직한 사실 중심적 표현:
     - '비선호 직종 재진입을 피하고자 하여 희망 직무 선정 시 다소 조심스러운 반응을 보임'
     - '지원 경험 부족으로 인해 채용 프로세스 및 구직 절차 전반에 대한 추가적 가이드가 요구됨'
     - '장기간의 경력 공백 이후 노동 시장 재진입에 관한 깊은 부담감 및 불안감을 언급함'
5. 반드시 정중하고 객관적인 공공기관 표준 한국어 보고서 문체(개조식 문장, '~함', '~임', '~음' 또는 격식체를 적절히 활용한 완성도 높은 표현)로 기재하십시오.
6. 입력 자료에 전혀 등장하지 않거나 사실 관계가 성립되지 않는 사항은 임의로 허구적으로 꾸며내어 서술해선 안 됩니다. 정보가 결여된 영역은 무리하여 지어내지 말고 "정보 부족" 또는 "미확정"으로 일관되게 반환하십시오.
7. 국민취업지원제도, 구직자도약패키지, 직업훈련 등 각종 제도의 참여 대상 자격요건을 AI 수준에서 자의적으로 도장 찍듯 확정하지 마십시오. 반드시 '상담사가 수급 자격을 철저히 확인하여 적합 여부 최종 확정해야 함' 또는 '연계 가능성에 관한 집중 검토 권장' 구조로 기술하십시오.
8. 제공되는 모드별 규격 포맷을 어기지 말고, 키와 구조가 일치하는 JSON 또는 요청된 규격 텍스트로 결과를 충실히 출력하십시오.
`;

// Helper list of valid modes
const VALID_MODES = ["PRE_SURVEY", "CLASSIFY", "LOG", "PSYCH_INTERPRET", "SERVICE_LINK"];

// Endpoint to process counseling text with Gemini AI
app.post("/api/counsel", async (req, res) => {
  const { text, mode: requestedMode, customApiKey } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "상담 또는 설문 내용을 입력해 주세요." });
  }

  try {
    let mode = requestedMode || "AUTO";
    
    // Automatically match or detect the mode if the text contains [MODE: MODENAME] or if mode is AUTO
    const tagMatch = text.match(/\[MODE:\s*(PRE_SURVEY|CLASSIFY|LOG|PSYCH_INTERPRET|SERVICE_LINK)\]/i);
    if (tagMatch) {
      mode = tagMatch[1].toUpperCase();
    } else if (mode === "AUTO") {
      // We will let Gemini auto-classify the content.
      // But we can also do a quick heuristic check to override if the user omitted tags:
      if (text.includes("점수") || text.includes("검사") || text.includes("프로파일")) {
        mode = "PSYCH_INTERPRET";
      } else if (text.includes("설문") || text.includes("사전 정보") || text.includes("희망직무")) {
        mode = "PRE_SURVEY";
      } else if (text.includes("상담일지") || text.includes("회차") || text.includes("상담목표")) {
        mode = "LOG";
      } else if (text.includes("미결정") || text.includes("유형") || text.includes("결정성")) {
        mode = "CLASSIFY";
      } else if (text.includes("연계") || text.includes("지원제도") || text.includes("국취")) {
        mode = "SERVICE_LINK";
      } else {
        // Default to a balanced general service link or logging analysis
        mode = "CLASSIFY"; 
      }
    }

    const clientKey = customApiKey || (req.headers["x-custom-api-key"] as string);
    const ai = getGeminiClient(clientKey);

    let textPrompt = "";
    let responseMimeType = "text/plain";
    let responseSchema: any = undefined;

    // Build the specialized instructional prompts according to the Mode rules in the markdown specification
    if (mode === "PRE_SURVEY") {
      responseMimeType = "application/json";
      textPrompt = `
      [서비스 종류: MODE 1: 사전 정보수집·설문 요약 (PRE_SURVEY)]
      입력된 구직자의 사전 설문 응답을 근거로 분석 요약 보고서를 작성하십시오.

      출력 JSON 규격:
      {
        "핵심이슈_3가지": ["1번 핵심이슈", "2번 핵심이슈", "3번 핵심이슈"],
        "희망직무_또는_분야": "구직자가 희망하고 있는 상세 직무군 또는 분야(미정인 경우 '희망직무 미정')",
        "경력_역량_요약": "학력, 자격증, 유관 경험, 아르바이트, 교육수강 내역 등을 단정적이지 않게 요약한 단락",
        "상담시_확인할_질문": ["질문 1", "질문 2", "질문 3"],
        "연계검토_필요영역": ["국민취업지원제도" 및 "구직자도약패키지", "심리안정프로그램", "직업훈련", "기타" 중 해당 가능성 있는 항목만 배열 형태로 선택]
      }

      작성 원칙:
      - 핵심이슈는 반드시 설문 응답 내용에서 확인 가능한 팩트 기반이어야 합니다.
      - 상담 시 확인할 심층 질문은 누락된 정보나 구체적 보완이 필요한 부분을 향해 우아하고 실무적으로 도출하십시오.
      
      입력 내용:
      ${text}
      `;
    } else if (mode === "CLASSIFY") {
      responseMimeType = "application/json";
      textPrompt = `
      [서비스 종류: MODE 2: 진로미결정 유형 및 원인 분류 보조 (CLASSIFY)]
      입력된 상담 기록이나 대화 요약을 정밀 분석하여 내담자가 겪는 진로 장벽/진로미결정의 원인 유형을 공식 기준 하에 최대 2개 선정하여 분류하십시오.

      유형 분류 기준 목록 (아래 범위 외부의 임의 유형을 창작하지 마십시오):
      - 결정성 차원:
        * 다재다능형: 여러 분야에 고루 뛰어난 흥미 및 능력이 있어 한 곳으로 초점을 좁히지 못함
        * 우유부단형: 충분한 정보가 축적되었으나 결정 자체에 따르는 깊은 불안감으로 선택을 유보함
      - 현실성 차원:
        * 비현실형: 본인의 실제 역량, 객관적인 경제·정서적 여건과 조화되지 않는 고난도 목표만을 오롯이 고수함
        * 불충족형: 특정 직종 흥미는 왕성하나 그에 필적할 자격 요건이나 실무 기술 역량이 미비함
        * 강압형: 부모님이나 가족, 주변인의 강력한 기대로 결정은 했으나 본인의 내재적 취업 동기나 의지가 불투명함
      - 실무 보조 유형:
        * 정보부족형: 직업 동향, 노동 시장 공고 탐색 기술, 합격 수기 등 핵심 구직 지식 자체가 절대적으로 결핍됨
        * 흥미불명확형: 본인 스스로가 무엇을 열망하고 잘 설계해 나갈 수 있는지 강점과 가치가 선명하지 못함

      출력 JSON 규격:
      {
        "가능성_높은_유형": ["선정유형 1", "선정유형 2(없으면 생략 가능하나 최대 2개)"],
        "유형별_판단근거": {
          "선정유형 1_이름": "입력 내용 중 이 유형으로 매칭하도록 근거가 된 실재적 행위나 진술 요약 (절대 자의적으로 지어내지 말 것)",
          "선정유형 2_이름": "두 번째 매칭에 대한 팩트 기반 근거 요약"
        },
        "권장_개입방향": "이 내담자의 불안 요소를 걷어내고 단계적 의사결정을 지원하기 위해 상담사가 적용해야 할 구체적인 면담 개입 전술 (경청, 정보 개방, 흥미 탐색 도구 등)",
        "상담후_연계제안": {
          "국민취업지원제도": "소요조건 부합성 및 종합 취업촉진 수당 지원 필요성 관련 소견 (최종 요건은 상담사 확인 필수 구조 적용)",
          "구직자도약패키지": "경력공백 메우기 및 지원 회피를 막기 위한 맞춤형 심층 프로그램 연계 소견",
          "심리안정프로그램": "구직 자신감 하락, 정서적 불안 관찰 수준 연계 제안 (기명의 병리 자의적 기재 금지)",
          "직업훈련": "기술 요건 완성을 위한 직무기능 보완 가이드 및 내일배움카드 활용 검토 소견",
          "기타_연계": "잡케어 연계, 고용24 구직 신청, 이력서 보완 클리닉 등 현장 지원 검토 소견"
        },
        "주의문구": "본 분류 및 연계 제안은 AI가 작성한 참고용 초안이며, 최종 유형 판단과 제도 연계 여부는 상담사가 추가 면담 및 자격요건 확인을 통해 확정해야 합니다."
      }

      입력 내용:
      ${text}
      `;
    } else if (mode === "LOG") {
      // For LOG, the specification asks for a clean government Markdown diary.
      // But we can output a compliant structured text that we will display on the UI.
      responseMimeType = "text/plain";
      textPrompt = `
      [서비스 종류: MODE 3: 상담일지·보고서 자동작성 (LOG)]
      상담사가 입력한 미가공 상담 메모나 음성녹음 텍스트를 공공 표준 고용센터 양식으로 즉시 전환하십시오.

      반드시 다음 형식을 극단적으로 엄수하여 반환해 주십시오:

      [상담일지]

      - 상담일자/회차: (입력에 일자나 회차가 확인되지 않는 경우 "상담사 기재 필요"로 표기)
      - 상담목표: (내담자가 달성하고자 하는 구직 방향 및 금일 상담 세션의 실무 목적을 요약)
      - 상담내용 요약: (3~5문장 내외로 철저히 사실에 근거하여 작성. 구직기간, 현재 자격 상황, 발화 요지 포함)
      - 내담자 주요 발언: (핵심적인 호소 문장을 상담보고서 스타일로 요약 정리)
      - 상담사 소견: (객관적인 내담자 태도 관찰, 노동력 상태, 경력공백 대비 구직 장애 요인 정리)
      - 진로미결정 관련 관찰사항: (유형의 징후나 선택 결정 지연 양상을 사실 위주로 관측 서술)
      - 상담후 연계 검토: (다음 중 관련 있는 항목을 명기하며 자격요건은 상담사 승인이 필요하다고 언급하십시오)
        * 국민취업지원제도 검토 필요 여부
        * 구직자도약패키지 연계 필요 여부
        * 심리안정프로그램 연계 필요 여부
        * 직업훈련 탐색 필요 여부
        * 잡케어 활용 필요 여부
        * 고용24 구직신청 및 입사지원 안내 필요 여부
        * 이력서·자기소개서·면접지원 필요 여부
        * 채용행사 또는 일자리 수요데이 연계 가능성
      - 다음 단계/연계 계획: (상담사가 다음 만남 전까지 수행할 서류 교부 또는 전산 등록 할 일 목록)
      - 주의문구: 본 상담일지는 AI가 작성한 참고용 초안이며, 최종 상담기록은 상담사가 사실관계와 표현의 적정성을 확인하여 확정해야 합니다.

      주의사항:
      - 직접 인용구는 최소화하고 개조식의 객관적 보고서 톤을 사용하십시오.
      - 거짓 역사는 결코 창조하지 마십시오.

      입력 내용:
      ${text}
      `;
    } else if (mode === "PSYCH_INTERPRET") {
      responseMimeType = "application/json";
      textPrompt = `
      [서비스 종류: MODE 4: 심리·흥미검사 결과 해석 보조 (PSYCH_INTERPRET)]
      제공된 심리/흥미검사명과 수치(점수 프로파일)를 전문가 수준이나 내담자가 알기 쉬운 상냥한 화법의 직업 심리 상담 결과 조언서로 해석하십시오.

      출력 JSON 규격:
      {
        "쉬운말_해석_초안": "점수나 전공 매칭에 함몰되지 않고 내담자 눈높이에 맞춰 검사 결과를 격려적으로 서술한 해석 단락",
        "내담자에게_물어볼_추가질문": ["질문 1", "질문 2", "질문 3"],
        "상담사_체크포인트": "상담사가 검사지 이면의 숨겨진 니즈나 태도에서 짚어야 하는 학술적/실무적 고찰점",
        "상담후_연계제안": {
          "심리안정프로그램": "검사 결과에 스트레스/위축도가 관찰되는 경우 한정으로 부담 경감 심리 코칭 필요성 및 연계 검토 방향 기술",
          "구직자도약패키지": "적성에 따른 이력서 재설정 및 타겟 중심 멘토링 연계 검토 방향 기술",
          "직업훈련": "흥미 등급은 우수하나 실무 지식이 취약한 대목에 관한 맞춤형 카드 훈련 연계 검토 방향 기술",
          "기타_연계": "직업가치관 탐색 워크숍, 기업 채용정보 발굴 연계 검토 방향 기술"
        },
        "주의문구": "본 해석 및 연계 제안은 AI가 작성한 초안이며, 검사 매뉴얼과 상담사의 전문적 판단으로 최종 확정해야 합니다."
      }

      작성 원칙:
      - 심리 정서 수치가 극도로 낮거나 지수가 부정적이더라도 '우울증', '불안장애' 등의 한정적 의료 진단 기호를 절대 사용하지 마십시오.
      - 구직 자신감 및 정서 위안 상태의 가볍고 무거운 실태를 '관찰과 발언' 위주로만 지각하여 해설하십시오.

      입력 내용:
      ${text}
      `;
    } else if (mode === "SERVICE_LINK") {
      responseMimeType = "application/json";
      textPrompt = `
      [서비스 종류: MODE 5: 지원제도 및 상담 후 프로그램 연계 안내 (SERVICE_LINK)]
      내담자의 구직 현황(기간, 무역량 상태, 지원 이력, 정서상태 등)을 고려해 가장 적절한 사업들의 연계 우선 순위와 개별 안내문을 대조 추출하십시오.

      조건별 연계 필요도 표기 약속: 
      필수적 가치로 "높음", "보통", "낮음", "정보 부족" 중 한 단어만 사용하십시오. 절대 다른 단어를 삽입하지 마십시오.

      - 국민취업지원제도 연계 검토 요인: 장기구직, 구직 취약, 경제적 지원 촉진, 철저한 상담 관리 요구.
      - 구직자도약패키지 연계 검토 요인: 지원 의욕 하락, 잦은 이력 탈락 경향, 이력서 보강 요구, 집중 가이드 진입.
      - 심리안정프로그램 연계 검토 요인: 탈락에 의한 위축, 면접 앞 긴장감 상승, 심한 불안 요소 표현, 대인 기피 정서.
      - 직업훈련 연계 검토 요인: 희망 분야의 핵심 자격 결핍, 기 술 향상 전환, 경력 단절로 지식 보완이 시급함.
      - 기타 연계 검토 요인: 잡케어 자가 역량 분석, 고용24 등록, 상설 일자리 수요데이 매칭.

      출력 JSON 규격:
      {
        "우선_연계_필요영역": ["우선 검토 최상위 제도 1", "우선 검토 최상위 제도 2"],
        "제도별_연계검토": {
          "국민취업지원제도": {
            "연계필요도": "높음/보통/낮음/정보 부족 중 하나",
            "판단근거": "장기 구직 촉진 수령 요구 정밀 대조 소견",
            "상담사_확인사항": "가구 소득, 이전 재산 상태, 참여 유관 시한 만료 여부 등을 상담사가 체크해야 한다는 당부",
            "안내문구_초안": "국민취업지원제도는 취업을 희망하는 분에게 상담, 취업활동계획 수립, 직업훈련, 일경험, 복지서비스 연계 등을 지원하는 제도입니다. 참여 가능 여부는 연령, 소득, 재산, 취업경험 등 자격요건 확인 후 상담사가 안내드릴 수 있습니다."
          },
          "구직자도약패키지": {
            "연계필요도": "높음/보통/낮음/정보 부족 중 하나",
            "판단근거": "경력 관리와 면접 취약성 대조 소견",
            "상담사_확인사항": "중도 이탈 가능 여부 및 집중 개입 필요성에 대한 동의 검토 사항",
            "안내문구_초안": "구직자도약패키지는 구직 준비가 막막하거나 장기간 취업에 어려움을 겪는 분에게 개인별 상황을 바탕으로 취업목표 설정, 구직기술 향상, 집중상담 등을 지원하는 프로그램입니다. 참여 가능 여부는 상담을 통해 확인할 수 있습니다."
          },
          "심리안정프로그램": {
            "연계필요도": "높음/보통/낮음/정보 부족 중 하나",
            "판단근거": "구직 자신감 혹은 면접 기피 행동 분석 소견",
            "상담사_확인사항": "프로그램의 자발적 참여 의사와 상담 연계 명시적 동의 취득 여부",
            "안내문구_초안": "심리안정프로그램은 구직 과정에서 느끼는 불안, 위축감, 스트레스 등을 완화하고 취업 준비를 지속할 수 있도록 돕는 상담 연계 프로그램입니다. 참여 여부는 내담자의 동의와 상담사의 추가 확인을 통해 검토할 수 있습니다."
          },
          "직업훈련": {
            "연계필요도": "높음/보통/낮음/정보 부족 중 하나",
            "판단근거": "희망 직능 대비 주력 자격증/실무 역량 공백 소견",
            "상담사_확인사항": "훈련 수행 능력 여부, 적정 국민내일배움카드 미사용 잔액 대조 여부",
            "안내문구_초안": "직업훈련은 희망직무에 필요한 컴퓨터, 기술 등 자격과 기능을 보완하기 위한 과정입니다. 현재 보유역량과 희망직무의 요구조건을 비교한 뒤, 국민내일배움카드 또는 관련 훈련과정 참여 가능성을 검토할 수 있습니다."
          },
          "기타_고용서비스": {
            "연계필요도": "높음/보통/낮음/정보 부족 중 하나",
            "판단근거": "상설 박람회 참가 또는 자소서 가이드 결핍 분석 소견",
            "상담사_확인사항": "잡케어 포탈 로그인 보유, 워크넷/고용24 계정 설정 진위 확인",
            "안내문구_초안": "고용24 이력서·자기소개서 보완, 면접컨설팅, 잡케어 실무 리포트 추출을 연계 지원받을 수 있습니다."
          }
        },
        "상담사가_우선_진행할_다음단계": [
          "상담 우선순위 1순위 행동",
          "상담 우선순위 2순위 행동"
        ],
        "주의문구": "본 연계 제안은 AI가 작성한 참고용 초안이며, 실제 제도 대상 여부와 참여 가능 여부는 상담사가 관련 지침, 자격요건, 내담자 동의 여부를 확인하여 최종 결정해야 합니다."
      }

      입력 내용:
      ${text}
      `;
    }

    const response = await generateContentWithFallback(ai, {
      contents: textPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: responseMimeType
      }
    });

    const replyText = response.text || "";

    if (responseMimeType === "application/json") {
      try {
        const parsedJson = JSON.parse(replyText);
        return res.json({
          mode,
          data: parsedJson,
          raw: replyText
        });
      } catch (jsonErr) {
        // Failed to parse Gemini response as JSON (sometimes it has a slight wrap), clean it
        const cleanedText = replyText.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
          const parsedJsonClean = JSON.parse(cleanedText);
          return res.json({
            mode,
            data: parsedJsonClean,
            raw: cleanedText
          });
        } catch {
          // If totally unparseable, return as raw text but signal mode
          return res.json({
            mode,
            data: { error: "JSON 파싱 실패", rawText: replyText },
            raw: replyText
          });
        }
      }
    } else {
      // MODE: LOG returns plain text report
      return res.json({
        mode,
        data: { report: replyText },
        raw: replyText
      });
    }

  } catch (error: any) {
    console.error("Gemini 분석 오류:", error);
    res.status(500).json({ 
      error: error.message || "분석 프로세스 도중 내부 에러가 발생했습니다." 
    });
  }
});

// Serve frontend build files in production mode, or Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[고용센터 초기상담 보조 AI 서버가 ${PORT}번 포트에서 가동을 시작했습니다.]`);
  });
}

startServer();
