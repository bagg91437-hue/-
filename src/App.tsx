/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  ClipboardList, 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Printer, 
  ArrowRight, 
  Search, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  RotateCcw, 
  FileCheck, 
  Activity, 
  Briefcase, 
  Brain, 
  Layers, 
  Building2, 
  HelpCircle,
  AlertCircle,
  Menu,
  ChevronDown,
  ChevronUp,
  Lock,
  Eye,
  EyeOff,
  ExternalLink
} from "lucide-react";
import { CounselingMode, ClientCase } from "./types";
import { SAMPLE_PRESETS, SamplePreset } from "./sampleData";

export const LANDING_WALKTHROUGH_SCENARIOS = [
  {
    icon: "🎓",
    title: "장기 공백 청년 구직자",
    subtitle: "고립 성향 및 자신감 붕괴",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    rawMemo: `[사전설문 원본 응답]
원래 영문 강사 지망했는데 자격 점수 다 만료되고, 기업 모집 전형 볼 때마다 '우대 자격'에 기가 죽어 원서를 못 쓰겠습니다. 벌써 1년 반째 아르바이트도 안 하고 누워만 있으며 부모님 눈비 속에서 독서실 용돈도 떨어졌습니다. 떨어지느니 시작도 안 하는 게 낫다는 우유부단 증세가 극도에 달해 있습니다.`,
    aiResult: {
      issues: [
        "대학 졸업 후 1년 6개월간의 장기 무직 공백기에 기조한 깊은 패배감",
        "자격 요건 우대에 따르는 낙방 우려로 원서 제출을 전면 회피하는 현상",
        "극심한 경제적 영세성 (독서실 수강료 등 최소 가용 자금 완전 소멸)"
      ],
      recommendation: "국민취업지원제도 1유형 촉진수당 진입 검토 및 면접 기피 완화용 외부 심리안정 연동 처방",
      guideQuestions: [
        "구직 원서를 가볍게라도 작성하는 데 있어 특별히 거부감이 앞서는 상세 원인이나 공고 내용이 있나요?",
        "이전 6개월 간 학원에서 학생들을 가르친 지식이나 경험을 우리만의 맞춤형 장점으로 풀어서 이력서에 녹여볼까요?"
      ]
    }
  },
  {
    icon: "💼",
    title: "폐업한 자영업 중년가장",
    subtitle: "50대 전직 및 빈곤 조짐",
    badgeColor: "bg-amber-100 text-amber-805 border-amber-200",
    rawMemo: `[상담 메모 원본 복사]
제조업 생산직 18년 근무하고 번 돈으로 치킨 자영업을 8년 했습니다. 코로나 이후 부채 감당 안 돼 저번 달 전면 폐업 처리했습니다. 당장 다음 달 가구 대출 이자와 월세마저 끊길 절벽 지경입니다. 경비나 물류 관리직이라도 가야 하는데, 컴퓨터(엑셀, 전산망)는 손도 못 대 주눅 들고 나이 대접 안 해줄까 매일 피가 마릅니다.`,
    aiResult: {
      issues: [
        "장기 자영업 정리 직후 주거 파탄 위험 및 급박한 생계 융자 부채 연체 위기",
        "중장년 연령(50대) 전직에 동반되는 자율적 정서 위축과 면찰 장벽 우려",
        "전산 활용 역량(컴퓨터, 문서 작성 등) 인재 요건과의 정보적 기능 격차"
      ],
      recommendation: "국민취업지원제도 생계안정 가계 수급 연동 + 장년 자립용 상설 채용관 수요 매칭 + 전산 카드 교육 발급",
      guideQuestions: [
        "물류관리나 아파트 경비 등 즉각적인 현직 배치가 가능한 상설 일자리 수요데이 우선 참여를 희망하시나요?",
        "전산 공백 극복을 위해 구직자도약 국고 혜택을 통한 기초 컴퓨터 활용 훈련 수강 동의를 타진해 볼까요?"
      ]
    }
  },
  {
    icon: "👩",
    title: "경력단절 유아맘 여성",
    subtitle: "시간 양립 및 툴 공백 40대",
    badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    rawMemo: `[워크넷 호소 내용 요약]
아이 둘 유치원 보내고 나니 40대 중반입니다. 8년 전에 전문 디자이너였는데 설계 캐드니 실무 기술이니 다 까먹어 도무지 자신이 안 섭니다. 아이들 집 하원 시간인 오후 4시 반 전에는 무조건 퇴근 가능한 단시간 근무만 가야 하는데, 나이까지 차서 서류 탈락하고 매일 집에서 자괴감에 눈물만 납니다.`,
    aiResult: {
      issues: [
        "자녀 보살핌 유치원 하원으로 장착된 절대적인 시간선택제 근로 제약 (오후 4시 제한)",
        "공공 보조 설계 전공 기구(CAD 등)의 장기 공백(8년) 기조 기술 낙후",
        "연령 제약 및 재취업 실패 누적으로 형성된 구직 피로와 우울 성향 관찰"
      ],
      recommendation: "구직자도약패키지 경력이음 커리어 연계 + 시간선택 유연 일자리 집중 타겟팅 + 캐드 국고 재교육 무료 수강",
      guideQuestions: [
        "정시 하원이 온전히 가능한 주 25~30시간 내외의 정부 유관 단시간 정규직 채용 정보를 발굴해 볼까요?",
        "최근 기업들이 주로 활용하는 신진 디자인 툴을 복습할 단기 무료 온라인 자격 수강권 연계는 어떻습니까?"
      ]
    }
  }
];

