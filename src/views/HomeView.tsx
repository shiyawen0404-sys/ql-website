import React, { useState } from 'react';
import { 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Coins, 
  FileText, 
  Search, 
  Users, 
  HelpCircle, 
  Phone, 
  ChevronRight,
  BookOpen,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { MainNavTab } from '../types';
import { MOCK_CASES, MOCK_NEWS, MOCK_RESEARCH, MOCK_MEDIATORS } from '../data/mockData';

interface HomeViewProps {
  onSelectTab: (tab: MainNavTab, subTab?: string) => void;
  onOpenApply: () => void;
  onOpenQuery: () => void;
  onOpenConsult: () => void;
  onOpenSelfCheck: () => void;
  onSelectMediator: (mediator: any) => void;
  onSelectCase: (c: any) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenApply,
  onOpenQuery,
  onOpenConsult,
  onOpenSelfCheck,
  onSelectMediator,
  onSelectCase
}) => {
  // 3-Screen Carousel State (0: 首屏Hero, 1: 二屏调解范围, 2: 三屏调解优势)
  const [currentScreen, setCurrentScreen] = useState<number>(0);

  const screens = [
    // 屏 1: 首屏 Hero
    {
      id: 0,
      badge: '首都核心区文娱法治保障基地',
      title: '北京市东城区清朗文娱产业纠纷解决中心',
      subtitle: '专业 · 高效 · 保密 · 善解',
      desc: '立足北京市东城区文化产业核心聚集区，面向影视、音乐、出版、演艺经纪、AIGC及平台新业态，提供公信、中立、一站式的纠纷调解与诉调对接服务。',
      primaryBtnText: '立即申请调解',
      primaryAction: onOpenApply,
      secondaryBtnText: '了解调解流程',
      secondaryAction: () => onSelectTab('services', 'process'),
      bgGradient: 'from-[#0b1f3b] via-[#102d57] to-[#183b6e]',
      accentColor: 'text-amber-400'
    },
    // 屏 2: 二屏 调解范围
    {
      id: 1,
      badge: '广泛覆盖文娱全产业链争议',
      title: '文娱产业全门类纠纷受理与快速化解',
      subtitle: '合同纠纷 · 权属侵权 · 新型业态 · 平台治理',
      desc: '无论是传统影视演艺合作违约，还是AIGC、数字音乐、微短剧、虚拟人等前沿新型业态纠纷，均可通过本中心专业调解机制实现定分止争。',
      primaryBtnText: '查看完整受理范围',
      primaryAction: () => onSelectTab('services', 'scope'),
      secondaryBtnText: '纠纷受理性自测',
      secondaryAction: onOpenSelfCheck,
      bgGradient: 'from-[#0e2954] via-[#13386b] to-[#1d4b85]',
      accentColor: 'text-cyan-300'
    },
    // 屏 3: 三屏 调解优势
    {
      id: 2,
      badge: '多元化解四大核心价值',
      title: '专业 · 高效 · 保密 · 成本可控',
      subtitle: '司法直通确认 · 赋予民事裁定强制执行力',
      desc: '资深知产学者与一线文娱法官/律师入册调解；平均结案周期仅18天；不公开审理捍卫品牌名誉；公益惠企收费标准仅为诉讼费的20%-30%。',
      primaryBtnText: '立即申请调解',
      primaryAction: onOpenApply,
      secondaryBtnText: '查阅收费与规则',
      secondaryAction: () => onSelectTab('services', 'fees'),
      bgGradient: 'from-[#091a33] via-[#0f284f] to-[#1a4279]',
      accentColor: 'text-amber-300'
    }
  ];

  const current = screens[currentScreen];

  return (
    <div className="space-y-12 pb-16">
      
      {/* ─────────────────────────────────────────────────────────
          1. BANNER 大图 (3屏轮播切换)
      ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[460px] sm:min-h-[500px] flex items-center">
        {/* Background Gradient & Geometric Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-r ${current.bgGradient} transition-colors duration-700`} />
        
        {/* Subtle architectural & legal watermark grid */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className={current.accentColor}>{current.badge}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif leading-tight">
                  {current.title}
                </h2>
                <p className="text-base sm:text-xl font-medium text-amber-300/90 font-serif tracking-wide">
                  {current.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                {current.desc}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  id="hero-banner-primary-btn"
                  onClick={current.primaryAction}
                  className="px-6 py-3 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-semibold shadow-lg shadow-red-950/40 hover:shadow-xl transition-all flex items-center gap-2 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-amber-200" />
                  <span>{current.primaryBtnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-banner-secondary-btn"
                  onClick={current.secondaryAction}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg text-sm font-medium backdrop-blur-sm transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>{current.secondaryBtnText}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Three Pillars Fast Tagline */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 法院司法确认对接
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 调解全流程保密
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 公益普惠低成本
                </span>
              </div>
            </div>

            {/* Right Interactive Screen Card */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl p-5 border border-white/15 shadow-2xl space-y-4">
                <div className="text-xs font-semibold text-amber-300 border-b border-white/10 pb-2 flex items-center justify-between">
                  <span>快速便民通道</span>
                  <span className="text-[10px] text-slate-400">北京市东城区</span>
                </div>

                {currentScreen === 0 && (
                  <div className="space-y-2.5 text-xs">
                    <div 
                      onClick={() => onSelectTab('services', 'apply')}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>📝 在线立案快速申请</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-slate-400 text-[11px] mt-1">
                        实名填报事实与证据，2个工作日内完成审查
                      </div>
                    </div>
                    <div 
                      onClick={onOpenQuery}
                      className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>🔍 凭调解码实时查案</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <div className="text-slate-400 text-[11px] mt-1">
                        输入9位案卷调解码，直接查看日程与文书
                      </div>
                    </div>
                  </div>
                )}

                {currentScreen === 1 && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <div className="font-semibold text-amber-300">① 合同纠纷</div>
                      <div className="text-[11px] text-slate-300">影视制作发行 / 演艺经纪解约 / 投流授权</div>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <div className="font-semibold text-amber-300">② 知识产权</div>
                      <div className="text-[11px] text-slate-300">著作权抄袭洗稿 / 商标商业标识 / 盗版维权</div>
                    </div>
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <div className="font-semibold text-amber-300">③ 新型业态</div>
                      <div className="text-[11px] text-slate-300">AIGC大模型训练 / 虚拟人 / 微短剧分账</div>
                    </div>
                  </div>
                )}

                {currentScreen === 2 && (
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-3 rounded bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-amber-400 font-serif">18.5天</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">平均化解周期</div>
                    </div>
                    <div className="p-3 rounded bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-emerald-400 font-serif">78.6%</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">调解达成率</div>
                    </div>
                    <div className="p-3 rounded bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-cyan-400 font-serif">100%</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">全流程保密</div>
                    </div>
                    <div className="p-3 rounded bg-white/5 border border-white/10">
                      <div className="text-xl font-bold text-red-400 font-serif">1/4</div>
                      <div className="text-[11px] text-slate-300 mt-0.5">诉讼成本比例</div>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>咨询热线: 010-8511 0188</span>
                  <button onClick={onOpenConsult} className="text-amber-300 hover:underline">
                    人工回电 ›
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Screen Indicators & Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              {screens.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentScreen(idx)}
                  className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1.5 ${
                    currentScreen === idx
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  <span>0{idx + 1}</span>
                  <span className="hidden sm:inline">
                    {idx === 0 ? '中心首屏' : idx === 1 ? '调解范围' : '调解优势'}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentScreen((prev) => (prev === 0 ? screens.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Previous screen"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentScreen((prev) => (prev === screens.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                aria-label="Next screen"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          2. BANNER 图下方设置四个快捷跳转按钮 (Prompt Explicit Requirement)
          - 我的纠纷能不能调 → 【帮助中心】-【我不知道我的纠纷能不能调】
          - 了解受理范围 → 【调解服务】-【受理范围】
          - 了解收费办法 → 【调解服务】-【收费方法】
          - 咨询秘书处 → 【帮助中心】-【联系秘书处】
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-6 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 按钮 1: 我的纠纷能不能调 */}
          <div
            id="home-btn-can-i-mediate"
            onClick={() => onSelectTab('help', 'faq-eligibility')}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:border-blue-900 hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 group-hover:bg-[#0e2954] group-hover:text-amber-400 transition-colors">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1">
                <span>我的纠纷能不能调</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-900" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                智能判定纠纷是否适宜调解、不予受理情形及答疑
              </p>
              <span className="inline-block text-[11px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                【帮助中心】
              </span>
            </div>
          </div>

          {/* 按钮 2: 了解受理范围 */}
          <div
            id="home-btn-scope"
            onClick={() => onSelectTab('services', 'scope')}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:border-blue-900 hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0 group-hover:bg-[#0e2954] group-hover:text-amber-400 transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1">
                <span>了解受理范围</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-900" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                合同纠纷、知识产权、AIGC及平台新型业态争议清单
              </p>
              <span className="inline-block text-[11px] font-medium text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                【调解服务】
              </span>
            </div>
          </div>

          {/* 按钮 3: 了解收费办法 */}
          <div
            id="home-btn-fees"
            onClick={() => onSelectTab('services', 'fees')}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:border-blue-900 hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-[#0e2954] group-hover:text-amber-400 transition-colors">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-900 flex items-center gap-1">
                <span>了解收费办法</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-900" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                公益低廉收费原则、标的累进收费标准及减免政策
              </p>
              <span className="inline-block text-[11px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                【调解服务】
              </span>
            </div>
          </div>

          {/* 按钮 4: 咨询秘书处 */}
          <div
            id="home-btn-consult-secretariat"
            onClick={onOpenConsult}
            className="bg-white rounded-xl p-5 shadow-lg border border-slate-200 hover:border-red-900 hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-800 flex items-center justify-center shrink-0 group-hover:bg-[#991b1b] group-hover:text-white transition-colors">
              <Phone className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 group-hover:text-red-900 flex items-center gap-1">
                <span>咨询秘书处</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-red-900" />
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                人工专线解答、材料预审指导与线下接待预约
              </p>
              <span className="inline-block text-[11px] font-medium text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                【专线服务】
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. 调解流程图示展示 (Prompt Explicit Requirement)
          第一步：提交申请 → 第二步：受理审查 → 第三步：确定调解员 → 第四步：开展调解 → 第五步：达成调解协议 → 第六步：履行/后续处理
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>规范透明 · 六步闭环</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif tracking-tight mt-1">
                文娱产业纠纷调解流程图示
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('services', 'process')}
              className="text-xs font-medium text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>查看详细流程规范及法律效力</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 6 Step Visual Pathway */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                step: '01',
                title: '提交申请',
                desc: '在线填报当事人信息、争议事实、索赔请求并上传证据材料',
                time: '即时在线完成'
              },
              {
                step: '02',
                title: '受理审查',
                desc: '秘书处审查受理范围，联系被申请人确认调解意愿并正式立案',
                time: '2个工作日内'
              },
              {
                step: '03',
                title: '确定调解员',
                desc: '双方在名册中自愿选定调解员，或委托中心主任指派对口专家',
                time: '3个工作日内'
              },
              {
                step: '04',
                title: '开展调解',
                desc: '调解员组织远程视频调解或线下会议，充分沟通寻求平衡方案',
                time: '15-20个工作日'
              },
              {
                step: '05',
                title: '达成调解协议',
                desc: '双方一致同意起草《调解协议书》，完成CA电子签署赋权',
                time: '当日在线签署'
              },
              {
                step: '06',
                title: '履行/后续处理',
                desc: '当事人和解履行；可一键申请东城区人民法院司法确认赋予强制执行力',
                time: '即时司法确认'
              }
            ].map((item, idx) => (
              <div 
                key={item.step}
                className="relative bg-slate-50 hover:bg-blue-50/60 rounded-xl p-4 border border-slate-200/80 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold font-serif text-slate-300 group-hover:text-blue-900 transition-colors">
                      {item.step}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                      {item.time}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-950">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {idx < 5 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <span className="w-4 h-4 rounded-full bg-white border border-slate-300 text-slate-400 flex items-center justify-center text-[10px]">
                      ›
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-950">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>微短剧与重点剧目快速通道：</strong>对涉及平台热映、宣发档期等时效性极强的纠纷，启动“7日极速调解机制”，当天受案当天推进。
              </span>
            </div>
            <button
              onClick={onOpenApply}
              className="px-4 py-1.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded font-medium shrink-0 shadow-sm"
            >
              立即提交申请 ›
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. 调解范围特色三卡片
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">
              受理范围纵览
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-serif">
              三大核心受理板块 · 破解文娱法治痛点
            </h3>
            <p className="text-xs text-slate-500">
              精准对接首都文化产业高质量发展需求，建立覆盖全业务周期的专业化解机制
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 卡片 1: 合同纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">合同与合作纠纷</h4>
                <p className="text-xs text-slate-500 mt-1">演艺、制作、投融资与发行履约争议</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                  <span>合作 / 委托 / 艺人演艺经纪合同纠纷</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                  <span>影视剧联合摄制、宣发分成与票房结算争议</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                  <span>版权许可授权、对赌协议及文娱投融资退伙争议</span>
                </li>
              </ul>
              <button
                onClick={() => onSelectTab('services', 'scope')}
                className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100 w-full"
              >
                <span>查阅合同纠纷受理详情</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 卡片 2: 权属与侵权纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">权属与知识产权侵权</h4>
                <p className="text-xs text-slate-500 mt-1">著作权、商标、商业秘密及不正当竞争</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                  <span>影视剧、音乐词曲、文学剧本著作权权属争议</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                  <span>文娱IP周边衍生潮玩仿冒与商标侵权</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-900" />
                  <span>艺人肖像名誉权侵权及商业秘密竞业限制争议</span>
                </li>
              </ul>
              <button
                onClick={() => onSelectTab('services', 'scope')}
                className="text-xs font-semibold text-indigo-900 hover:text-indigo-700 flex items-center gap-1 pt-2 border-t border-slate-100 w-full"
              >
                <span>查阅侵权纠纷受理详情</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 卡片 3: 新型业态纠纷 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">新型文娱业态纠纷</h4>
                <p className="text-xs text-slate-500 mt-1">AIGC生成物、微短剧、虚拟人与平台治理</p>
              </div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  <span>AIGC生成内容版权归属与大模型训练合理使用</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  <span>网络微短剧著作权搬运侵权与投流分成争议</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
                  <span>网络直播带货MCN佣金分润与算法封禁申诉</span>
                </li>
              </ul>
              <button
                onClick={() => onSelectTab('services', 'scope')}
                className="text-xs font-semibold text-purple-900 hover:text-purple-700 flex items-center gap-1 pt-2 border-t border-slate-100 w-full"
              >
                <span>查阅新型业态受理详情</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. 调解员名册精选预览
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-4 h-4 text-blue-900" />
                <span>文娱法治智库</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif tracking-tight mt-1">
                特邀中立调解员名册
              </h3>
            </div>
            <button
              onClick={() => onSelectTab('mediators', 'roster')}
              className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
            >
              <span>查看全部 168 名调解员名册</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_MEDIATORS.slice(0, 4).map((med) => (
              <div
                key={med.id}
                onClick={() => onSelectMediator(med)}
                className="rounded-xl border border-slate-200 p-4 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group bg-slate-50/50 hover:bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={med.avatar}
                      alt={med.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{med.name}</span>
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                          {med.background}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{med.title}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {med.industries.slice(0, 3).map((ind, i) => (
                      <span key={i} className="text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded">
                        {ind}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {med.profile}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>执业 {med.experienceYears} 年</span>
                  <span className="text-blue-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                    查看详情 ›
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. 动态资讯与典型案例
      ────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: 典型调解案例 */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-900" />
                <h3 className="text-lg font-bold text-slate-900 font-serif">典型文娱调解案例</h3>
              </div>
              <button
                onClick={() => onSelectTab('cases', 'cases')}
                className="text-xs text-blue-900 hover:text-blue-700 font-medium"
              >
                查看更多案例 ›
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_CASES.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c)}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-900/40 hover:bg-blue-50/30 transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-900">
                      {c.category} · {c.industry}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-1">
                    {c.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {c.summary}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>涉案标的：<strong className="text-slate-700">{c.disputeAmount}</strong></span>
                    <span className="text-emerald-700 font-medium">调解用时仅 {c.durationDays} 天达成和解</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 中心动态与公告 */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-slate-900 font-serif">动态资讯 & 通知公告</h3>
              </div>
              <button
                onClick={() => onSelectTab('news', 'center-news')}
                className="text-xs text-blue-900 hover:text-blue-700 font-medium"
              >
                全部资讯 ›
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_NEWS.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectTab('news', item.category)}
                  className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-none space-y-1"
                >
                  <div className="flex items-center gap-2">
                    {item.isTop && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                        置顶
                      </span>
                    )}
                    {item.isImportant && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        公告
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-900 hover:text-blue-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div 
                onClick={() => onSelectTab('cases', 'research')}
                className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="text-[11px] text-amber-300 font-semibold uppercase">前沿文娱法治研究</div>
                <div className="text-sm font-bold mt-1">《AIGC文娱创作著作权侵权认定与多元化解机制》</div>
                <div className="text-xs text-slate-300 mt-1 flex items-center justify-between">
                  <span>清朗文娱课题组 · 深度阅读</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
