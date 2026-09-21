import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  BookOpen, 
  BarChart3, 
  FileText, 
  Download, 
  ChevronRight, 
  X, 
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  PieChart
} from 'lucide-react';
import { CasesResearchSubTab, MediationCase } from '../types';
import { MOCK_CASES, MOCK_RESEARCH } from '../data/mockData';

interface CasesResearchViewProps {
  initialSubTab?: CasesResearchSubTab;
  selectedCase?: MediationCase | null;
  onClearSelectedCase?: () => void;
  onOpenApply: () => void;
}

export const CasesResearchView: React.FC<CasesResearchViewProps> = ({
  initialSubTab = 'cases',
  selectedCase = null,
  onClearSelectedCase,
  onOpenApply
}) => {
  const [activeSubTab, setActiveSubTab] = useState<CasesResearchSubTab>(initialSubTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailModalCase, setDetailModalCase] = useState<MediationCase | null>(selectedCase);

  useEffect(() => {
    if (initialSubTab) setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  useEffect(() => {
    if (selectedCase) setDetailModalCase(selectedCase);
  }, [selectedCase]);

  const filteredCases = MOCK_CASES.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.focus && c.focus.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = 
      selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Sub-Nav */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">案例与研究</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              文娱法治典型案例与前沿智库研究
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              精选真实调解裁决范例 · 提取行业合规启示 · 权威统计分析与文娱新质生产力调研报告
            </p>
          </div>

          <button
            onClick={onOpenApply}
            className="px-4 py-2 bg-[#991b1b] hover:bg-[#7f1d1d] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 self-start md:self-auto"
          >
            <Scale className="w-4 h-4 text-amber-300" />
            <span>类似争议申请调解</span>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'cases', label: '典型案例' },
            { id: 'research', label: '理论研究' },
            { id: 'statistics', label: '统计分析' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as CasesResearchSubTab)}
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
          1. 典型案例 (Cases)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'cases' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Search & Category Filter */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索案例名称、焦点问题（如：微短剧、AI侵权、艺人经纪违约金）..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900"
                />
              </div>

              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
                >
                  <option value="all">全部纠纷类别</option>
                  <option value="新型业态">新型业态纠纷</option>
                  <option value="著作权侵权">著作权侵权纠纷</option>
                  <option value="合同纠纷">合同履约纠纷</option>
                  <option value="名誉权侵权">名誉与肖像权争议</option>
                </select>
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-1 border-t border-slate-100">
              共精选收录 <strong className="text-blue-900 font-bold">{filteredCases.length}</strong> 起经司法确认具有指导意义的代表性调解范例
            </div>
          </div>

          {/* Cases List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                onClick={() => setDetailModalCase(c)}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-100">
                      {c.category} · {c.industry}
                    </span>
                    <span className="text-[11px] text-slate-400">{c.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {c.summary}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1 border border-slate-100">
                    <div>
                      <span className="text-slate-400 font-medium">争议核心焦点：</span>
                      <span className="text-slate-700">{c.focus}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span>涉案标的：<strong className="text-slate-900">{c.disputeAmount}</strong></span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        仅 {c.durationDays} 天调解达成
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>调解结果：{c.result}</span>
                  <span className="text-blue-900 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                    案例剖析及启示 ›
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. 理论研究 (Research)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'research' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              文娱产业法治课题与理论研究成果
            </h3>
            <p className="text-xs text-slate-500">
              中心学术专家委员会聚焦首都数字文化、AIGC生成式人工智能及微短剧全产业链前沿法治难点，定期发布实务调研与合规指引
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MOCK_RESEARCH.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-900 border border-indigo-100">
                      {res.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{res.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.abstract}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                    <span>课题作者：<strong className="text-slate-700">{res.author}</strong></span>
                    <span>载于：{res.publishOrg}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{res.readCount} 次学术查阅</span>
                  <button
                    onClick={() => alert(`正在加载报告全文与PDF下载：${res.title}`)}
                    className="px-3 py-1 bg-slate-100 hover:bg-blue-50 text-blue-900 hover:text-blue-950 font-semibold rounded flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>查阅下载报告全文</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. 统计分析 (Statistics & Annual Reports)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'statistics' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium">累计受理文娱纠纷</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#0e2954] mt-1">1,862 件</div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center justify-center gap-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>同比增长 38.4%</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium">调解成功达成率</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-600 mt-1">78.6%</div>
              <div className="text-[11px] text-slate-400 mt-1">
                含协议达成与撤回和解
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium">平均调解化解周期</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-600 mt-1">18.5 天</div>
              <div className="text-[11px] text-slate-400 mt-1">
                诉讼周期平均缩短 75%
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center">
              <div className="text-xs text-slate-500 font-medium">司法确认自动履行率</div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-blue-900 mt-1">96.8%</div>
              <div className="text-[11px] text-slate-400 mt-1">
                几乎无当事人二次起诉
              </div>
            </div>
          </div>

          {/* SVG Visual Statistical Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart 1: 案件类型分布 */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-900" />
                  <h4 className="text-sm font-bold text-slate-900">收案类型结构分布比例</h4>
                </div>
                <span className="text-[11px] text-slate-400">2025-2026年度统计</span>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                {[
                  { label: '演艺经纪与解约纠纷', pct: 32, count: '596件', color: 'bg-blue-900' },
                  { label: '微短剧与短视频盗版/投流分账', pct: 26, count: '484件', color: 'bg-indigo-600' },
                  { label: '影视摄制联合出品与海外发行', pct: 21, count: '391件', color: 'bg-cyan-600' },
                  { label: 'AIGC大模型及数字音乐版权争议', pct: 14, count: '260件', color: 'bg-purple-600' },
                  { label: '名人名誉肖像权及其他', pct: 7, count: '131件', color: 'bg-slate-400' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-slate-700">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.pct}% ({item.count})</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 2: 季度案件受理与化解趋势 */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-sm font-bold text-slate-900">近六季度案件受理量与成功和解数</h4>
                </div>
                <span className="text-[11px] text-slate-400">单位：件</span>
              </div>

              <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
                {[
                  { quarter: '24-Q3', total: 180, success: 135 },
                  { quarter: '24-Q4', total: 240, success: 185 },
                  { quarter: '25-Q1', total: 290, success: 228 },
                  { quarter: '25-Q2', total: 340, success: 270 },
                  { quarter: '25-Q3', total: 410, success: 325 },
                  { quarter: '25-Q4', total: 402, success: 319 }
                ].map((q, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 text-[10px]">
                    <div className="text-slate-400 text-[9px]">{q.total}</div>
                    <div className="w-full flex items-end justify-center gap-1 h-32">
                      <div 
                        className="w-3.5 bg-blue-900 rounded-t"
                        style={{ height: `${(q.total / 450) * 100}%` }}
                        title={`受理: ${q.total}件`}
                      />
                      <div 
                        className="w-3.5 bg-emerald-500 rounded-t"
                        style={{ height: `${(q.success / 450) * 100}%` }}
                        title={`调解成功: ${q.success}件`}
                      />
                    </div>
                    <div className="text-slate-600 font-medium">{q.quarter}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-blue-900 rounded-sm" /> 季度总受理数
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 bg-emerald-500 rounded-sm" /> 达成调解协议数
                </span>
              </div>
            </div>

          </div>

          {/* 年度报告下载 (Annual Reports Download) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-600" />
                <h4 className="text-sm font-bold text-slate-900">年度白皮书与文娱产业法治报告下载</h4>
              </div>
              <span className="text-[11px] text-slate-400">官方发布 · 权威PDF</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {[
                { title: '《北京市东城区文娱产业纠纷多元化解白皮书（2025年度）》', size: '4.8 MB', date: '2026-01-15' },
                { title: '《首都网络微短剧著作权维权与快速调解机制实务指南》', size: '3.2 MB', date: '2025-11-20' },
                { title: '《生成式人工智能（AIGC）文娱合规与纠纷化解白皮书》', size: '5.1 MB', date: '2025-09-08' }
              ].map((report, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-900 line-clamp-2 leading-snug">{report.title}</div>
                    <div className="text-[11px] text-slate-400">{report.size} · 发布于 {report.date}</div>
                  </div>
                  <button
                    onClick={() => alert(`正在下载权威报告：${report.title}`)}
                    className="w-full py-1.5 bg-white border border-slate-300 hover:bg-blue-50 text-blue-900 rounded font-semibold text-xs flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>免费下载PDF报告</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          Case Detail Modal
      ────────────────────────────────────────────────────────── */}
      {detailModalCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            <div className="bg-[#0e2954] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold">典型案例详情与深度剖析</span>
              </div>
              <button
                onClick={() => {
                  setDetailModalCase(null);
                  if (onClearSelectedCase) onClearSelectedCase();
                }}
                className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
              <div className="space-y-1 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-100">
                    {detailModalCase.category} · {detailModalCase.industry}
                  </span>
                  <span className="text-slate-400 text-xs">办结日期：{detailModalCase.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{detailModalCase.title}</h3>
                <div className="flex gap-4 text-slate-500 pt-1 text-[11px]">
                  <span>涉案标的：<strong className="text-slate-900">{detailModalCase.disputeAmount}</strong></span>
                  <span>化解周期：<strong className="text-emerald-700">{detailModalCase.durationDays} 天达成和解</strong></span>
                  <span>承办结果：<strong className="text-blue-900">{detailModalCase.result}</strong></span>
                </div>
              </div>

              {/* 案例基本情况 */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-blue-900 rounded" />
                  一、基本案情概述
                </h4>
                <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {detailModalCase.summary}
                </p>
              </div>

              {/* 争议焦点 */}
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-blue-900 rounded" />
                  二、争议核心焦点
                </h4>
                <p className="text-slate-700 font-medium">
                  {detailModalCase.focus}
                </p>
              </div>

              {/* 调解要点分析 */}
              <div className="space-y-1.5 bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  三、中立调解员工作要点分析
                </h4>
                <p className="text-blue-900 leading-relaxed">
                  {detailModalCase.analysis}
                </p>
              </div>

              {/* 案例启示 */}
              <div className="space-y-1.5 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                <h4 className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  四、文娱行业合规启示
                </h4>
                <p className="text-amber-900 leading-relaxed">
                  {detailModalCase.revelation}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
              <div className="text-[11px] text-slate-500">
                案例编审：北京市东城区清朗文娱产业纠纷解决中心 案例研编组
              </div>
              <button
                onClick={() => {
                  setDetailModalCase(null);
                  if (onClearSelectedCase) onClearSelectedCase();
                }}
                className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-medium"
              >
                关闭
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