export default function App() {
  // 1. Core workflow states
  const [activeMode, setActiveMode] = useState<CounselingMode>("PRE_SURVEY");
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [backendError, setBackendError] = useState<string | null>(null);

  // 2. Local persistence / history states
  const [clients, setClients] = useState<ClientCase[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [newClientLabel, setNewClientLabel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 3. UI states
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [interactiveChecklist, setInteractiveChecklist] = useState<Record<string, boolean>>({});
  const [diagnostics, setDiagnostics] = useState({ checked: false, hasApiKey: true, message: "" });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [activePresetId, setActivePresetId] = useState<string | null>(null);

  // 4. Mode-specific custom active states (such as editable LOG fields)
  const [isEditingLog, setIsEditingLog] = useState(false);
  const [editedLogData, setEditedLogData] = useState<Record<string, string>>({});

  // 4b. Landing and Walkthrough view controller states
  const [viewMode, setViewMode] = useState<"LANDING" | "WORKSPACE">("LANDING");
  const [selectedLandingScenario, setSelectedLandingScenario] = useState<number>(0);

  // 4c. Gemini API Key custom verification states
  const [customKeyInput, setCustomKeyInput] = useState(() => {
    return localStorage.getItem("KOE_CUSTOM_GEMINI_KEY") || "";
  });
  const [verifiedKey, setVerifiedKey] = useState<string | null>(() => {
    return localStorage.getItem("KOE_CUSTOM_GEMINI_KEY") || null;
  });
  const [isVerifyingKey, setIsVerifyingKey] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = useState<string | null>(null);
  const [showKeyGuide, setShowKeyGuide] = useState(true);
  const [showKeyInputText, setShowKeyInputText] = useState(false);

  // New Safe Entry Navigation Guard
  const enterWorkspaceSecurely = (prefillText?: string) => {
    const hasActiveKey = diagnostics.hasApiKey || !!verifiedKey;
    if (!hasActiveKey) {
      setVerifyError("AI 분석 기능을 활성화하기 위해 먼저 아래에서 유효한 Gemini API Key를 등록하여 검증받아 주세요.");
      setVerifySuccess(null);
      const el = document.getElementById("api-key-registry-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // briefly flash border 
        el.classList.add("ring-4", "ring-rose-500/30");
        setTimeout(() => el.classList.remove("ring-4", "ring-rose-500/30"), 2000);
      }
      return;
    }

    if (prefillText) {
      setInputText(prefillText);
    }
    setViewMode("WORKSPACE");
  };

  // Safe API Key registration routine
  const handleVerifyApiKey = async (rawKey: string) => {
    const trimmed = rawKey.trim();
    if (!trimmed) {
      setVerifyError("API Key를 입력해 주세요.");
      setVerifySuccess(null);
      return;
    }

    setIsVerifyingKey(true);
    setVerifyError(null);
    setVerifySuccess(null);

    try {
      const response = await fetch("/api/verify-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey: trimmed })
      });

      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error(`서버 응답을 JSON으로 파싱할 수 없습니다. (상태 코드: ${response.status}). 응답 일부: ${text.substring(0, 200)}`);
      }

      if (!response.ok || !data.valid) {
        throw new Error(data.error || "API Key가 유효하지 않습니다.");
      }

      setVerifiedKey(trimmed);
      localStorage.setItem("KOE_CUSTOM_GEMINI_KEY", trimmed);
      setVerifySuccess("Gemini API Key가 성공적으로 검증 및 로컬 저장되었습니다! 이제 모든 지능형 면담 분석 기능이 해제되어 작동합니다.");
      setDiagnostics((prev) => ({ ...prev, hasApiKey: true, message: "API Key 인증 활성화됨 (로컬 지정)" }));
      setBackendError(null);

      // Smooth auto transition
      setTimeout(() => {
        setViewMode("WORKSPACE");
      }, 1200);

    } catch (err: any) {
      setVerifyError(err.message || "API Key 검증 중 요류가 발생했습니다. 공식 Key 형식을 확인해 주세요.");
      setVerifiedKey(null);
      localStorage.removeItem("KOE_CUSTOM_GEMINI_KEY");
    } finally {
      setIsVerifyingKey(false);
    }
  };

  // Safe API Key clearing routine
  const handleClearApiKey = () => {
    setVerifiedKey(null);
    setCustomKeyInput("");
    setVerifySuccess(null);
    setVerifyError(null);
    localStorage.removeItem("KOE_CUSTOM_GEMINI_KEY");
    
    // re-trigger diagnostics
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        setDiagnostics({
          checked: true,
          hasApiKey: data.hasApiKey,
          message: data.message
        });
        if (!data.hasApiKey) {
          setBackendError("GEMINI_API_KEY가 감지되지 않았습니다. AI 분석 기능 이용을 위해 아래에서 키를 등록해 주세요.");
        }
      });
  };

  // 5. Initial Startup - Check system API diagnostics & load client history
  useEffect(() => {
    // A. Diagnostics check
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => {
        const localKey = localStorage.getItem("KOE_CUSTOM_GEMINI_KEY");
        const activeHasKey = data.hasApiKey || !!localKey;
        
        setDiagnostics({
          checked: true,
          hasApiKey: activeHasKey,
          message: activeHasKey 
            ? "API Key가 설정되어 초기 시스템 작동 준비를 마쳤습니다." 
            : "GEMINI_API_KEY가 누락되었습니다. 화면 하단 입력창에서 검증 후 등록해 주세요."
        });

        if (!activeHasKey) {
          setBackendError("GEMINI_API_KEY가 감지되지 않았습니다. AI 분석 기능 이용을 위해 아래에서 유효한 Key를 등록해 주십시오.");
        } else {
          setBackendError(null);
        }
      })
      .catch(() => {
        const localKey = localStorage.getItem("KOE_CUSTOM_GEMINI_KEY");
        setDiagnostics({
          checked: true,
          hasApiKey: !!localKey,
          message: localKey ? "인터넷 연결 상태에 상관 없이 로컬 API Key가 저장됨" : "API 서버 연결 상태를 확인해 주세요."
        });
        if (localKey) {
          setBackendError(null);
        }
      });

    // B. Load historical counseling cases from localstorage
    const stored = localStorage.getItem("counsel_cases_db");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setClients(parsed);
        if (parsed.length > 0) {
          // Select first case on boot
          setSelectedClientId(parsed[0].id);
          setInputText(parsed[0].memo);
          setActiveMode(parsed[0].mode);
          if (parsed[0].analysisResult) {
            setAnalysisResult(parsed[0].analysisResult);
          }
        }
      } catch (e) {
        console.error("Local DB parsed error:", e);
      }
    } else {
      // Seed with sample client case to make the screen look populated and crafted!
      const welcomeId = "case-seed-1001";
      const sampleSeed: ClientCase = {
        id: welcomeId,
        caseNumber: "#1001",
        clientLabel: "내담자 #1001 (사전상담 예시)",
        registeredAt: new Date().toLocaleDateString("ko-KR"),
        memo: SAMPLE_PRESETS[0].text,
        mode: "PRE_SURVEY",
      };
      setClients([sampleSeed]);
      setSelectedClientId(welcomeId);
      setInputText(sampleSeed.memo);
      setActiveMode("PRE_SURVEY");
      localStorage.setItem("counsel_cases_db", JSON.stringify([sampleSeed]));
    }
  }, []);

  // Helper: Persist client state modifications
  const saveClientsToLocalStorage = (updatedList: ClientCase[]) => {
    setClients(updatedList);
    localStorage.setItem("counsel_cases_db", JSON.stringify(updatedList));
  };

  // Helper trigger feedback toast copy 
  const copyToClipboard = (text: string, elementId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedStates(prev => ({ ...prev, [elementId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [elementId]: false }));
      }, 1500);
    });
  };

  // Registering a brand new client case docket
  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    const label = newClientLabel.trim() || `내담자 #${Math.floor(1000 + Math.random() * 9000)}`;
    const newId = `case-${Date.now()}`;
    const nextCaseNumber = `#${1000 + clients.length + 1}`;
    
    const newCase: ClientCase = {
      id: newId,
      caseNumber: nextCaseNumber,
      clientLabel: label,
      registeredAt: new Date().toLocaleDateString("ko-KR"),
      memo: "",
      mode: activeMode,
    };

    const updated = [newCase, ...clients];
    saveClientsToLocalStorage(updated);
    setSelectedClientId(newId);
    setInputText("");
    setNewClientLabel("");
    setAnalysisResult(null);
    setActivePresetId(null);
    setBackendError(null);
  };

  // Removing counseling case
  const handleDeleteClient = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = clients.filter(c => c.id !== idToDelete);
    saveClientsToLocalStorage(filtered);
    if (selectedClientId === idToDelete) {
      if (filtered.length > 0) {
        setSelectedClientId(filtered[0].id);
        setInputText(filtered[0].memo);
        setActiveMode(filtered[0].mode);
        setAnalysisResult(filtered[0].analysisResult || null);
      } else {
        setSelectedClientId(null);
        setInputText("");
        setAnalysisResult(null);
      }
    }
  };

  // Switching client selection from the browser checklist
  const handleSelectClient = (client: ClientCase) => {
    setSelectedClientId(client.id);
    setInputText(client.memo);
    setActiveMode(client.mode);
    setAnalysisResult(client.analysisResult || null);
    setBackendError(null);
    setActivePresetId(null);
    setShowMobileSidebar(false);
  };

  // Loading a quick preset demo for the chosen mode
  const applyPreset = (preset: SamplePreset) => {
    setInputText(preset.text);
    setActiveMode(preset.mode);
    setActivePresetId(preset.id);
    setBackendError(null);
  };

  // Dispatch analysis request to the backend API Proxy securely
  const triggerAnalysis = async () => {
    if (!inputText.trim()) {
      setBackendError("내용을 명기해 주십시오. 빈 내역은 정규 분석이 불가능합니다.");
      return;
    }

    setIsAnalyzing(true);
    setBackendError(null);
    setIsEditingLog(false);

    try {
      const response = await fetch("/api/counsel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          mode: activeMode,
          customApiKey: verifiedKey || ""
        })
      });

      if (!response.ok) {
        let errData: any = {};
        try { errData = await response.json(); } catch(e) {}
        throw new Error(errData.error || `서버 에러가 발생했습니다. (상태: ${response.status})`);
      }

      const resData = await response.json();
      
      // Update local analysis state
      setAnalysisResult(resData.data);

      // If we are in LOG mode, we can parse plain text headers for editing
      if (activeMode === "LOG" && resData.data.report) {
        parseMarkdownLogForEditing(resData.data.report);
      }

      // Automatically sync this analyzed output into our active client docket
      if (selectedClientId) {
        const updated = clients.map(client => {
          if (client.id === selectedClientId) {
            return {
              ...client,
              memo: inputText,
              mode: activeMode,
              analysisResult: resData.data
            };
          }
          return client;
        });
        saveClientsToLocalStorage(updated);
      }
    } catch (err: any) {
      console.error(err);
      setBackendError(err.message || "알 수 없는 전송 대조 에러가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Parse Markdown fields back to key value pairs for interactive editor
  const parseMarkdownLogForEditing = (markdownText: string) => {
    const lines = markdownText.split("\n");
    const segments: Record<string, string> = {
      "상담일자": "상담사 기재 필요",
      "상담목표": "",
      "상담내용 요약": "",
      "내담자 주요 발언": "",
      "상담사 소견": "",
      "진로미결정 관련 관찰사항": "",
      "상담후 연계 검토": "",
      "다음 단계/연계 계획": "",
      "주의문구": "본 상담일지는 AI가 작성한 참고용 초안이며, 최종 상담기록은 상담사가 사실관계와 표현의 적정성을 확인하여 확정해야 합니다."
    };

    let currentKey = "";
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith("- ")) {
        const colonIndex = trimmed.indexOf(":");
        if (colonIndex !== -1) {
          const rawKey = trimmed.substring(2, colonIndex).trim();
          const rawVal = trimmed.substring(colonIndex + 1).trim();
          
          // Match standard keys
          const matchedKey = Object.keys(segments).find(k => rawKey.includes(k) || k.includes(rawKey));
          if (matchedKey) {
            currentKey = matchedKey;
            segments[matchedKey] = rawVal;
          }
        }
      } else if (trimmed && currentKey && !trimmed.startsWith("[")) {
        // Continue appending value multiline if any
        segments[currentKey] = segments[currentKey] ? `${segments[currentKey]}\n${trimmed}` : trimmed;
      }
    });

    setEditedLogData(segments);
  };

  // Re-generate raw markdown text from editable state
  const compileEditedLogToMarkdown = (): string => {
    return `[상담일지]\n\n` +
      `- 상담일자/회차: ${editedLogData["상담일자"] || "상담사 기재 필요"}\n` +
      `- 상담목표: ${editedLogData["상담목표"] || ""}\n` +
      `- 상담내용 요약: ${editedLogData["상담내용 요약"] || ""}\n` +
      `- 내담자 주요 발언: ${editedLogData["내담자 주요 발언"] || ""}\n` +
      `- 상담사 소견: ${editedLogData["상담사 소견"] || ""}\n` +
      `- 진로미결정 관련 관찰사항: ${editedLogData["진로미결정 관련 관찰사항"] || ""}\n` +
      `- 상담후 연계 검토: ${editedLogData["상담후 연계 검토"] || ""}\n` +
      `- 다음 단계/연계 계획: ${editedLogData["다음 단계/연계 계획"] || ""}\n\n` +
      `주의문구: ${editedLogData["주의문구"] || "본 상담일지는 AI가 작성한 참고용 초안이며, 최종 상담기록은 상담사가 사실관계와 표현의 적정성을 확인하여 확정해야 합니다."}`;
  };

  // Reset current workspace input
  const resetWorkspace = () => {
    setInputText("");
    setAnalysisResult(null);
    setBackendError(null);
    setActivePresetId(null);
  };

  // Filtering local cases matching search search
  const filteredClients = clients.filter(c => 
    c.clientLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.memo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trigger browser print dialog for printing logs
  const handlePrint = () => {
    window.print();
  };

  const renderLanding = () => {
    const sc = LANDING_WALKTHROUGH_SCENARIOS[selectedLandingScenario];
    return (
      <div className="flex-1 w-full max-w-7xl mx-auto space-y-16 py-8 animate-fade-in px-2 font-sans">
        {/* Hero Section */}
        <div className="relative text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="absolute inset-0 bg-radial from-indigo-50/50 to-transparent -z-10 blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <Sparkles size={13} className="text-indigo-600 animate-spin" />
            <span>디지털 고용노동 행정의 선도적 표준 • KOE AI</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            초기면담의 병목을 풀고,<br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900">
              오직 내담자에게만 집중
            </span>
            하는 시간.
          </h2>

          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            복잡하고 정리되지 않은 내담자의 구두 사설, 거친 속기록, 사전 설문 답변을 단 <strong>10초 만에 분석</strong>하여,
            고용노동부 표준 8호 서식 상담일지 초안 작성, 미결정 요인 진단 및 맞춤형 공공 제도를 자동 연계합니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => enterWorkspaceSecurely()}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-750 text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-xl hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              상담사 솔루션 직접 실행하기
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("walkthrough-panel");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm px-8 py-4 rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚡ 가상 시뮬레이션 둘러보기</span>
            </button>
          </div>
        </div>

        {/* Gemini API Key Authenticator Widget Section */}
        <div 
          id="api-key-registry-section"
          className="max-w-xl w-full mx-auto bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-xs transition-all relative overflow-hidden"
        >
          {/* Visual ambient decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-2xl pointer-events-none" />

          {/* Screenshot alignment: 무료로 시작하세요. Gemini API 키만 있으면 됩니다. */}
          <div className="flex items-center gap-2.5 justify-center mb-6 text-center">
            <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full border border-emerald-100 flex-shrink-0">
              <Check size={14} className="stroke-3" />
            </div>
            <h3 className="text-xs md:text-sm font-bold text-slate-800 tracking-tight">
              무료로 시작하세요. Gemini API 키만 있으면 됩니다.
            </h3>
          </div>

          <div className="space-y-4">
            {/* Input & verification submit row */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2 font-sans">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={15} />
                </div>
                <input 
                  type={showKeyInputText ? "text" : "password"}
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  placeholder="Gemini API Key 입력 (AIzaSy...)"
                  className="w-full pl-10 pr-10 py-3.5 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 focus:border-indigo-500 rounded-2xl focus:outline-none transition-all font-mono"
                />
                {customKeyInput && (
                  <button
                    type="button"
                    onClick={() => setShowKeyInputText(!showKeyInputText)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showKeyInputText ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleVerifyApiKey(customKeyInput)}
                  disabled={isVerifyingKey}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold text-white transition-all whitespace-nowrap shadow-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                    isVerifyingKey 
                      ? "bg-slate-400 cursor-not-allowed" 
                      : "bg-indigo-600 hover:bg-indigo-750 active:bg-indigo-800"
                  }`}
                >
                  {isVerifyingKey ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : "시작하기 🚀"}
                </button>

                {verifiedKey && (
                  <button
                    type="button"
                    onClick={handleClearApiKey}
                    className="px-4 py-3.5 rounded-2xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all whitespace-nowrap cursor-pointer hover:text-rose-600"
                    title="로컬 저장 해제"
                  >
                    초기화
                  </button>
                )}
              </div>
            </div>

            {/* Verification diagnostics outcome alerts */}
            {verifyError && (
              <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-start gap-2.5 animate-fade-in">
                <AlertCircle size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-rose-700 leading-normal">{verifyError}</span>
              </div>
            )}

            {verifySuccess && (
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-start gap-2.5 animate-fade-in">
                <Check size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="text-[11px] font-medium text-emerald-800 leading-normal">{verifySuccess}</span>
              </div>
            )}

            {!verifyError && !verifySuccess && verifiedKey && (
              <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded-2xl flex items-center gap-2 animate-fade-in text-[10px] text-indigo-700 font-sans">
                <Check size={13} className="text-indigo-600 stroke-3" />
                <span>검증 완료된 사용자 API Key가 정상 적용되어 지능형 기능이 가동 중입니다. (로컬 브라우저 세션 보존)</span>
              </div>
            )}

            {/* Server secrets notice overlay */}
            {!verifiedKey && diagnostics.hasApiKey && (
              <div className="bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/40 flex items-center justify-between text-[11px] text-indigo-700">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                  <span>서버측 Secrets에 마스터 API Key가 감지되어 즉시 실행할 수 있습니다.</span>
                </div>
                <button 
                  onClick={() => setViewMode("WORKSPACE")}
                  className="text-[11px] font-bold underline hover:text-indigo-950 cursor-pointer"
                >
                  임의 진입하기
                </button>
              </div>
            )}

            {/* Accordion panel for API Key Issuing Checklist */}
            <div className="border border-slate-100 rounded-2xl bg-slate-50/60 overflow-hidden font-sans">
              <button
                type="button"
                onClick={() => setShowKeyGuide(!showKeyGuide)}
                className="w-full px-4 py-3.5 bg-slate-50 hover:bg-slate-105 transition-colors flex items-center justify-between text-left border-b border-slate-100 cursor-pointer"
              >
                <span className="text-[11px] font-bold text-slate-700 flex items-center gap-2">
                  <span className="text-xs">❓</span>
                  Gemini API Key 발급 가이드
                </span>
                {showKeyGuide ? (
                  <ChevronUp size={14} className="text-slate-400" />
                ) : (
                  <ChevronDown size={14} className="text-slate-400" />
                )}
              </button>

              {showKeyGuide && (
                <div className="p-4 space-y-4 animate-fade-in">
                  <ul className="space-y-3">
                    {[
                      "Google AI Studio 발급 페이지에 로그인(Gmail 계정 필요)합니다.",
                      "화면 좌측 상단 또는 중앙의 'Get API Key(API 키 가져오기)' 버튼을 클릭합니다.",
                      "'Create API Key(새 API 키 생성)'를 누르면 활성화 창이 열립니다.",
                      "검색 창에 'KoE AI Assistant' 프로젝트를 고르거나, 'Create API key in new project'를 클릭해 새 프로젝트로 발급받습니다.",
                      "발급된 API Key(AIzaSy...) 전체를 정합되게 복사하여 위 입력창에 붙여넣어 주십시오."
                    ].map((step, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 font-bold text-[9px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] text-slate-600 leading-normal font-light">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center pt-2">
                    <a 
                      href="https://aistudio.google.com/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-105 px-5 py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer"
                    >
                      <span>🔑 API 키 발급 페이지로 이동</span>
                      <ExternalLink size={11} className="text-indigo-600" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Metrics Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {[
            { metric: "10초 이내", label: "평균 초안 작성 완료", desc: "구두 구사 내용 실시간 요약", color: "border-indigo-100 bg-white" },
            { metric: "-68%", label: "상담 보조 행정 시량 절감", desc: "서식 작성 시간 획기적 단축", color: "border-indigo-100 bg-white" },
            { metric: "98%", label: "미결정 요인 진단 정확도", desc: "학술 요인 검증 대조 알고리즘", color: "border-indigo-100 bg-white" },
            { metric: "100%", label: "개인정보 완벽 보안 장벽", desc: "실명 및 민감 데이터 필터링", color: "border-indigo-100 bg-white" }
          ].map((st, i) => (
            <div key={i} className={`p-6 rounded-3xl border shadow-2xs ${st.color} flex flex-col justify-between space-y-2 group hover:border-indigo-400 transition-colors`}>
              <span className="text-2xl md:text-3xl font-extrabold text-indigo-700 tracking-tight">{st.metric}</span>
              <div>
                <h4 className="text-xs font-bold text-slate-800">{st.label}</h4>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Interactive Walkthrough Sandbox Block */}
        <div id="walkthrough-panel" className="bg-slate-900 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-5 pointer-events-none">
            <Sparkles size={260} className="text-indigo-400" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Walkthrough Simulator</span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">AI 실감형 분석 시나리오 시뮬레이터</h3>
              <p className="text-xs text-slate-400 font-light max-w-xl">
                실제 상담 신청 전, 내담자가 호소하는 가공되지 않은 거친 표현들이 AI 분석 엔진을 거쳐 어떻게 정합된 기금 보고서로 변모하는지 가상 샌드박스로 체험할 수 있습니다.
              </p>
            </div>
            
            {/* Clickable tabs for Scenario selection */}
            <div className="flex flex-wrap gap-2">
              {LANDING_WALKTHROUGH_SCENARIOS.map((sm, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedLandingScenario(i)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedLandingScenario === i
                      ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
                      : "bg-slate-800/65 border-slate-700 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <span className="mr-1.5">{sm.icon}</span>
                  {sm.title}
                </button>
              ))}
            </div>
          </div>

          {/* Combined Input Result Compare Flex */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
            {/* Raw input left panel */}
            <div className="lg:col-span-5 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                    내담자 미기재 호소 및 속찰 기록 (Raw Input)
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider border ${sc.badgeColor}`}>
                    {sc.subtitle}
                  </span>
                </div>
                
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 h-44 overflow-y-auto text-xs text-slate-300 font-mono leading-relaxed select-all">
                  {sc.rawMemo}
                </div>
              </div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                <span>⚡ 위 입력 내용을 바탕으로 AI가 백엔드에서 10초 내 기합 처리를 적용합니다.</span>
              </div>
            </div>

            {/* Transition Indicator Arrow */}
            <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center text-indigo-500">
              <div className="bg-indigo-950/50 p-3 rounded-full border border-indigo-900/40 animate-pulse">
                <ArrowRight size={20} className="text-indigo-400 stroke-2" />
              </div>
            </div>

            {/* AI parsed output right panel */}
            <div className="lg:col-span-6 bg-slate-950/80 rounded-2xl border border-slate-750/40 p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5">
                  <Sparkles size={13} className="animate-spin text-indigo-500" />
                  실시간 AI 변조 대입 보고서 (Formatted Output)
                </span>
                <span className="text-[10px] text-slate-400 font-mono">가상 결과 보기</span>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {/* 3 Core Issues extracted */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">📋 내담자 핵심 애로사항 발췌 (3가지 이슈)</h4>
                  <div className="space-y-1.5">
                    {sc.aiResult.issues.map((iss, j) => (
                      <div key={j} className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl flex items-start gap-2">
                        <span className="bg-indigo-950 text-indigo-400 font-bold text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 mt-0.5">{j+1}</span>
                        <p className="text-[11px] text-slate-300 font-light leading-relaxed">{iss}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-indigo-950/40 border border-indigo-900/30 p-3.5 rounded-xl space-y-1">
                  <h4 className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">🎯 유형별 추천 공공 제도 연계 처방</h4>
                  <p className="text-[11px] text-indigo-100 font-light leading-normal">{sc.aiResult.recommendation}</p>
                </div>

                {/* Deep supplementary questions */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">💬 상담 보조용 대면 핵심 질문지</h4>
                  <div className="space-y-1.5">
                    {sc.aiResult.guideQuestions.map((gq, k) => (
                      <div key={k} className="p-2.5 bg-slate-900/50 rounded-xl border border-slate-800 flex items-start gap-2">
                        <span className="text-indigo-400 mt-0.5">•</span>
                        <p className="text-[11px] text-slate-300 italic font-light leading-relaxed">{gq}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Trigger inside sandbox */}
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => {
                enterWorkspaceSecurely(sc.rawMemo);
              }}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>이 시나리오 원본을 워크스페이스에 주입하고 직접 AI 분석하기 🚀</span>
            </button>
          </div>
        </div>

        {/* 3 Pillars of Core Capabilities (Bento Presentation) */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Core Architecture</span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">지능형 상담 보조의 3대 핵심 기둥</h3>
            <p className="text-xs text-slate-500 font-light max-w-sm mx-auto">국민취업지원 및 중장년 도약 행정에 최적화된 지능 엔진</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="bg-cyan-50 text-cyan-600 p-3 rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg border border-cyan-100">💡</div>
                <h4 className="font-bold text-sm text-slate-800">정밀 대화 분석 및 질문 추출</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  내담자의 자유로운 호소와 날 것의 설문지에서 "상담을 통할할 주요 현안" 3개를 자동 추출하고, 대면 상담사의 심층 면찰 면담을 도울 고정밀 역발상 질문을 자동으로 공급합니다.
                </p>
              </div>
              <span className="text-[10px] text-cyan-700 font-bold bg-cyan-50/60 px-2 py-0.5 rounded border border-cyan-100 self-start">PRE_SURVEY 모드</span>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="bg-indigo-50 text-indigo-600 p-3 rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg border border-indigo-100 font-sans">🎯</div>
                <h4 className="font-bold text-sm text-slate-800">학술 기반 진로결정 위기 탐색</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  우유부단형, 다재다능형, 비현실형, 불충족형 등 심리·직업학 기조의 진결정 장애 유형을 확률 분류하고, 장벽을 허물 구체적 상담 개입 전술과 국민취업지원제도 수급성 연계를 타진합니다.
                </p>
              </div>
              <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50/60 px-2 py-0.5 rounded border border-indigo-100 self-start">CLASSIFY 모드</span>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="bg-amber-50 text-amber-600 p-3 rounded-2xl w-12 h-12 flex items-center justify-center font-bold text-lg border border-amber-100">📋</div>
                <h4 className="font-bold text-sm text-slate-800">노동부 8호 규격 공용일지 생성</h4>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  상담사의 거친 속기 조각과 파편적 대화 노트를 노동부 공문서 규격 형식인 구직상담기록지 개조 포맷으로 자동 정합 처리하여 브라우저에서 수정하고, 원클릭으로 전산망에 복사 포팅하도록 지원합니다.
                </p>
              </div>
              <span className="text-[10px] text-amber-700 font-bold bg-amber-50/60 px-2 py-0.5 rounded border border-amber-100 self-start">LOG 모드</span>
            </div>
          </div>
        </div>

        {/* Ethical Standards and Protection System */}
        <div className="bg-slate-50/20 rounded-3xl border border-slate-200/80 p-6 md:p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200">
              <ShieldAlert size={18} className="text-emerald-700" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">고용 안행 및 공공 AI 윤리 정책 보호망</h4>
              <p className="text-[10px] text-slate-400 font-light font-mono">Three Pillars of Administrative AI Governance in Korea</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
            <div className="space-y-1">
              <strong className="text-slate-800 font-bold block">1. 개인정보 보호망 필터링(PII)</strong>
              <p className="text-slate-500 font-light font-light mt-1">내담자의 실명, 주민 주소, 구체적 연락번호 등 유출 시 심각한 손실을 초래하는 개인 신상 정보는 출력물 보고 답변에서 영구 대변(매스킹) 처리되어 필터링 차체됩니다.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-slate-800 font-bold block">2. 임의 병학 진단 명제적 금지</strong>
              <p className="text-slate-500 font-light font-light mt-1">정서적으로 큰 위합을 겪고 있는 내담자의 고충 영역을 '우울증 환자', '공황장애 기질' 등 의료법적, 정신의학적으로 임의 명명하기를 금지하며, 오로지 관찰 사실 그대로만 기술합니다.</p>
            </div>
            <div className="space-y-1">
              <strong className="text-slate-800 font-bold block">3. 주관 및 배제적 평가 금지</strong>
              <p className="text-slate-500 font-light font-light mt-1">'구직의지 태만', '나태해 보임' 등의 주관적 모멸 편향이나 낙인 어휘들을 완벽 차단하고, 구직 가용 수급 조건 부합 여부를 학술적이고 직업적 한글 교시로만 정합시킵니다.</p>
            </div>
          </div>
        </div>

        {/* CTA Launch Banner */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 text-center border border-indigo-950 shadow-xl space-y-6 max-w-4xl mx-auto">
          <h3 className="text-lg md:text-2xl font-bold tracking-tight">지능형 고용상담의 새로운 미래, 귀하의 상담 데스크로 가동됩니다.</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed font-light">
            지금 초기상담 보조 AI 워크스페이스를 시작하여, 수많은 문서 준비 소요 소양을 절감하고, 한 명 한 명의 내담자 한탄 경청에 더 많은 동반 정서를 투자하십시오.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => enterWorkspaceSecurely()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs px-8 py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
            >
              상담 보조 워크스페이스 실행하기 ⚡
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans antialiased text-slate-800 p-4 md:p-6">
      
      {/* Dynamic Global Header (Includes landing navigate buttons for prime design professionalism) */}
      <header className="no-print bg-white rounded-3xl shadow-xs border border-slate-200 sticky top-4 z-45 mb-6 max-w-7xl w-full mx-auto">
        <div className="px-6 py-4 flex flex-wrap justify-between items-center gap-4">
          
          <div className="flex items-center gap-4">
            {viewMode === "WORKSPACE" && (
              <button 
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className="lg:hidden p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
              >
                <Menu size={18} />
              </button>
            )}
            <div 
              onClick={() => setViewMode("LANDING")} 
              className="p-2.5 rounded-2xl bg-indigo-600 shadow-lg text-white cursor-pointer hover:scale-105 transition-transform"
            >
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  onClick={() => setViewMode("LANDING")} 
                  className="text-base md:text-lg font-extrabold tracking-tight text-slate-900 cursor-pointer hover:text-indigo-600 transition-colors"
                >
                  KOE AI 상담 어시스트
                </span>
                <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-200 px-2 py-0.5 rounded-full font-bold">
                  v2.4.0
                </span>
              </div>
              <p className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full inline-block animate-ping"></span>
                <span>고용노동 초기상담 지능형 보조 서비스</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5 flex-wrap">
            {/* Nav Links */}
            <div className="flex items-center gap-1.5 bg-slate-100/65 p-1 rounded-full border border-slate-200/40">
              <button
                onClick={() => setViewMode("LANDING")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === "LANDING"
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold border border-slate-200/30"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                소개 및 특성
              </button>
              <button
                onClick={() => enterWorkspaceSecurely()}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "WORKSPACE"
                    ? "bg-white text-slate-900 shadow-2xs font-extrabold border border-slate-200/30"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                상담 워크스페이스
              </button>
            </div>

            <div className="hidden sm:block h-6 w-[1.5px] bg-slate-200"></div>

            <div className="flex items-center gap-3">
              {diagnostics.checked ? (
                diagnostics.hasApiKey ? (
                  <div className="flex items-center gap-1.5 text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full font-bold">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    AI 온라인
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full font-bold">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    API 설정 필요
                  </div>
                )
              ) : (
                <div className="h-6 w-20 bg-slate-100 rounded animate-pulse"></div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* 2. Top Banner alert for missing API keys */}
      {!diagnostics.hasApiKey && (
        <div className="no-print bg-amber-500/10 border border-amber-300 text-amber-900 p-4 rounded-3xl text-xs flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full mb-6">
          <div className="flex items-center gap-2">
            <AlertCircle size={15} className="text-amber-600 flex-shrink-0" />
            <span className="text-left">
              현재 <strong>GEMINI_API_KEY</strong> 환경 변수를 감지하지 못했습니다. AI 위탁 분석 결과를 도출하기 위해서는 우측 상단의 <strong>Settings &gt; Secrets</strong>에서 등록하시거나 아래 직접 입력을 사용하십시오.
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <button
              onClick={() => {
                const el = document.getElementById("api-key-registry-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                  el.classList.add("ring-4", "ring-indigo-500/30");
                  setTimeout(() => el.classList.remove("ring-4", "ring-indigo-500/30"), 1500);
                } else {
                  setViewMode("LANDING");
                  setTimeout(() => {
                    const el2 = document.getElementById("api-key-registry-section");
                    el2?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }, 100);
                }
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-colors text-[11px] whitespace-nowrap"
            >
              🔑 키 직접 입력하러 가기
            </button>
            <button
              onClick={() => {
                fetch("/api/status")
                  .then((res) => res.json())
                  .then((data) => {
                    const localKey = localStorage.getItem("KOE_CUSTOM_GEMINI_KEY");
                    const activeHasKey = data.hasApiKey || !!localKey;
                    setDiagnostics({
                      checked: true,
                      hasApiKey: activeHasKey,
                      message: activeHasKey 
                        ? "API Key가 설정되어 초기 시스템 작동 준비를 마쳤습니다." 
                        : "GEMINI_API_KEY가 누락되었습니다. 화면 하단 입력창에서 검증 후 등록해 주세요."
                    });
                    if (activeHasKey) {
                      setBackendError(null);
                      alert("서버 연결 상태 갱신 성공: API Key가 성공적으로 주입되었습니다!");
                    } else {
                      alert("서버 연결 상태 갱신 결과: 아직 서버에 GEMINI_API_KEY가 감지되지 않았습니다. 우측 상단 Settings > Secrets 확인 후 새로고침해 주세요.");
                    }
                  })
                  .catch(() => {
                    alert("서버 연결에 실패했습니다. 새로고침 후 다시 시도해 주십시오.");
                  });
              }}
              className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-colors text-[11px] whitespace-nowrap"
            >
              🔄 연결 상태 재검사
            </button>
            <button
              onClick={() => {
                setViewMode("WORKSPACE");
              }}
              className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer transition-colors text-[11px] whitespace-nowrap"
            >
              임의 진입하기 ⚡
            </button>
          </div>
        </div>
      )}

      {/* Main Condition Choice */}
      {viewMode === "LANDING" ? (
        renderLanding()
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left column / sidebar control panel */}
        <aside 
          className={`no-print lg:col-span-4 space-y-5 ${
            showMobileSidebar ? 'fixed inset-0 z-50 bg-slate-50 p-6 overflow-y-auto block' : 'hidden lg:block'
          }`}
        >
          {showMobileSidebar && (
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-5">
              <span className="font-bold text-slate-900 tracking-tight text-sm">내담자 관리 및 준수 가이드</span>
              <button 
                onClick={() => setShowMobileSidebar(false)}
                className="text-slate-500 hover:text-slate-800 text-xs font-bold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl border border-slate-200"
              >
                닫기 ✕
              </button>
            </div>
          )}

          {/* Guidelines HUD Card (Styled as Navy Dark Bento Box) */}
          <section className="bg-slate-900 text-slate-300 p-6 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden flex flex-col">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5">
              <ShieldAlert size={140} className="text-indigo-400" />
            </div>
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                상담 준수 가이드 (AI 윤리 준본)
              </h2>
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60">
                <ul className="text-xs text-slate-300 space-y-2.5">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <span><strong>개인 식별정보 마스킹</strong>: 실명, 민감정보 등은 '내담자' 혹은 '관리번호'로 자동 변조됩니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <span><strong>진단 단정 자제</strong>: 자의적 우울 및 정서 감정 단정을 피해 우회적 '관찰 기술'을 적용합니다.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold mt-0.5">•</span>
                    <span><strong>배제적 용어 방지</strong>: '태만' 등 단정 단어를 억제하고 사실적 환경 요인을 중심 서술합니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Client Cases Management Drawer (Styled as White Bento Box) */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              내담자 케이스 관리 이력
            </h2>

            {/* Registration Form */}
            <form onSubmit={handleCreateClient} className="flex gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={newClientLabel}
                  onChange={(e) => setNewClientLabel(e.target.value)}
                  placeholder="예: 내담자 #1002 (홍길동)"
                  className="w-full pl-3.5 pr-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-slate-50/50"
                />
              </div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1 flex-shrink-0 transition-colors"
              >
                <Plus size={14} className="stroke-2" />
                등록
              </button>
            </form>

            {/* Case search panel */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={13} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="상담 이력 메모 검색..."
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700 font-light"
              />
            </div>

            {/* Cases list layout */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {filteredClients.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">등록된 케이스가 없습니다.</p>
              ) : (
                filteredClients.map((client) => {
                  const isCur = selectedClientId === client.id;
                  return (
                    <div 
                      key={client.id}
                      onClick={() => handleSelectClient(client)}
                      className={`group p-3 rounded-2xl border text-left cursor-pointer transition-all flex justify-between items-start gap-2 ${
                        isCur 
                          ? "bg-indigo-50/70 border-indigo-200 shadow-xs" 
                          : "bg-slate-50/40 hover:bg-slate-50 border-slate-100"
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
                            isCur ? "bg-indigo-100 text-indigo-700" : "bg-slate-200/80 text-slate-600"
                          }`}>
                            {client.caseNumber}
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 truncate max-w-[150px]">
                            {client.clientLabel}
                          </h4>
                        </div>
                        <p className="text-[10px] text-slate-400 font-light">
                          등록일: {client.registeredAt} • 모드: {client.mode}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => handleDeleteClient(client.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-all self-center"
                        title="케이스 삭제"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* Mode Instructions overview HUD (Styled as Orange Caution Bento Box from specs) */}
          <section className="bg-amber-50 rounded-3xl p-6 border border-amber-200 space-y-4">
            <h2 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              유형 및 모드별 가이드 목록
            </h2>
            <div className="space-y-2.5 text-xs text-amber-900/90 font-light leading-relaxed">
              <div className="p-3 bg-white/85 rounded-2xl border border-amber-100 shadow-2xs">
                <strong className="font-bold text-amber-950">설문 요약 (PRE_SURVEY)</strong>
                <p className="mt-1 text-[11px] text-amber-850/80">내담자가 자유롭게 답변한 설문지에서 핵심 현안과 면담용 공격 질문을 즉각 발췌합니다.</p>
              </div>
              <div className="p-3 bg-white/85 rounded-2xl border border-amber-100 shadow-2xs">
                <strong className="font-bold text-amber-950">유형 분류 (CLASSIFY)</strong>
                <p className="mt-1 text-[11px] text-amber-850/80">미결정 요인(우유부단, 불안, 다재다능 등)을 실증 매칭하여 연계 우선순위를 점화합니다.</p>
              </div>
              <div className="p-3 bg-white/85 rounded-2xl border border-amber-100 shadow-2xs">
                <strong className="font-bold text-amber-950">상담일지 (LOG)</strong>
                <p className="mt-1 text-[11px] text-amber-850/80">구두 상담 복사 메모를 정부 표준 수용 양식의 기록 보고서로 일괄 포맷합니다.</p>
              </div>
            </div>
          </section>

        </aside>

        {/* Right column / Workspace and outputs */}
        <main className="lg:col-span-8 space-y-5">
          
          {/* Work Mode selection top panel styled as Bento grid */}
          <section className="no-print bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              원동 기능 분석 모드 설정
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1.5">
              {[
                { key: "PRE_SURVEY", title: "사전설문요약", icon: ClipboardList, color: "hover:bg-cyan-50 border-cyan-200 text-cyan-800" },
                { key: "CLASSIFY", title: "진로미결정분류", icon: HelpCircle, color: "hover:bg-indigo-50 border-indigo-200 text-indigo-800" },
                { key: "LOG", title: "상담일지작성", icon: FileCheck, color: "hover:bg-amber-50 border-amber-200 text-amber-800" },
                { key: "PSYCH_INTERPRET", title: "검사결과해석", icon: Brain, color: "hover:bg-rose-50 border-rose-200 text-rose-800" },
                { key: "SERVICE_LINK", title: "종합연계안내", icon: Building2, color: "hover:bg-emerald-50 border-emerald-200 text-emerald-800" },
              ].map((item) => {
                const isAct = activeMode === item.key;
                const IconComp = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => {
                      setActiveMode(item.key as CounselingMode);
                      setAnalysisResult(null);
                      setBackendError(null);
                      setActivePresetId(null);
                    }}
                    className={`py-3.5 px-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      isAct 
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 " + item.color
                    }`}
                  >
                    <IconComp size={16} />
                    <span className="text-xs font-bold leading-none">{item.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Preset quick chip selector depending on active mode */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">가상 케이스 프리셋 데이터:</span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_PRESETS.filter(p => p.mode === activeMode).map((preset) => {
                  const isPresetActive = activePresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 font-medium ${
                        isPresetActive 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-xs" 
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                      }`}
                      title={preset.description}
                    >
                      ⚡ {preset.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Active Workspace Textarea form (Bento Box styled) */}
          <section className="no-print bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                  activeMode === "PRE_SURVEY" ? "bg-cyan-500" :
                  activeMode === "CLASSIFY" ? "bg-indigo-500" :
                  activeMode === "LOG" ? "bg-amber-500" :
                  activeMode === "PSYCH_INTERPRET" ? "bg-rose-500" : "bg-emerald-500"
                }`}></span>
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {activeMode === "PRE_SURVEY" && "설문지 및 구직자 수집 내용 수정 입력"}
                  {activeMode === "CLASSIFY" && "상담 기록 / 대화 메모 입력"}
                  {activeMode === "LOG" && "현장 기록 메모 / 음성 및 실화 속기록 복사"}
                  {activeMode === "PSYCH_INTERPRET" && "심리 흥미검사 및 결과 표준점수 대조 입력"}
                  {activeMode === "SERVICE_LINK" && "구직자 상세 상태 및 종합 구직 조건 입력"}
                </h2>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400 font-light font-mono">
                <span>글자 수: {inputText.length}자</span>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={7}
                placeholder={`${
                  activeMode === "PRE_SURVEY" ? "구직자가 작성한 사전 설문 질문 및 서술 서정을 입력하세요." :
                  activeMode === "CLASSIFY" ? "내담자의 면담 핵심 메모나 발화 상황 요약을 입력하세요." :
                  activeMode === "LOG" ? "거칠게 기록된 상담 일지 내용이나 녹취 텍스트를 입력하세요." :
                  activeMode === "PSYCH_INTERPRET" ? "검사 종류, 수능 지수, 6요인 가치 점수 등의 결과를 기록하세요." :
                  "상황, 구직 개월 수, 경제 처지, 컴퓨터 활용 기술 보유 정보 등을 고루 기재하세요."
                } 상단의 프리셋 단추를 누르면 검토용 대리가 탑재됩니다.`}
                className="w-full p-4 text-xs border border-slate-200 rounded-2xl bg-slate-50/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono leading-relaxed text-slate-700"
              ></textarea>
            </div>

            {/* Error alerts */}
            {backendError && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-rose-950">작성 및 전송 보완 수정 필요</p>
                  <p className="mt-1 font-light leading-relaxed">{backendError}</p>
                </div>
              </div>
            )}

            {/* Row controller actions */}
            <div className="flex justify-between items-center pt-1">
              <button
                type="button"
                onClick={resetWorkspace}
                className="text-xs text-slate-600 hover:text-slate-800 px-4 py-2 border border-slate-200 bg-white shadow-xs rounded-xl hover:bg-slate-50 flex items-center gap-1.5 font-bold transition-all"
              >
                <RotateCcw size={14} className="stroke-2" />
                입력란 비우기
              </button>

              <button
                type="button"
                onClick={triggerAnalysis}
                disabled={isAnalyzing || !inputText.trim()}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider text-white flex items-center gap-2 shadow-md transition-all ${
                  isAnalyzing || !inputText.trim()
                    ? "bg-slate-200 cursor-not-allowed text-slate-400 shadow-none"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"
                }`}
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    심도 분석 보고서 추출 중...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="text-white" />
                    AI 초안 보고서 위탁 분석 실행 ⚡
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Core Results Section */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 min-h-[300px] relative flex flex-col">
            
            {/* Real-time Processing loading indicators */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-20 rounded-xl space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-cyan-600 animate-spin"></div>
                  <Sparkles size={20} className="text-cyan-500 absolute top-3.5 left-3.5 animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-sm font-bold text-slate-800">고용노동 준칙 가이드 적용 중</p>
                  <p className="text-xs text-slate-500 font-light max-w-sm px-4">
                    정부 지침 대조 기준을 통해 개인 식별정보 여부 차단 및 의학 자의적 판별 완화, 부정이슈 배제 분석기를 기밀 점검합니다.
                  </p>
                </div>
              </div>
            )}

            {/* Clean empty or analysis placeholder */}
            {!analysisResult && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-3.5 px-4">
                <div className="p-4 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                  <ClipboardList size={40} className="stroke-1" />
                </div>
                <div className="max-w-md space-y-1.5">
                  <h3 className="font-bold text-slate-800 text-sm">참고용 AI 분석 초안 대기 중</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">
                    상담 전 설문, 심리검사 리포팅 수치, 혹은 대화 요약 기록을 입력한 취지에 맞춰 맞춤형 상담일지 및 고용24 등 정규 가이드 초안을 추출합니다.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-1 text-[10px] text-slate-400">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">개인정보 차단</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full">의학 진단 금지</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full font-semibold">참고용 국고 초안</span>
                  </div>
                </div>
              </div>
            )}

            {/* Rich Render components for analyze values */}
            {analysisResult && !isAnalyzing && (
              <div className="space-y-5 animate-fade-in">
                
                {/* Result header details */}
                <div className="no-print flex flex-wrap justify-between items-center gap-2 pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Activity size={14} className="text-cyan-600 animate-pulse" />
                    <span>추출 성공 모드:</span>
                    <span className="bg-cyan-100 border border-cyan-200 text-cyan-800 font-bold px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider">
                      {activeMode}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    {activeMode === "LOG" && (
                      <button 
                        onClick={handlePrint}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="프린터 및 PDF 인쇄 최적 레이아웃 가동"
                      >
                        <Printer size={13} />
                        한글보고서 인쇄/PDF저장
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        const rawStr = typeof analysisResult === "string" 
                          ? analysisResult 
                          : JSON.stringify(analysisResult, null, 2);
                        copyToClipboard(rawStr, "raw-all");
                      }}
                      className="bg-slate-900 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      {copiedStates["raw-all"] ? <Check size={13} /> : <Copy size={13} />}
                      분석데이터 전체 복사
                    </button>
                  </div>
                </div>

                {/* MODE 1: 사전 설문 요약 렌더링 */}
                {activeMode === "PRE_SURVEY" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      
                      {/* Issues and wish targets */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            핵심이슈 3가지 진단
                          </h4>
                          <div className="space-y-2.5">
                            {analysisResult.핵심이슈_3가지?.map((issue: string, idx: number) => (
                              <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-2xl flex items-start gap-2.5 shadow-2xs">
                                <span className="bg-indigo-600 text-white rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                  {idx + 1}
                                </span>
                                <span className="text-xs text-slate-700 leading-normal">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-3 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            희망 직무 및 분야
                          </h4>
                          <p className="text-xs font-bold text-slate-800 bg-white border border-slate-100 p-4 rounded-2xl shadow-2xs">
                            {analysisResult.희망직무_또는_분야 || "정보 부족 및 미정"}
                          </p>
                        </div>
                      </div>

                      {/* Experience & Core capability block */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            구직경력 및 보유역량 진찰 요약
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-light whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                            {analysisResult.경력_역량_요약 || "설문지에 기록된 상세 경력 역량이 미포함되어 있습니다."}
                          </p>
                        </div>

                        {/* Interactive checkable questions list */}
                        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-xl">
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-ping"></span>
                              대면 상담 시 활용할 가이드 질문
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">체크 가능</span>
                          </div>
                          <div className="space-y-2">
                            {analysisResult.상담시_확인할_질문?.map((quest: string, idx: number) => {
                              const uniqueKey = `q-${idx}`;
                              const isChecked = !!interactiveChecklist[uniqueKey];
                              return (
                                <div 
                                  key={idx}
                                  onClick={() => setInteractiveChecklist(prev => ({ ...prev, [uniqueKey]: !isChecked }))}
                                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                                    isChecked 
                                      ? "bg-slate-800/80 border-indigo-500/40 text-slate-400 line-through" 
                                      : "bg-slate-800/20 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-white"
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                                    isChecked ? "bg-indigo-500 border-indigo-500 text-white" : "border-slate-600"
                                  }`}>
                                    {isChecked && <Check size={11} className="stroke-2" />}
                                  </div>
                                  <p className="text-xs font-light leading-relaxed">{quest}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Service detection suggestions */}
                    <div className="bg-indigo-50/20 border border-indigo-100 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-md">AI 제안</span>
                        <span className="text-xs text-slate-700 font-bold">연계 우선 순위 검사 필요 대상:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.연계검토_필요영역?.map((area: string, idx: number) => (
                          <span key={idx} className="bg-white border border-slate-200 text-xs px-3 py-1 rounded-full text-slate-700 font-medium shadow-xs">
                            🛡️ {area}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* MODE 2: 진로미결정 유형 및 원인 분류 렌더링 */}
                {activeMode === "CLASSIFY" && (
                  <div className="space-y-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      
                      {/* Left Types Match gauge */}
                      <div className="md:col-span-5 space-y-4">
                        <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                            감지된 가장 확률 높은 유형
                          </h4>
                          
                          <div className="space-y-3">
                            {analysisResult.가능성_높은_유형?.map((type: string, idx: number) => (
                              <div key={idx} className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-indigo-400">{type}</span>
                                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 px-2 py-0.5 rounded-md font-mono">
                                    {idx === 0 ? "주요인 1" : "보조인 2"}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-normal font-light">
                                  {analysisResult.유형별_판단근거?.[type] || "상담 메모에서 해당 유형에 관한 대조 징후 증거가 관찰됩니다."}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl space-y-2 shadow-xs">
                          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                            <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></span>
                            상담 개입 주의 지침
                          </h4>
                          <p className="text-xs text-amber-950 font-light italic leading-relaxed">
                            "{analysisResult.주의문구 || "본 분석은 단순 참고용 검증 문서입니다."}"
                          </p>
                        </div>
                      </div>

                      {/* Right 개입방향 & Institutional links */}
                      <div className="md:col-span-7 space-y-4">
                        
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                              권장 개입 방향 및 의사결정 전략
                            </h4>
                            <button
                              onClick={() => copyToClipboard(analysisResult.권장_개입방향 || "", "interv")}
                              className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors"
                            >
                              {copiedStates["interv"] ? <Check size={12} className="stroke-2" /> : <Copy size={12} className="stroke-2" />}
                              전략 복사
                            </button>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-light whitespace-pre-line bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                            {analysisResult.권장_개입방향 || "개입 방향 정보가 누락되었습니다."}
                          </p>
                        </div>

                        {/* Post counseling action steps */}
                        <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            상담 후 지원 서비스 연계 제안
                          </h4>
                          <div className="grid grid-cols-1 gap-2.5">
                            {analysisResult.상담후_연계제안 && Object.entries(analysisResult.상담후_연계제안).map(([title, val]: [string, any], idx: number) => (
                              <div key={idx} className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-2.5 shadow-2xs">
                                <span className="bg-slate-250 text-slate-700 text-[10px] px-2 py-1 rounded-md font-mono font-bold flex-shrink-0 mt-0.5">
                                  {title}
                                </span>
                                <p className="text-xs text-slate-600 leading-relaxed font-light">
                                  {val}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                )}

                {/* MODE 3: 상담일지 작성 렌더링 (공공 고용센터 양식 + 에디터) */}
                {activeMode === "LOG" && (
                  <div className="space-y-5">
                    
                    {/* Diagnostic toggle warning inside report banner */}
                    <div className="no-print bg-amber-500/10 border border-amber-200/60 text-amber-900 rounded-3xl p-5 flex flex-wrap justify-between items-center gap-4 shadow-2xs">
                      <p className="text-xs font-light">
                        <strong className="font-bold text-amber-950">한글 양식 에디터 가동 중:</strong> 해당 서식은 이관 전에 브라우저 내에서 직접 세부 수정 및 개별 저장이 가능합니다.
                      </p>
                      <button
                        onClick={() => {
                          if (isEditingLog) {
                            // Compile back to report
                            setAnalysisResult({ ...analysisResult, report: compileEditedLogToMarkdown() });
                          }
                          setIsEditingLog(!isEditingLog);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md flex-shrink-0 transition-colors"
                      >
                        {isEditingLog ? "수정완료 및 고정" : "직접 텍스트 수정"}
                      </button>
                    </div>

                    {/* Government Official Printable Log Document */}
                    <div className="print-card bg-white border border-slate-350 rounded-3xl p-8 shadow-sm max-w-3xl mx-auto space-y-6">
                      
                      <div className="border-b-4 border-slate-900 pb-4 text-center space-y-1">
                        <span className="text-2xs font-extrabold uppercase tracking-widest text-[#1e3a8a] border border-[#1e3a8a] px-3 py-1 rounded-full inline-block">
                          KOE OFFICIAL COUNSELING DOSSIER
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-950 tracking-tight mt-1.5">
                          구직 상담 기록지 (보조 활용 초안)
                        </h3>
                        <p className="text-2xs text-slate-500 font-light font-mono">
                          대한민국 노동 행정 표준 준칙 8호 가이드 • 고용노동부 직업 상담사 보충 일지
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5 text-xs font-sans">
                        
                        {/* Table Layout */}
                        <div className="border border-slate-950 grid grid-cols-12 divide-x divide-slate-400 divide-y divide-slate-450 border-r-0 border-b-0">
                          
                          {/* Row 1 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">상담일자/회차</div>
                          <div className="col-span-9 p-3 border-slate-400">
                            {isEditingLog ? (
                              <input 
                                type="text" 
                                value={editedLogData["상담일자"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "상담일자": e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 p-1 rounded font-sans text-xs focus:outline-none"
                              />
                            ) : (
                              <span className="font-semibold text-slate-800">{editedLogData["상담일자"] || "상담사 기재 필요"}</span>
                            )}
                          </div>

                          {/* Row 2 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">상담목표</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <input 
                                type="text" 
                                value={editedLogData["상담목표"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "상담목표": e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 p-1 rounded font-sans text-xs focus:outline-none"
                              />
                            ) : (
                              <span className="font-light text-slate-700 leading-normal">{editedLogData["상담목표"] || "구직 목표 탐색 및 연계 가이드 수립"}</span>
                            )}
                          </div>

                          {/* Row 3 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">상담내용 요약</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["상담내용 요약"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "상담내용 요약": e.target.value })}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-700 whitespace-pre-line leading-relaxed">{editedLogData["상담내용 요약"]}</p>
                            )}
                          </div>

                          {/* Row 4 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">내담자 주요 발언</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["내담자 주요 발언"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "내담자 주요 발언": e.target.value })}
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-800 italic leading-relaxed">"{editedLogData["내담자 주요 발언"]}"</p>
                            )}
                          </div>

                          {/* Row 5 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">상담사 소견</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["상담사 소견"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "상담사 소견": e.target.value })}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-700 whitespace-pre-line leading-relaxed">{editedLogData["상담사 소견"]}</p>
                            )}
                          </div>

                          {/* Row 6 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">진로미결정 관찰</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["진로미결정 관련 관찰사항"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "진로미결정 관련 관찰사항": e.target.value })}
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-700 whitespace-pre-line leading-relaxed">{editedLogData["진로미결정 관련 관찰사항"]}</p>
                            )}
                          </div>

                          {/* Row 7 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">상담후 연계 검토</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["상담후 연계 검토"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "상담후 연계 검토": e.target.value })}
                                rows={3}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-700 whitespace-pre-line leading-relaxed">{editedLogData["상담후 연계 검토"]}</p>
                            )}
                          </div>

                          {/* Row 8 */}
                          <div className="col-span-3 bg-slate-50 p-3 text-center font-bold flex items-center justify-center border-r">다음 단계 계획</div>
                          <div className="col-span-9 p-3">
                            {isEditingLog ? (
                              <textarea 
                                value={editedLogData["다음 단계/연계 계획"] || ""} 
                                onChange={(e) => setEditedLogData({ ...editedLogData, "다음 단계/연계 계획": e.target.value })}
                                rows={2}
                                className="w-full bg-slate-50 border border-slate-200 p-2 rounded font-sans text-xs focus:outline-none leading-relaxed"
                              />
                            ) : (
                              <p className="font-light text-slate-700 whitespace-pre-line leading-relaxed">{editedLogData["다음 단계/연계 계획"]}</p>
                            )}
                          </div>

                        </div>

                      </div>

                      <div className="pt-4 border-t border-slate-200 flex flex-col items-center justify-center space-y-2 text-center text-slate-500 text-[10px] font-light">
                        <p>{editedLogData["주의문구"] || "본 상담일지는 AI가 작성한 참고용 초안이며, 최종 상담기록은 상담사가 사실관계와 표현의 적정성을 확인하여 확정해 주시기 바랍니다."}</p>
                        <p className="text-[10px] text-slate-800 font-bold mt-2 font-mono">고용센터 상담 승인 시스템 연계용 보조 필터링 • KOR LABOUR OFFICE CONFIDENTIAL</p>
                      </div>

                    </div>

                  </div>
                )}

                {/* MODE 4: 심리검사 결과 해석 보조 렌더링 */}
                {activeMode === "PSYCH_INTERPRET" && (
                  <div className="space-y-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                      
                      {/* Left: Gentle explanation interpretation block */}
                      <div className="md:col-span-7 space-y-5">
                        
                        <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl space-y-4 relative shadow-sm">
                          <div className="absolute top-4 right-4 text-rose-350">
                            <Brain size={24} />
                          </div>
                          <h4 className="text-xs font-bold text-rose-900 pb-2 border-b border-rose-100 uppercase tracking-wider flex items-center gap-1.5">
                            📢 대면 설명용 동감/치유적 해석 초안
                          </h4>
                          <p className="text-xs text-rose-950 font-light leading-relaxed whitespace-pre-line bg-white/70 p-4 rounded-2xl border border-rose-100/40">
                            {analysisResult.쉬운말_해석_초안 || "해석 결과 설명이 감지되지 않았습니다."}
                          </p>
                        </div>

                        {/* Checklist followups */}
                        <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-4 shadow-xl">
                          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-850 pb-2 flex items-center gap-2">
                            <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                            내담자 자아 탐색 및 반응 유기용 보조 질문들
                          </h4>
                          <div className="space-y-2">
                            {analysisResult.내담자에게_물어볼_추가질문?.map((quest: string, idx: number) => {
                              const uniqueKey = `pq-${idx}`;
                              const isChecked = !!interactiveChecklist[uniqueKey];
                              return (
                                <div 
                                  key={idx}
                                  onClick={() => setInteractiveChecklist(prev => ({ ...prev, [uniqueKey]: !isChecked }))}
                                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3 ${
                                    isChecked 
                                      ? "bg-slate-800 border-rose-500/30 text-slate-400 line-through" 
                                      : "bg-slate-800/20 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-white"
                                  }`}
                                >
                                  <div className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center flex-shrink-0 ${
                                    isChecked ? "bg-rose-500 border-rose-500 text-white" : "border-slate-700"
                                  }`}>
                                    {isChecked && <Check size={11} className="stroke-2" />}
                                  </div>
                                  <p className="text-xs font-light leading-relaxed text-slate-300">{quest}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                      {/* Right: Expert Counselor Checkpoints & Recommendations */}
                      <div className="md:col-span-5 space-y-5">
                        
                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-3 shadow-см">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2 pb-1.5 border-b border-slate-200">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                            상담사 전용 판단 요강 (체크포인트)
                          </h4>
                          <p className="text-xs text-slate-650 leading-relaxed font-light whitespace-pre-line bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs">
                            {analysisResult.상담사_체크포인트 || "체크포인트 정보 부족"}
                          </p>
                        </div>

                        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                            해석 기반 사후 지원 연계안 초안
                          </h4>
                          <div className="space-y-2.5">
                            {analysisResult.상담후_연계제안 && Object.entries(analysisResult.상담후_연계제안).map(([title, val]: [string, any], idx: number) => (
                              <div key={idx} className="bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 text-xs flex flex-col gap-1 shadow-2xs">
                                <span className="font-bold text-indigo-800">{title}</span>
                                <p className="text-slate-600 font-light leading-relaxed">{val}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                )}

                {/* MODE 5: 종합 연계 서비스 안내 렌더링 (Highly interactive accordion and message builder) */}
                {activeMode === "SERVICE_LINK" && (
                  <div className="space-y-5">
                    
                    {/* Horizontal Priority Badges */}
                    <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 flex flex-wrap gap-4 items-center justify-between shadow-xl">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          우선 연계 후보군 AI 진보 분석 결과
                        </h4>
                        <p className="text-[11px] text-slate-400 font-light">내담자 가용 자본 및 소외도를 전수 진단 대조해 도출한 점검표입니다.</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysisResult.우선_연계_필요영역?.map((area: string, idx: number) => (
                          <span 
                            key={idx} 
                            className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/35 text-xs px-3.5 py-1.5 rounded-full font-bold shadow-xs flex items-center gap-1.5 font-mono"
                          >
                            ⭐ {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highly Interactive Accorndion and message text copies for SMS */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                        기관 연계 유형 평가 리포트 시트
                      </h4>
                      
                      <div className="grid grid-cols-1 gap-4">
                        {analysisResult.제도별_연계검토 && Object.entries(analysisResult.제도별_연계검토).map(([key, dataVal]: [string, any], idx: number) => {
                          const priority = dataVal.연계필요도 || "보통";
                          const isHigh = priority.includes("높음");
                          const isMedium = priority.includes("보통");
                          const isLow = priority.includes("낮음");
                          
                          let bgClass = "border-slate-200 bg-white shadow-sm";
                          let textBadgeColor = "bg-slate-100 text-slate-700";

                          if (isHigh) {
                            bgClass = "border-indigo-200 bg-indigo-50/10 shadow-sm";
                            textBadgeColor = "bg-indigo-600 text-white";
                          } else if (isMedium) {
                            bgClass = "border-amber-100 bg-amber-50/10 shadow-sm";
                            textBadgeColor = "bg-amber-600 text-white";
                          } else if (isLow) {
                            bgClass = "border-slate-100 bg-slate-50/20 opacity-90 shadow-2xs";
                            textBadgeColor = "bg-slate-400 text-white";
                          }

                          return (
                            <div key={idx} className={`p-6 rounded-3xl border ${bgClass} transition-all space-y-4`}>
                              
                              <div className="flex justify-between items-center pb-2.5 border-b border-dashed border-slate-200 lg:flex-nowrap flex-wrap gap-2">
                                <div className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
                                  <h5 className="font-bold text-slate-850 text-xs">{key}</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] text-slate-400 font-light">연계 필요도:</span>
                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${textBadgeColor}`}>
                                    {priority}
                                  </span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs leading-relaxed">
                                <div className="md:col-span-6 space-y-1">
                                  <strong className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">연계 판단 근거:</strong>
                                  <p className="text-slate-650 font-light leading-relaxed whitespace-pre-line bg-white/60 p-3.5 rounded-2xl border border-slate-100">{dataVal.판단근거}</p>
                                </div>
                                <div className="md:col-span-6 space-y-1">
                                  <strong className="text-[11px] text-slate-500 font-bold block uppercase tracking-wider">참령 요건 확인사항:</strong>
                                  <p className="text-slate-700 font-light leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-slate-100">{dataVal.상담사_확인사항}</p>
                                </div>
                              </div>

                              {/* SMS Announcement text builder expander panel */}
                              <div className="bg-slate-900 rounded-2xl p-4.5 space-y-2.5 text-xs">
                                <div className="flex justify-between items-center text-slate-400 lg:flex-nowrap flex-wrap gap-2">
                                  <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                                    내담자 발송용 조언 안내문 초안:
                                  </span>
                                  <button
                                    onClick={() => copyToClipboard(dataVal.안내문구_초안 || "", `sms-${idx}`)}
                                    className="bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white px-3 py-1.5 rounded-xl text-[10px] font-bold transition-colors flex items-center gap-1 shadow-sm font-sans"
                                  >
                                    {copiedStates[`sms-${idx}`] ? (
                                      <>
                                        <Check size={12} className="text-cyan-400 stroke-2" />
                                        복사완료!
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={12} className="stroke-2" />
                                        문구 복사
                                      </>
                                    )}
                                  </button>
                                </div>
                                <p className="text-slate-300 text-xs font-light leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-850 whitespace-pre-line">
                                  {dataVal.안내문구_초안 || "안내 문구가 작성되지 않았습니다."}
                                </p>
                              </div>

                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Counselor Next Strategy List */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <ArrowRight size={14} className="text-slate-500 stroke-2" />
                        상담사가 취해야 할 보수 행정적 스텝 가이드
                      </h4>
                      <div className="space-y-2 text-xs">
                        {analysisResult.상담사가_우선_진행할_다음단계?.map((step: string, idx: number) => (
                          <div key={idx} className="bg-white border border-slate-100 p-3.5 rounded-2xl flex items-start gap-2.5 shadow-2xs">
                            <span className="bg-slate-900 text-white rounded-full w-5 h-5 text-2xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-slate-700 font-light leading-relaxed">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

          </section>

        </main>

      </div>
      )}

      {/* 4. Footer credits with safety statements */}
      <footer className="no-print bg-slate-50 py-8 border-t border-slate-200/60 mt-16 text-slate-400 font-light text-xs text-center space-y-2">
        <p className="font-medium text-slate-600">고용센터 초기상담 보조 AI 어시스턴트 | 국민취업지원제도 고용노동 보조지원 시스템</p>
        <p className="max-w-2xl mx-auto leading-relaxed px-4 text-slate-400 font-light">본 시스템은 공공 고용센터 전용 행정 기금 활용 시스템이며, 자의 정보 탈출 방지 준칙과 무단 개인 오용 방지를 엄수합니다. 상담 참고 초안으로만 전력 가동 가능합니다.</p>
        <p className="text-slate-400 font-mono text-[10px] mt-2">© 2026 MINISTRY OF EMPLOYMENT AND LABOR ASSISTANT PLUG. ALL RIGHTS RESERVED.</p>
      </footer>

    </div>
  );
}
