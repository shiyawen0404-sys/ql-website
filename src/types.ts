export type MainNavTab = 
  | 'home' 
  | 'services' 
  | 'mediators' 
  | 'cases' 
  | 'news' 
  | 'help' 
  | 'about';

export type ServicesSubTab = 
  | 'scope' 
  | 'process' 
  | 'rules' 
  | 'fees' 
  | 'apply' 
  | 'query';

export type MediatorsSubTab = 
  | 'roster' 
  | 'how-to-choose' 
  | 'become-mediator'
  | 'join';

export type CasesSubTab = 
  | 'cases' 
  | 'research' 
  | 'annual-reports'
  | 'stats'
  | 'statistics';

export type CasesResearchSubTab = CasesSubTab;

export type NewsSubTab = 
  | 'center-news' 
  | 'notices' 
  | 'notice'
  | 'industry' 
  | 'regulations'
  | 'policy';

export type HelpSubTab = 
  | 'faq'
  | 'tips'
  | 'guide'
  | 'contact'
  | 'faq-overview'
  | 'faq-eligibility'
  | 'faq-apply'
  | 'faq-mediators'
  | 'faq-fees'
  | 'faq-process'
  | 'faq-success'
  | 'faq-failure'
  | 'system-ops'
  | 'guide-videos';

export type AboutSubTab = 
  | 'intro' 
  | 'structure' 
  | 'mechanisms' 
  | 'regulations' 
  | 'contact' 
  | 'contact-us'
  | 'cooperation'
  | 'advisors'
  | 'partners';

export type LoginRoleTab = 'party' | 'mediator' | 'code' | 'mediation-code';
export type LoginMode = LoginRoleTab;

export interface Mediator {
  id: string;
  name: string;
  avatar: string;
  title: string;
  organization: string;
  background: '律师' | '学者' | '行业专家' | '司法实务背景' | '企业法务' | '仲裁员' | '知识产权代理人' | '技术专家' | '行业商协会人员' | '退休司法人员' | string;
  industries: string[];
  disputeTypes: string[];
  education: string;
  experienceYears: number;
  casesHandled: number;
  successRate: string;
  profile: string;
  careerBackground: string[];
  representativeCases: string[];
  isFeatured?: boolean;
  style?: string;
  cases?: string[];
}

export interface MediationCase {
  id: string;
  title: string;
  category: '合同纠纷' | '知识产权' | '平台纠纷' | '新型业态' | string;
  industry: string;
  disputeAmount: string;
  durationDays: number;
  date: string;
  tags: string[];
  summary: string;
  disputeFocus: string[];
  process: string;
  resultAnalysis: string;
  industryInspiration: string;
  focus?: string;
  result?: string;
  analysis?: string;
  revelation?: string;
}

export interface ResearchArticle {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  date: string;
  tags: string[];
  abstract: string;
  content: string[];
  readTime: string;
  category?: string;
  publishOrg?: string;
  readCount?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'center-news' | 'notices' | 'notice' | 'industry' | 'regulations' | 'policy' | string;
  date: string;
  source: string;
  summary: string;
  content: string[];
  isTop?: boolean;
  isImportant?: boolean;
  viewCount?: number;
}

export interface GuideVideoItem {
  id: string;
  title: string;
  duration: string;
  description: string;
  coverColor: string;
  steps: string[];
}

export interface CaseRecord {
  caseNumber: string;
  mediationCode: string;
  applicant: string;
  respondent: string;
  disputeType: string;
  industry: string;
  claimAmount: string;
  mediatorName: string;
  mediatorOrg: string;
  applyDate: string;
  status: '待审核' | '调解中' | '已达成协议' | '已出具调解书' | '调解终结';
  currentStep: number;
  meetingDate?: string;
  meetingRoomUrl?: string;
  timeline: Array<{
    date: string;
    title: string;
    desc: string;
    completed: boolean;
  }>;
  documents: Array<{
    name: string;
    type: string;
    date: string;
    size: string;
  }>;
}
