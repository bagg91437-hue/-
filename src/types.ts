/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CounselingMode = "PRE_SURVEY" | "CLASSIFY" | "LOG" | "PSYCH_INTERPRET" | "SERVICE_LINK";

export interface ClientCase {
  id: string;
  caseNumber: string;
  clientLabel: string; // "내담자 #1001" or customized label, strictly avoiding actual sensitive identity exposure
  registeredAt: string;
  memo: string;
  mode: CounselingMode;
  analysisResult?: any;
}

export interface PreSurveyResponse {
  핵심이슈_3가지: string[];
  희망직무_또는_분야: string;
  경력_역량_요약: string;
  상담시_확인할_질문: string[];
  연계검토_필요영역: string[];
}

export interface ClassifyResponse {
  가능성_높은_유형: string[];
  유형별_판단근거: Record<string, string>;
  권장_개입방향: string;
  상담후_연계제안: {
    국민취업지원제도: string;
    구직자도약패키지: string;
    심리안정프로그램: string;
    직업훈련: string;
    기타_연계: string;
  };
  주의문구: string;
}

export interface LogResponse {
  report: string;
}

export interface PsychInterpretResponse {
  쉬운말_해석_초안: string;
  내담자에게_물어볼_추가질문: string[];
  상담사_체크포인트: string;
  상담후_연계제안: {
    심리안정프로그램: string;
    구직자도약패키지: string;
    직업훈련: string;
    기타_연계: string;
  };
  주의문구: string;
}

export interface ServiceLinkDetail {
  연계필요도: "높음" | "보통" | "낮음" | "정보 부족" | string;
  판단근거: string;
  상담사_확인사항: string;
  안내문구_초안: string;
}

export interface ServiceLinkResponse {
  우선_연계_필요영역: string[];
  제도별_연계검토: {
    국민취업지원제도: ServiceLinkDetail;
    구직자도약패키지: ServiceLinkDetail;
    심리안정프로그램: ServiceLinkDetail;
    직업훈련: ServiceLinkDetail;
    기타_고용서비스: ServiceLinkDetail;
  };
  상담사가_우선_진행할_다음단계: string[];
  주의문구: string;
}
