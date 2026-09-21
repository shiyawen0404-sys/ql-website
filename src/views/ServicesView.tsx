import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Upload, 
  Search, 
  Calendar, 
  Download, 
  User, 
  Building2, 
  Phone, 
  Calculator, 
  ArrowRight, 
  Check, 
  ExternalLink,
  Video,
  Clock,
  ChevronRight,
  FileCheck
} from 'lucide-react';
import { ServicesSubTab } from '../types';
import { MOCK_CASE_RECORD } from '../data/mockData';

interface ServicesViewProps {
  initialSubTab?: ServicesSubTab;
  prefilledCode?: string;
  onOpenConsult: () => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  initialSubTab = 'scope',
  prefilledCode = '',
  onOpenConsult
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ServicesSubTab>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Case query state
  const [queryCode, setQueryCode] = useState(prefilledCode || 'QL-2026-0318');
  const [queryPhone, setQueryPhone] = useState('8899');
  const [queriedRecord, setQueriedRecord] = useState<typeof MOCK_CASE_RECORD | null>(
    prefilledCode ? MOCK_CASE_RECORD : null
  );
  const [queryError, setQueryError] = useState('');
  const [inOnlineRoom, setInOnlineRoom] = useState(false);

  // Apply Form wizard state (1: 申请须知, 2: 填写申请信息, 3: 上传材料, 4: 提交申请确认, 5: 提交成功)
  const [applyStep, setApplyStep] = useState(1);
  const [agreedNotice, setAgreedNotice] = useState(false);
  const [applicantType, setApplicantType] = useState<'person' | 'company'>('company');
  const [applicantName, setApplicantName] = useState('北京某影视传媒文化有限公司');
  const [applicantId, setApplicantId] = useState('91110101MA01ABCD9X');
  const [applicantPhone, setApplicantPhone] = useState('13800138899');
  const [respondentName, setRespondentName] = useState('华影数字互娱（北京）科技有限公司');
  const [respondentPhone, setRespondentPhone] = useState('13911223344');
  const [disputeCategory, setDisputeCategory] = useState('合同纠纷');
  const [disputeFact, setDisputeFact] = useState('双方于2025年签署《网络短剧独家播映授权协议》，被申请人未按期结算第二期保底收益款项共计80万元...');
  const [claimAmount, setClaimAmount] = useState('800000');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    '营业执照及法定代表人证明书.pdf',
    '网络短剧独家播映授权协议（签字盖章版）.pdf',
    '催告结款函件及微信沟通记录存证.zip'
  ]);
  const [generatedCode, setGeneratedCode] = useState<string>('');

  // Fee calculator state
  const [calcAmount, setCalcAmount] = useState<number>(500000);
  const [calcResult, setCalcResult] = useState({
    mediationFee: 3200,
    litigationCompare: 8800,
    savings: 5600
  });

  const calculateFee = (amount: number) => {
    let fee = 1000;
    if (amount <= 50000) {
      fee = 800;
    } else if (amount <= 100000) {
      fee = 1500;
    } else if (amount <= 500000) {
      fee = 1500 + (amount - 100000) * 0.005;
    } else if (amount <= 1000000) {
      fee = 3500 + (amount - 500000) * 0.004;
    } else {
      fee = 5500 + (amount - 1000000) * 0.002;
    }

    // Rough comparison with court litigation fee
    let courtFee = 50;
    if (amount <= 10000) courtFee = 50;
    else if (amount <= 100000) courtFee = amount * 0.025 - 200;
    else if (amount <= 200000) courtFee = amount * 0.02 + 300;
    else if (amount <= 500000) courtFee = amount * 0.015 + 1300;
    else if (amount <= 1000000) courtFee = amount * 0.01 + 3800;
    else courtFee = amount * 0.005 + 8800;

    setCalcResult({
      mediationFee: Math.round(fee),
      litigationCompare: Math.round(courtFee),
      savings: Math.max(0, Math.round(courtFee - fee))
    });
  };

  const handleQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setQueryError('');
    if (!queryCode.trim()) {
      setQueryError('请输入调解码或案号');
      return;
    }
    // Simulate finding matching mock record or fallback
    setQueriedRecord(MOCK_CASE_RECORD);
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `QL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedCode(randomCode);
    setApplyStep(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Page Title & Breadcrumb */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">调解服务</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              文娱产业纠纷调解服务
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              全门类受案标准 · 规范调解程序 · 公益普惠收费 · 全程网上立案与案件跟踪
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubTab('apply')}
              className="px-4 py-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>快速申请调解</span>
            </button>
            <button
              onClick={() => setActiveSubTab('query')}
              className="px-4 py-2 bg-white border border-[#0e2954]/30 hover:border-[#0e2954] text-[#0e2954] rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>案件进度查询</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'scope', label: '受理范围' },
            { id: 'process', label: '调解流程' },
            { id: 'rules', label: '调解规则' },
            { id: 'fees', label: '收费方法' },
            { id: 'apply', label: '申请调解' },
            { id: 'query', label: '案件查询' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as ServicesSubTab)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeSubTab === tab.id
                  ? 'bg-[#0e2954] text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          1. 受理范围 (Scope)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'scope' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* 受理范围概览 */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>法定专业受理范围</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">受理范围概览</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
              北京市东城区清朗文娱产业纠纷解决中心依据国家法律法规及行业主管指导意见设立，受理平等主体的自然人、法人和非法人组织之间因文化娱乐创作、传播、经营、投资及相关新兴数字产业活动所发生的各类民商事争议。
            </p>
          </div>

          {/* 三大类详细展开 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 合同纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">合同纠纷</h4>
                  <p className="text-[11px] text-slate-500">商业合作履约与违约争议</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="space-y-1">
                  <div className="font-semibold text-blue-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                    <span>合作 / 委托 / 经纪合同</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    演艺经纪合同解约、MCN达人签约分润、经纪人佣金争议、演出商委托承办违约纠纷。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-blue-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                    <span>制作 / 发行 / 授权合同</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    影视联合摄制出品协议、海外版权发行分账、音乐原声授权许可、剧本委托创作对赌条款争议。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-blue-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                    <span>其他合同争议</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    文娱项目投融资收益分配、冠名赞助合作履约、影视宣发投流服务质量纠纷。
                  </p>
                </div>
              </div>
            </div>

            {/* 权属与侵权纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-900 flex items-center justify-center font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">权属与侵权纠纷</h4>
                  <p className="text-[11px] text-slate-500">知识产权与商业标识侵权</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="space-y-1">
                  <div className="font-semibold text-indigo-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                    <span>著作权争议</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    剧本“洗稿”与抄袭认定、音乐作品署名权与改编权纠纷、动漫美术作品网络传播权侵权。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-indigo-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                    <span>商标 / 商业标识</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    文娱知名栏目名称仿冒、衍生周边潮玩商标侵权、文创品牌不正当竞争争议。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-indigo-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                    <span>邻接权与人格权</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    表演者权、录音录像制作者权纠纷；演艺公众人物肖像权、名誉权网络侵权民事赔偿。
                  </p>
                </div>
              </div>
            </div>

            {/* 新型业态纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">新型业态纠纷</h4>
                  <p className="text-[11px] text-slate-500">前沿技术与平台数字创意</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="space-y-1">
                  <div className="font-semibold text-purple-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                    <span>AIGC与生成式AI</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    大模型训练语料抓取版权合规、文生图/音视频商用权属认定、虚拟数字人形象侵权。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-purple-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                    <span>短视频 / 直播 / 微短剧</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    微短剧剧本抄袭盗播、BGM背景音乐切片侵权、主播连麦打赏分润及账号封禁申诉。
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-purple-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                    <span>数字音乐与平台治理</span>
                  </div>
                  <p className="text-slate-500 pl-2.5">
                    流媒体平台版税结算透明度、避风港通知-删除规则争议、算法推荐文娱合规。
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 不予受理情形 (Explicit Requirement) */}
          <div className="bg-red-50/70 rounded-2xl p-6 border border-red-200/80 space-y-3">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
              <span>不予受理情形特别提示</span>
            </div>
            <p className="text-xs text-red-950/80 leading-relaxed">
              根据《北京市东城区清朗文娱产业纠纷解决中心调解规则》第九条规定，对下列情形不予受理：
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-red-900">
              <div className="flex items-start gap-1.5">
                <span className="text-red-700 font-bold">•</span>
                <span>涉及危害国家安全、公共利益或违反公序良俗的争议；</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-red-700 font-bold">•</span>
                <span>涉嫌偷逃税款、虚假诉讼、洗钱等刑事违法犯罪线索的；</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-red-700 font-bold">•</span>
                <span>婚姻家庭、继承等纯身份关系纠纷及法定劳动人事争议；</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-red-700 font-bold">•</span>
                <span>已经人民法院生效裁判或仲裁裁决确定，当事人借调解重复起争议的；</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. 调解流程 (Process)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'process' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-2xl space-y-1">
              <h3 className="text-xl font-bold text-slate-900 font-serif">六步闭环专业调解流程</h3>
              <p className="text-xs text-slate-500">
                本中心遵循当事人自愿原则，采取线上与线下结合的调解程序，全流程依法受保密保护
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  step: '第一步',
                  title: '提交申请',
                  subtitle: '当事人在线或现场提交材料',
                  content: '申请人通过本平台在线填报申请书，简述纠纷基本事实、提供双方联系方式及明确的调解请求，并上传营业执照/身份证复印件、涉案合同及核心侵权证据清单。',
                  tags: ['线上免费提交', '即时生成调解码', '支持代理人提交']
                },
                {
                  step: '第二步',
                  title: '受理审查',
                  subtitle: '秘书处2个工作日内完成合规初审',
                  content: '中心立案秘书审查申请事项是否属于文娱纠纷受理范围、材料是否完备。符合条件的即日立案；同时主动以中立机构名义联络被申请人，向其释明调解优势并征求调解意愿。',
                  tags: ['2工作日办结', '主动联络被申请人', '一次性告知补正']
                },
                {
                  step: '第三步',
                  title: '确定调解员',
                  subtitle: '当事人自愿选定或委托指定中立专家',
                  content: '双方当事人可在中心《调解员名册》中协商选定1名专业对口的调解员。若双方5日内未能协商一致，由中心主任根据案由特点指派。调解员接受指定后审查有无回避情形并出具独立公正承诺。',
                  tags: ['名册公开自选', '支持回避申请', '专家学者入册']
                },
                {
                  step: '第四步',
                  title: '开展调解',
                  subtitle: '线上视频会议与背靠背多元沟通',
                  content: '调解员审阅卷宗后排定调解日程。可采取面对面会议、远程视频调解或单独背靠背沟通等方式。调解员协助各方梳理事理、厘清法律风险，共同探讨符合商业利益的最优方案。',
                  tags: ['全程加密保密', '不影响后续诉讼', '7-20工作日']
                },
                {
                  step: '第五步',
                  title: '达成调解协议',
                  subtitle: '起草协议书并完成CA实人电子签署',
                  content: '双方达成和解的，调解员指导起草规范严谨的《调解协议书》。协议内容明确双方履行时间、金额及后续免责条款。各方在平台通过人脸认证与CA电子签名在线签署。',
                  tags: ['严谨法律表述', '电子存证确权', '双方签字盖章']
                },
                {
                  step: '第六步',
                  title: '履行 / 后续处理',
                  subtitle: '当事人自觉履行或申请人民法院司法确认',
                  content: '调解协议签订后当事人自愿履行。同时，双方可向中心申请移送北京市东城区人民法院在线办理“司法确认”。法院审查出具民事裁定书，该裁定书具有国家强制执行力。若调解未达成，无缝转交诉讼立案。',
                  tags: ['法院司法确认', '赋予强制执行力', '诉调绿色通道']
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-6 border-b border-slate-100 pb-6 last:border-none">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#0e2954] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                      {item.step.slice(0, 3)}
                    </div>
                    {idx < 5 && <div className="w-0.5 h-full bg-slate-200 my-2" />}
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                        <span className="text-xs text-slate-500 font-medium">({item.subtitle})</span>
                      </div>
                      <div className="flex gap-1.5">
                        {item.tags.map((t, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. 调解规则 (Rules)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'rules' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              北京市东城区清朗文娱产业纠纷解决中心调解规则
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              （2025年12月修订试行，规范文号：清朗调规字〔2025〕02号）
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-900 rounded" />
                第一章 调解基本原则
              </h4>
              <p>
                <strong>第一条（自愿原则）</strong> 纠纷调解坚持各方自愿。是否申请调解、是否同意调解、是否接受调解方案均取决于当事人真实自主意思表示，任何机构或个人不得强迫调解。
              </p>
              <p>
                <strong>第二条（中立公正原则）</strong> 中心及调解员坚持中立立场，不偏袒任何一方，严格依据国家法律法规、行业公认准则及诚信公平理念引导协商。
              </p>
              <p>
                <strong>第三条（全程保密原则）</strong> 调解过程不公开进行。调解员、秘书处及参调各方负有法定保密义务。任何当事人在调解中所作出的让步，不得在后续诉讼或仲裁程序中作为对其不利的依据。
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-900 rounded" />
                第二章 当事人权利与义务
              </h4>
              <p>
                <strong>第四条（当事人权利）</strong> 当事人享有自主选定调解员、申请调解员回避、自主陈述案情及提供证据、自行决定和解条款、随时申请终止调解等权利。
              </p>
              <p>
                <strong>第五条（当事人义务）</strong> 当事人应当如实陈述事实，提供真实合法的证明材料；自觉遵守调解会场纪律；恪守保密承诺；按期全面诚信履行达成的生效调解协议。
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-900 rounded" />
                第三章 调解程序与期限
              </h4>
              <p>
                <strong>第六条（调解期限）</strong> 普通案件调解期限为自调解员确定之日起20个工作日。微短剧及紧急侵权争议启动快调通道，期限为7个工作日。经双方当事人书面同意，可适度延长。
              </p>
              <p>
                <strong>第七条（司法确认对接）</strong> 达成调解协议后，中心协助双方当事人向北京市东城区人民法院申请司法确认。人民法院审查后裁定协议有效，具有与生效判决同等的强制执行力。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          4. 收费方法 (Fees & Interactive Calculator)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'fees' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* 收费原则与政策说明 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                公益普惠性收费方法及标准
              </h3>
              <p className="text-xs text-slate-500">
                立足首都文娱法治营商环境建设，坚持公益普惠、低廉收费、不成功不收费原则
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">立案阶段零费用</div>
                <p className="text-slate-500">申请立案、审查受理及初次联络沟通全程不收取任何立案费用。</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">调解不成功不收费</div>
                <p className="text-slate-500">若最终未能达成调解协议，中心不收取任何实体案件调解费。</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-blue-900">仅为诉讼费的20%-30%</div>
                <p className="text-slate-500">成功达成和解的，按涉案标的超低累进收取综合保障服务费。</p>
              </div>
            </div>

            {/* 收费标准对照表 */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">争议标的额区间</th>
                    <th className="p-3">中心综合调解费标准</th>
                    <th className="p-3">传统一审诉讼费对比（估算）</th>
                    <th className="p-3">费用承担方式</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="p-3 font-medium">无争议金额 / 纯行为争议（如停止侵权、致歉）</td>
                    <td className="p-3 text-blue-900 font-semibold">500 - 800 元 / 件</td>
                    <td className="p-3">1,000 - 3,000 元</td>
                    <td className="p-3">双方平摊或依协议约定</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">10万元以下（含10万元）</td>
                    <td className="p-3 text-blue-900 font-semibold">800 - 1,500 元</td>
                    <td className="p-3">约 2,300 元</td>
                    <td className="p-3">双方平摊或依协议约定</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">超过10万元至50万元部分</td>
                    <td className="p-3 text-blue-900 font-semibold">按 0.5% 累进加收</td>
                    <td className="p-3">按 1.5% 累进收取</td>
                    <td className="p-3">双方平摊或依协议约定</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">超过50万元至100万元部分</td>
                    <td className="p-3 text-blue-900 font-semibold">按 0.4% 累进加收</td>
                    <td className="p-3">按 1.0% 累进收取</td>
                    <td className="p-3">双方平摊或依协议约定</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">超过100万元以上部分</td>
                    <td className="p-3 text-blue-900 font-semibold">按 0.2% 累进加收（最高封顶）</td>
                    <td className="p-3">按 0.5% 累进收取</td>
                    <td className="p-3">双方平摊或依协议约定</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 调解费交互式试算器 */}
            <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                <Calculator className="w-4 h-4 text-blue-800" />
                <span>文娱调解费与诉讼成本在线对比试算</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    请输入您的涉案争议财产标的金额（元）:
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-xs font-bold text-slate-500">¥</span>
                    <input
                      type="number"
                      value={calcAmount}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 0;
                        setCalcAmount(val);
                        calculateFee(val);
                      }}
                      className="w-full pl-7 pr-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => calculateFee(calcAmount)}
                    className="w-full py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold"
                  >
                    立即测算对比
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <div className="text-[11px] text-slate-500">本中心调解费（和解成功后）</div>
                  <div className="text-lg font-bold text-blue-900 font-mono mt-0.5">
                    ¥ {calcResult.mediationFee.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-white rounded-lg border border-blue-100">
                  <div className="text-[11px] text-slate-500">法院一审诉讼费估算</div>
                  <div className="text-lg font-bold text-slate-600 font-mono mt-0.5">
                    ¥ {calcResult.litigationCompare.toLocaleString()}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-[11px] text-emerald-800 font-medium">预计为您节省直接成本</div>
                  <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
                    ¥ {calcResult.savings.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          5. 申请调解 (Apply Wizard Form)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'apply' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          {/* Steps Breadcrumb */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">在线提交调解申请</h3>
              <p className="text-xs text-slate-500">足不出户·网上流转·2个工作日内反馈初审结果</p>
            </div>
            <div className="text-xs font-medium text-slate-400">
              第 <strong className="text-blue-900 font-bold">{applyStep}</strong> / 5 步
            </div>
          </div>

          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-medium text-slate-500">
            {['1.申请须知', '2.填写信息', '3.上传材料', '4.提交确认', '5.完成受理'].map((s, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  applyStep > idx + 1 ? 'bg-emerald-500 text-white' : applyStep === idx + 1 ? 'bg-[#0e2954] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {idx + 1}
                </span>
                <span className={applyStep === idx + 1 ? 'text-blue-950 font-bold' : ''}>{s.slice(2)}</span>
              </div>
            ))}
          </div>

          {/* STEP 1: 申请须知 */}
          {applyStep === 1 && (
            <div className="space-y-4 max-w-2xl mx-auto py-2">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-2 leading-relaxed max-h-72 overflow-y-auto">
                <h4 className="font-bold text-slate-900 text-sm">北京市东城区清朗文娱产业纠纷解决中心 调解申请须知</h4>
                <p>一、申请人保证所陈述的事实、提交的身份证明及证据文件客观真实、合法有效，无伪造隐匿情况；</p>
                <p>二、调解坚持双方自愿、平等协商原则。调解员主持调解过程不公开，各方均负有保密义务；</p>
                <p>三、申请人提交后，中心将在2个工作日内完成受理审查，并积极联络被申请人征询调解意见；</p>
                <p>四、达成调解协议后，双方可向中心申请报送北京市东城区人民法院在线进行司法确认，出具具有强制执行力的裁定书。</p>
              </div>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={agreedNotice}
                  onChange={(e) => setAgreedNotice(e.target.checked)}
                  className="rounded text-blue-900 focus:ring-blue-900"
                />
                <span>我已阅读并完全同意上述《调解申请须知》及相关保密承诺</span>
              </label>

              <div className="pt-3">
                <button
                  disabled={!agreedNotice}
                  onClick={() => setApplyStep(2)}
                  className="w-full py-2.5 bg-[#0e2954] hover:bg-[#163b63] disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>下一步：填写当事人及纠纷信息</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: 填写申请信息 */}
          {applyStep === 2 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    checked={applicantType === 'company'}
                    onChange={() => setApplicantType('company')}
                  />
                  <span>企业 / 机构申请人</span>
                </label>
                <label className="flex items-center gap-1.5 font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="appType"
                    checked={applicantType === 'person'}
                    onChange={() => setApplicantType('person')}
                  />
                  <span>自然人申请人（艺人/编剧/个人创作者）</span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {applicantType === 'company' ? '申请人企业名称' : '申请人姓名'} *
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    {applicantType === 'company' ? '统一社会信用代码' : '身份证号码'} *
                  </label>
                  <input
                    type="text"
                    value={applicantId}
                    onChange={(e) => setApplicantId(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">被申请人名称 / 姓名 *</label>
                  <input
                    type="text"
                    value={respondentName}
                    onChange={(e) => setRespondentName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">被申请人联系电话 / 负责人电话 *</label>
                  <input
                    type="tel"
                    value={respondentPhone}
                    onChange={(e) => setRespondentPhone(e.target.value)}
                    placeholder="便于秘书处联络被申请人"
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">纠纷类别 *</label>
                  <select
                    value={disputeCategory}
                    onChange={(e) => setDisputeCategory(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
                  >
                    <option value="合同纠纷">合同纠纷（演艺经纪/影视制作/宣发分成）</option>
                    <option value="知识产权侵权">权属与知识产权（著作权/商标/商业秘密）</option>
                    <option value="新型业态纠纷">新型业态（AIGC/短视频微短剧/网络直播）</option>
                    <option value="其他纠纷">其他文娱产业商事纠纷</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">主张金额（元）</label>
                  <input
                    type="number"
                    value={claimAmount}
                    onChange={(e) => setClaimAmount(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">简要事实与调解请求 *</label>
                <textarea
                  rows={3}
                  value={disputeFact}
                  onChange={(e) => setDisputeFact(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyStep(1)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setApplyStep(3)}
                  className="flex-1 py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <span>下一步：上传证据材料</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 上传材料 */}
          {applyStep === 3 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-900 bg-slate-50/50 transition-colors">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-slate-700">点击或拖拽文件至此上传</div>
                <div className="text-[11px] text-slate-400 mt-1">
                  支持 PDF、Word、JPG、PNG、ZIP（单个文件不超过50MB）
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const sampleName = `补充证据文件_${Date.now().toString().slice(-4)}.pdf`;
                    setUploadedFiles([...uploadedFiles, sampleName]);
                  }}
                  className="mt-3 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium shadow-sm"
                >
                  + 添加模拟文件
                </button>
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-700">已上传材料清单 ({uploadedFiles.length})：</div>
                {uploadedFiles.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-100 text-xs text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{file}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, idx) => idx !== i))}
                      className="text-red-600 hover:text-red-800 text-[11px]"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyStep(2)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  上一步
                </button>
                <button
                  type="button"
                  onClick={() => setApplyStep(4)}
                  className="flex-1 py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <span>下一步：确认并提交申请</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: 提交申请确认 */}
          {applyStep === 4 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
                <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">立案申报信息总览核对</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div><span className="text-slate-500">申请人：</span>{applicantName}</div>
                  <div><span className="text-slate-500">被申请人：</span>{respondentName}</div>
                  <div><span className="text-slate-500">纠纷案由：</span>{disputeCategory}</div>
                  <div><span className="text-slate-500">争议标的：</span>¥ {Number(claimAmount).toLocaleString()} 元</div>
                </div>
                <div className="pt-1">
                  <span className="text-slate-500">核心诉求：</span>{disputeFact}
                </div>
                <div className="pt-1">
                  <span className="text-slate-500">附交材料：</span>共计 {uploadedFiles.length} 份文件
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
                <span>
                  点击“确认提交”后，系统将自动加盖中心立案接收电子流水印，并生成专属【调解码】以短信同步通知。
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyStep(3)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  返回修改
                </button>
                <button
                  type="button"
                  onClick={handleApplySubmit}
                  className="flex-1 py-2.5 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-lg text-xs font-bold shadow flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-amber-200" />
                  <span>正式提交调解申请</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: 提交成功 */}
          {applyStep === 5 && (
            <div className="max-w-md mx-auto text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">调解申请提交成功！</h4>
                <p className="text-xs text-slate-500 mt-1">
                  中心立案秘书处已收到您的材料，将在2个工作日内完成合规初审。
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-amber-800 font-medium">您的专属案件调解码：</span>
                  <span className="text-base font-bold font-mono text-amber-900 bg-white px-2 py-0.5 rounded border border-amber-300">
                    {generatedCode || 'QL-2026-0318'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                  请妥善保存此调解码。凭此码及预留手机尾号即可随时在首页【案件查询】中实时查验案件进展、下载调解文书或进入在线调解室。
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setQueryCode(generatedCode || 'QL-2026-0318');
                    setActiveSubTab('query');
                  }}
                  className="flex-1 py-2.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow"
                >
                  立即凭调解码查看案件
                </button>
                <button
                  onClick={() => {
                    setApplyStep(1);
                    setAgreedNotice(false);
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                >
                  再提一起新纠纷
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          6. 案件查询 (Case Query)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'query' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Query Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">文娱调解案件实时进度查询</h3>
                <p className="text-xs text-slate-500">输入立案案号或专属9位调解码，即时获取办理状态与文书</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setQueryCode('QL-2026-0318');
                  setQueryPhone('8899');
                  setQueriedRecord(MOCK_CASE_RECORD);
                }}
                className="text-xs text-blue-900 hover:underline self-start sm:self-auto font-medium"
              >
                ⚡ 快捷填入示例案卷 (QL-2026-0318)
              </button>
            </div>

            <form onSubmit={handleQuery} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  案号 / 专属调解码 *
                </label>
                <input
                  type="text"
                  placeholder="例如：QL-2026-0318 或 京东清调字〔2026〕第0318号"
                  value={queryCode}
                  onChange={(e) => setQueryCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900 font-mono uppercase"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  手机号码后4位 *
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="例如：8899"
                  value={queryPhone}
                  onChange={(e) => setQueryPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900 font-mono"
                />
              </div>

              <div className="sm:col-span-3">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs sm:text-sm font-semibold shadow flex items-center justify-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>查询案情看板</span>
                </button>
              </div>
            </form>

            {queryError && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                {queryError}
              </div>
            )}
          </div>

          {/* Queried Case Detail Display */}
          {queriedRecord && (
            <div className="space-y-6">
              {/* Top Banner Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                        {queriedRecord.status}
                      </span>
                      <span className="text-xs text-slate-400">| 调解码：{queriedRecord.mediationCode}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900">
                      {queriedRecord.caseNumber} - {queriedRecord.disputeType}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInOnlineRoom(true)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-800 hover:to-indigo-950 text-white rounded-lg text-xs font-semibold shadow flex items-center gap-1.5 animate-pulse"
                    >
                      <Video className="w-3.5 h-3.5 text-amber-300" />
                      <span>进入在线加密调解室</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">申请人：</span>
                    <span className="font-semibold text-slate-800">{queriedRecord.applicant}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">被申请人：</span>
                    <span className="font-semibold text-slate-800">{queriedRecord.respondent}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">承办调解员：</span>
                    <span className="font-semibold text-blue-900">{queriedRecord.mediatorName} ({queriedRecord.mediatorOrg})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">涉案争议标的：</span>
                    <span className="font-semibold text-slate-800">{queriedRecord.claimAmount}</span>
                  </div>
                </div>

                {queriedRecord.meetingDate && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-700" />
                      <span>
                        <strong>近期会议通知：</strong>调解员已为您排定正式线上磋商会议，时间为：<strong>{queriedRecord.meetingDate}</strong>
                      </span>
                    </span>
                    <span className="text-[11px] text-amber-800 underline cursor-pointer" onClick={() => setInOnlineRoom(true)}>
                      设备测试 ›
                    </span>
                  </div>
                )}
              </div>

              {/* Progress Timeline & Legal Documents */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Timeline */}
                <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    案件调解进展全生命周期流转
                  </h4>

                  <div className="space-y-4 text-xs">
                    {queriedRecord.timeline.map((t, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            t.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {t.completed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          {idx < queriedRecord.timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 my-1 ${t.completed ? 'bg-emerald-300' : 'bg-slate-200'}`} />
                          )}
                        </div>
                        <div className="space-y-0.5 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{t.title}</span>
                            <span className="text-[10px] text-slate-400">{t.date}</span>
                          </div>
                          <p className="text-slate-500 text-[11px] leading-relaxed">{t.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Documents List */}
                <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    案件官方文书与存证电子包
                  </h4>

                  <div className="space-y-2.5">
                    {queriedRecord.documents.map((doc, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs">
                        <div className="space-y-0.5 pr-2">
                          <div className="font-medium text-slate-800 line-clamp-1">{doc.name}</div>
                          <div className="text-[10px] text-slate-400">{doc.type} · {doc.size} · {doc.date}</div>
                        </div>
                        <button
                          onClick={() => alert(`正在安全下载：${doc.name}`)}
                          className="p-1.5 rounded text-blue-900 hover:bg-blue-50 shrink-0"
                          title="下载PDF文书"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => alert('已开启材料增补通道，请选择本地扫描件')}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>补充提交新的事实与证据</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Online Mediation Room Modal Simulator */}
              {inOnlineRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                  <div className="bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-700">
                    <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-bold font-mono">
                          加密远程视频调解室 · {queriedRecord.caseNumber}
                        </span>
                      </div>
                      <button
                        onClick={() => setInOnlineRoom(false)}
                        className="text-xs text-slate-400 hover:text-white"
                      >
                        退出会议 [ESC]
                      </button>
                    </div>

                    <div className="p-6 space-y-4 text-center">
                      <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-slate-400 space-y-2">
                        <Video className="w-12 h-12 text-blue-400 animate-pulse" />
                        <div className="text-xs text-slate-300">
                          正在连接中心国密加密WebRTC媒体服务器...
                        </div>
                        <div className="text-[11px] text-slate-500">
                          主持人：张昭华（调解员） | 状态：等待各方连线入会
                        </div>
                      </div>

                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => alert('麦克风自检正常，音量峰值 -12dB')}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs"
                        >
                          🎤 麦克风自测
                        </button>
                        <button
                          onClick={() => alert('高清视频流正常，已开启人脸识别水印存证')}
                          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs"
                        >
                          📷 摄像头自测
                        </button>
                        <button
                          onClick={() => setInOnlineRoom(false)}
                          className="px-4 py-1.5 rounded bg-red-700 hover:bg-red-800 text-xs font-medium text-white"
                        >
                          挂断返回案卷
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
