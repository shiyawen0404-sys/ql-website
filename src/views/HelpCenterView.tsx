import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  BookOpen, 
  Video, 
  Phone, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Send,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { HelpSubTab } from '../types';
import { FAQ_LIST, GUIDE_VIDEOS } from '../data/faqData';

interface HelpCenterViewProps {
  initialSubTab?: HelpSubTab;
  onOpenApply: () => void;
  onOpenSelfCheck: () => void;
}

export const HelpCenterView: React.FC<HelpCenterViewProps> = ({
  initialSubTab = 'faq',
  onOpenApply,
  onOpenSelfCheck
}) => {
  const [activeSubTab, setActiveSubTab] = useState<HelpSubTab>(initialSubTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');
  const [activeVideo, setActiveVideo] = useState<any | null>(null);

  // Contact Secretariat Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  useEffect(() => {
    if (initialSubTab) {
      if (initialSubTab === 'faq-eligibility') {
        setActiveSubTab('faq');
        setOpenFaqIndex(0); // First FAQ is "我不知道我的纠纷能不能调"
      } else {
        setActiveSubTab(initialSubTab);
      }
    }
  }, [initialSubTab]);

  const filteredFaqs = FAQ_LIST.filter(f => 
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Sub-Nav */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">帮助中心</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              文娱调解帮助中心与指引
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              解答疑难关切 · 全周期调解小贴士 · 视听操作指南 · 秘书处专线指导
            </p>
          </div>

          <button
            onClick={onOpenSelfCheck}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start md:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span>智能自测：我的纠纷能不能调？</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'faq', label: '常见问题 (FAQ)' },
            { id: 'tips', label: '调解小贴士' },
            { id: 'guide', label: '操作指引 (视频/图文)' },
            { id: 'contact', label: '联系秘书处' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as HelpSubTab)}
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
          1. 常见问题 (FAQ)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'faq' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="搜索常见问题：纠纷能不能调、准备什么材料、收费标准、司法效力..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-900 font-bold text-xs flex items-center justify-center shrink-0">
                        Q{idx + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                      <p>{faq.answer}</p>
                      
                      {faq.id === 'faq-1' && (
                        <div className="pt-1 flex gap-2">
                          <button
                            onClick={onOpenSelfCheck}
                            className="px-3 py-1.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded text-xs font-semibold"
                          >
                            运行 3 步受理性自测工具 ›
                          </button>
                          <button
                            onClick={onOpenApply}
                            className="px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-semibold"
                          >
                            直接网上申请调解 ›
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. 调解小贴士 (Mediation Tips)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'tips' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          
          {/* 调解前 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">
                前
              </span>
              <h3 className="text-base font-bold text-slate-900">调解前：理性准备与预期管理</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                <span><strong>梳理核心事实链：</strong>按时间先后顺序整理合同签署、履约交付、违约催告及往来函件证据。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                <span><strong>设定弹性心理底线：</strong>调解不是非赢即输的零和博弈，事先明确必须争取的底线诉求与可以退让妥协的商业空间。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900 mt-1.5 shrink-0" />
                <span><strong>授权代理权限完备：</strong>委托律师或法务参调的，需确保特别授权（包含代为承认、放弃、变更诉求并签署协议）。</span>
              </li>
            </ul>
          </div>

          {/* 调解中 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">
                中
              </span>
              <h3 className="text-base font-bold text-slate-900">调解中：善用中立专家沟通</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong>克制情绪对立：</strong>文娱行业圈子紧密，就事论事表达事实诉求，避免人格攻击与情绪化宣泄。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong>坦诚向调解员表达痛点：</strong>在背靠背单方磋商阶段，如实告知自身真实的商业利益诉求和资金痛点。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                <span><strong>探讨创新替代方案：</strong>除直接金钱赔偿外，可探讨置换后续剧目角色、版权优先购买权、宣发资源等置换和解。</span>
              </li>
            </ul>
          </div>

          {/* 调解后 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                后
              </span>
              <h3 className="text-base font-bold text-slate-900">调解后：司法赋权与守信履行</h3>
            </div>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>协议内容严谨可执行：</strong>明确付款账户、银行行号、分期具体节点及一旦违约应加付的滞纳金。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>务必办理司法确认：</strong>通过中心协助向东城区法院申请司法确认民事裁定，免去后续违约再起诉成本。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <span><strong>按约撤回平台投诉：</strong>达成协议后及时依据约定向各大短视频平台、流媒体撤回侵权投诉通知，促成业务恢复。</span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. 操作指引 (Video / Textual Guides)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'guide' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              文娱调解云平台全流程视听操作指引
            </h3>
            <p className="text-xs text-slate-500">
              点击下方视频指引卡片即可在线观看功能演示与详细图文操作步骤
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {GUIDE_VIDEOS.map((g) => (
              <div
                key={g.id}
                onClick={() => setActiveVideo(g)}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center">
                    <img
                      src={g.thumbnail}
                      alt={g.title}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
                    />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/90 text-blue-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 ml-0.5" />
                    </div>
                    <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-mono">
                      {g.duration}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900">
                    {g.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {g.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>官方操作教程</span>
                  <span className="text-blue-900 font-semibold group-hover:translate-x-0.5 transition-transform">
                    播放演示教程 ›
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Video Player Modal Simulator */}
          {activeVideo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="bg-slate-900 text-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-700">
                <div className="p-4 bg-slate-800 flex items-center justify-between border-b border-slate-700">
                  <span className="text-xs font-bold font-mono">{activeVideo.title}</span>
                  <button onClick={() => setActiveVideo(null)} className="text-xs text-slate-400 hover:text-white">
                    关闭 [ESC]
                  </button>
                </div>
                <div className="p-6 space-y-4 text-center">
                  <div className="aspect-video bg-slate-950 rounded-xl flex flex-col items-center justify-center text-slate-400 space-y-2 border border-slate-800">
                    <Video className="w-12 h-12 text-blue-400" />
                    <div className="text-xs text-slate-300">《{activeVideo.title}》教学指引演示中</div>
                    <div className="text-[11px] text-slate-500">时长：{activeVideo.duration} | 高清1080P</div>
                  </div>
                  <p className="text-xs text-slate-300 text-left bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                    {activeVideo.desc}
                  </p>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 rounded text-xs font-semibold text-white"
                  >
                    返回帮助中心
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          4. 联系秘书处 (Contact Secretariat)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'contact' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                中心秘书处立案联络直通
              </h3>
              <p className="text-xs text-slate-500">
                法务秘书专人对接 · 接收预审材料 · 提供全流程专业指导
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">咨询及立案专线</div>
                  <div className="text-base font-bold text-blue-950 mt-0.5">010-8511 0188</div>
                  <div className="text-slate-400 text-[11px]">服务时间：周一至周五 09:00 - 17:30（法定节假日除外）</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">电子材料预审专属邮箱</div>
                  <div className="text-xs font-mono font-bold text-blue-950 mt-0.5">secretariat@dongcheng-adr.org.cn</div>
                  <div className="text-slate-400 text-[11px]">邮件主题请注明：【调解咨询/预审】+申请人+纠纷案由</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">线下综合调解接待大厅</div>
                  <div className="text-xs text-slate-800 mt-0.5">北京市东城区东华门街道文娱法治大厦 5 层</div>
                  <div className="text-slate-400 text-[11px]">交通指引：地铁1号线/8号线王府井站出口步行300米</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message / Reservation */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="space-y-1 border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                在线留言与预约人工回访
              </h3>
              <p className="text-xs text-slate-500">
                留下您的联系方式及简要疑问，中心法务秘书将在15分钟内致电答复
              </p>
            </div>

            {!contactSubmitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">您的姓名 / 机构称呼 *</label>
                  <input
                    type="text"
                    required
                    placeholder="如：张经理 / 李制片"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">联系手机号码 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="请输入11位电话号码"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">留言内容与咨询事项</label>
                  <textarea
                    rows={4}
                    placeholder="请描述您的问题（如案件可调性、材料准备、调解员选聘）..."
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>提交预约回访申请</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-2 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-950">留言已成功登记！</div>
                <p className="text-xs text-emerald-800">
                  中心法务秘书将在工作时间内第一时间致电 {contactPhone} 为您提供个案解答。
                </p>
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
