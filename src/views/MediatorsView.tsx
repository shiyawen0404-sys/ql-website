import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  FileText, 
  CheckCircle2, 
  Download, 
  ChevronRight, 
  X,
  Building2,
  BookOpen,
  Briefcase,
  Star
} from 'lucide-react';
import { MediatorsSubTab, Mediator } from '../types';
import { MOCK_MEDIATORS } from '../data/mockData';

interface MediatorsViewProps {
  initialSubTab?: MediatorsSubTab;
  selectedMediator?: Mediator | null;
  onClearSelectedMediator?: () => void;
  onOpenApplyForCase: () => void;
}

export const MediatorsView: React.FC<MediatorsViewProps> = ({
  initialSubTab = 'roster',
  selectedMediator = null,
  onClearSelectedMediator,
  onOpenApplyForCase
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MediatorsSubTab>(initialSubTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedBackground, setSelectedBackground] = useState<string>('all');
  const [detailModalMediator, setDetailModalMediator] = useState<Mediator | null>(selectedMediator);

  // "成为调解员" application form state
  const [applierName, setApplierName] = useState('');
  const [applierPhone, setApplierPhone] = useState('');
  const [applierTitle, setApplierTitle] = useState('');
  const [applierOrg, setApplierOrg] = useState('');
  const [applierCategory, setApplierCategory] = useState('资深知产与文娱律师');
  const [applierBio, setApplierBio] = useState('');
  const [appSubmitted, setAppSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubTab) setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  useEffect(() => {
    if (selectedMediator) setDetailModalMediator(selectedMediator);
  }, [selectedMediator]);

  const filteredMediators = MOCK_MEDIATORS.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.industries.some(i => i.includes(searchTerm));

    const matchesIndustry = 
      selectedIndustry === 'all' || m.industries.includes(selectedIndustry);

    const matchesBg = 
      selectedBackground === 'all' || m.background === selectedBackground;

    return matchesSearch && matchesIndustry && matchesBg;
  });

  const handleRecruitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applierName || !applierPhone) return;
    setAppSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Sub-Nav */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">调解员</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              清朗文娱特邀中立调解员
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              汇聚资深知产学者、文娱法官、头部版权律师与产业高管 · 严谨选聘 · 独立中立 · 专业审度
            </p>
          </div>

          <button
            onClick={() => setActiveSubTab('join')}
            className="px-4 py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start md:self-auto"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>申请成为特邀调解员</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'roster', label: '调解员名册' },
            { id: 'how-to-choose', label: '如何选择调解员' },
            { id: 'join', label: '成为调解员' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as MediatorsSubTab)}
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
          1. 调解员名册 (Roster)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'roster' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* 名册概览与筛选栏 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索调解员姓名、工作单位、专长领域（如：AIGC、微短剧、艺人经纪）..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                />
              </div>

              {/* Industry Filter */}
              <div className="flex gap-2">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
                >
                  <option value="all">全部专业领域</option>
                  <option value="影视制作与投融资">影视制作与投融资</option>
                  <option value="演艺经纪与解约">演艺经纪与解约</option>
                  <option value="著作权侵权与抄袭认定">著作权侵权与抄袭认定</option>
                  <option value="AIGC与生成式AI版权">AIGC与生成式AI版权</option>
                  <option value="微短剧与短视频">微短剧与短视频</option>
                  <option value="数字音乐与版税结算">数字音乐与版税结算</option>
                  <option value="网络直播与MCN机构">网络直播与MCN机构</option>
                </select>

                {/* Background Filter */}
                <select
                  value={selectedBackground}
                  onChange={(e) => setSelectedBackground(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
                >
                  <option value="all">全部从业背景</option>
                  <option value="法学专家">法学专家 / 高校学者</option>
                  <option value="知产律师">知产律师 / 律所合伙人</option>
                  <option value="资深前法官">资深前法官</option>
                  <option value="产业专家">产业专家 / 行业高管</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
              <div>
                共检索到 <strong className="text-blue-900 font-bold">{filteredMediators.length}</strong> 位入册特邀中立调解员
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% 签署中立保密承诺书</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500" /> 年度业务量考评合格</span>
              </div>
            </div>
          </div>

          {/* Mediators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMediators.map((med) => (
              <div
                key={med.id}
                onClick={() => setDetailModalMediator(med)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={med.avatar}
                      alt={med.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 shrink-0 shadow-sm"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900">
                          {med.name}
                        </h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
                          {med.background}
                        </span>
                      </div>
                      <div className="text-xs text-slate-700 font-medium line-clamp-1">
                        {med.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        <span>{med.organization}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {med.industries.map((ind, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {ind}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {med.profile}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">执业 {med.experienceYears} 年</span>
                  <span className="text-blue-900 font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    <span>查阅履历与案例</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* 调解员行为规范与考核说明 */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>调解员行为准则与年度动态考核制度</span>
            </h4>
            <p>
              中心对入册调解员实行名册动态管理与年度履职评估。每位调解员必须遵守严格的中立准则与回避规范，严禁向当事人索取额外报酬或在调解中泄露商业机密。调解协议达成率、当事人满意度测评及司法确认合规率计入年度考核档案。
            </p>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. 如何选择调解员 (How to Choose)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'how-to-choose' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-serif">
              文娱纠纷调解员选定指引与规则
            </h3>
            <p className="text-xs text-slate-500">
              指导当事人根据案由性质、涉案行业及专业特长，精准选定最匹配的调解专家
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {/* 原则 */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-900 rounded" />
                一、选择调解员的三大核心原则
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-950">行业对口原则</div>
                  <p className="text-xs text-slate-500 mt-1">如涉及微短剧盗播应优先选微短剧与数字内容专家；涉及艺人解约应优先选演艺经纪知产律师。</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-950">双方合意原则</div>
                  <p className="text-xs text-slate-500 mt-1">调解员原则上须经申请人与被申请人协商一致共同选定，确保各方对中立主持人的天然信赖。</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-950">严格法定回避原则</div>
                  <p className="text-xs text-slate-500 mt-1">与当事人或案件有利害关系、担任过任一方常年法律顾问或代理人者，必须主动声明回避。</p>
                </div>
              </div>
            </div>

            {/* 常见问题 */}
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span className="w-1.5 h-4 bg-blue-900 rounded" />
                二、常见疑问解答（FAQ）
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <div className="font-bold text-slate-900">Q：双方当事人选定的调解员不一致怎么办？</div>
                  <p className="text-slate-600 mt-1">
                    根据中心《调解规则》第十四条，若双方当事人在立案后5个工作日内未能共同选定同一位调解员，亦不同意成立3人联合调解庭，则由本中心主任自名册中综合考虑案情性质、涉案标的额及专业特长直接指派1名调解员主持调解。
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/70">
                  <div className="font-bold text-slate-900">Q：当事人如何提出调解员回避申请？</div>
                  <p className="text-slate-600 mt-1">
                    当事人若有合理理由怀疑调解员可能影响中立公正办案的，有权在首次调解会召开前书面提出回避申请并说明事实理由。中心主任在收到申请之日起3个工作日内作出决定并通知各方。
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. 成为调解员 (Join Roster)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'join' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                北京市东城区清朗文娱产业纠纷解决中心 调解员选聘公告
              </h3>
              <p className="text-xs text-slate-500">
                诚邀文娱法治专家学者、资深法官律师及行业翘楚加盟，共筑首都文化产业合规高地
              </p>
            </div>

            {/* 选聘条件与流程 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  选聘入册基本条件
                </h4>
                <ul className="space-y-2 list-disc list-inside text-slate-600 leading-relaxed">
                  <li>拥护宪法与法律，具备良好的政治素质与职业道德情操；</li>
                  <li>从事知识产权法、民商法教学研究并具有高级职称的高校及科研机构学者；</li>
                  <li>曾任知识产权庭、民事审判庭法官，具有丰富文娱审判经验且退休离任满法定年限人员；</li>
                  <li>专职执业满8年以上的资深律师，在文娱演艺、影视制作、AIGC领域有卓越代表性业绩；</li>
                  <li>文娱头部企业、行业协会法务合规总监，熟悉文娱商业惯例。</li>
                </ul>
              </div>

              <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-4 h-4 text-blue-900" />
                  选聘入册四步流转程序
                </h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="font-bold text-blue-900">01. 自主申报：</span>
                    <span>在线填报基本履历，或下载《特邀调解员入册申请表》寄送中心秘书处；</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-blue-900">02. 资质初审：</span>
                    <span>秘书处在10个工作日内核实执业资质、职业纪律及代表案例；</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-blue-900">03. 专家评审：</span>
                    <span>由司法行政部门、法学会及行业专家组成的评审委员会集体审议；</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-blue-900">04. 公示颁聘：</span>
                    <span>在官方网站公示7日，公示无异议后正式颁发特邀聘书并向社会公布名册。</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 下载表格与在线申请 */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-blue-900" />
                <span>纸质申报附件：《特邀中立调解员选聘申请登记表（2026版）.docx》</span>
              </div>
              <button
                onClick={() => alert('正在安全下载：特邀中立调解员选聘申请登记表（2026版）.docx')}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded text-xs font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>下载报名表模板</span>
              </button>
            </div>

            {/* 在线提交申报表单 */}
            {!appSubmitted ? (
              <form onSubmit={handleRecruitSubmit} className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">在线快速意向申报通道</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">申请人姓名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="如：李明"
                      value={applierName}
                      onChange={(e) => setApplierName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">手机联系电话 *</label>
                    <input
                      type="tel"
                      required
                      placeholder="11位手机号码"
                      value={applierPhone}
                      onChange={(e) => setApplierPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">现工作单位 *</label>
                    <input
                      type="text"
                      placeholder="如：北京某某律师事务所 / 某政法大学"
                      value={applierOrg}
                      onChange={(e) => setApplierOrg(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">职务 / 职称</label>
                    <input
                      type="text"
                      placeholder="如：合伙人 / 教授 / 法务总监"
                      value={applierTitle}
                      onChange={(e) => setApplierTitle(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">申报专业分类</label>
                    <select
                      value={applierCategory}
                      onChange={(e) => setApplierCategory(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
                    >
                      <option value="知产律师">资深知产与文娱律师</option>
                      <option value="法学专家">法学专家与高校学者</option>
                      <option value="前法官">资深离任/退休法官</option>
                      <option value="产业专家">文娱平台与影视企业高管</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">个人文娱法治执业经历与调解专长简述</label>
                  <textarea
                    rows={3}
                    placeholder="简述主要文娱案例业绩、学术专著、发表论文或曾办理的调解争议..."
                    value={applierBio}
                    onChange={(e) => setApplierBio(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow transition-all"
                >
                  提交入册申报初审
                </button>
              </form>
            ) : (
              <div className="py-6 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-950">调解员入册意向申报已接收！</div>
                <p className="text-xs text-emerald-800">
                  中心调解员管理工作处将在3个工作日内核实，并向您预留的联系邮箱发送正式入册档案申报清单。
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          Mediator Detail Modal
      ────────────────────────────────────────────────────────── */}
      {detailModalMediator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-[#0e2954] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">特邀中立调解员专业档案</span>
              </div>
              <button
                onClick={() => {
                  setDetailModalMediator(null);
                  if (onClearSelectedMediator) onClearSelectedMediator();
                }}
                className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              
              {/* Profile Bar */}
              <div className="flex items-start gap-4 border-b border-slate-100 pb-5">
                <img
                  src={detailModalMediator.avatar}
                  alt={detailModalMediator.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{detailModalMediator.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      {detailModalMediator.background}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      执业经验：{detailModalMediator.experienceYears} 年
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    {detailModalMediator.title} · {detailModalMediator.organization}
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {detailModalMediator.industries.map((ind, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio Profile */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-blue-900" />
                  <span>专家简介与法治专长</span>
                </h4>
                <p className="text-slate-600 leading-relaxed text-xs">
                  {detailModalMediator.profile}
                </p>
              </div>

              {/* Mediation Style */}
              <div className="space-y-1.5 bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-950 text-xs flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-blue-900" />
                  <span>调解工作风格</span>
                </h4>
                <p className="text-blue-900 text-xs leading-relaxed">
                  {detailModalMediator.style || detailModalMediator.profile}
                </p>
              </div>

              {/* Representative Cases */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-900" />
                  <span>代表性文娱调解与办案业绩</span>
                </h4>
                <div className="space-y-2">
                  {(detailModalMediator.representativeCases || detailModalMediator.cases || []).map((c, i) => (
                    <div key={i} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-900 shrink-0" />
                      <span className="text-slate-700">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                调解员编号：QL-MED-{detailModalMediator.id.padStart(4, '0')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setDetailModalMediator(null);
                    if (onClearSelectedMediator) onClearSelectedMediator();
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs"
                >
                  关闭
                </button>
                <button
                  onClick={() => {
                    setDetailModalMediator(null);
                    onOpenApplyForCase();
                  }}
                  className="px-4 py-1.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold"
                >
                  指名申请由 TA 主持调解 ›
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
