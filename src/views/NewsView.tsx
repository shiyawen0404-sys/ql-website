import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Bell, 
  BookOpen, 
  Globe, 
  Search, 
  Calendar, 
  Eye, 
  ChevronRight, 
  X,
  Scale,
  Building2,
  ExternalLink
} from 'lucide-react';
import { NewsSubTab, NewsItem } from '../types';
import { MOCK_NEWS } from '../data/mockData';

interface NewsViewProps {
  initialSubTab?: NewsSubTab;
}

export const NewsView: React.FC<NewsViewProps> = ({
  initialSubTab = 'center-news'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<NewsSubTab>(initialSubTab);
  const [searchTerm, setSearchTerm] = useState('');
  const [policyLevel, setPolicyLevel] = useState<string>('all');
  const [readingNews, setReadingNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (initialSubTab) setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  const filteredNews = MOCK_NEWS.filter((item) => {
    const matchesCategory = item.category === activeSubTab;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Sub-Nav */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">动态资讯</span>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            文娱法治动态与政策法规
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            实时发布中心改革进展、重大开庭调解公告、文娱行业新规及法治建设快讯
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'center-news', label: '中心动态', icon: Globe },
            { id: 'notice', label: '通知公告', icon: Bell },
            { id: 'policy', label: '政策法规', icon: Scale },
            { id: 'industry', label: '行业资讯', icon: Building2 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as NewsSubTab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeSubTab === tab.id
                    ? 'bg-[#0e2954] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="搜索资讯标题、关键词或政策法规文号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg outline-none focus:border-blue-900"
            />
          </div>

          {activeSubTab === 'policy' && (
            <div className="flex gap-2">
              <select
                value={policyLevel}
                onChange={(e) => setPolicyLevel(e.target.value)}
                className="px-3 py-2 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-900 bg-white"
              >
                <option value="all">全级别政策法规</option>
                <option value="国家政策">国家法律法规与部委规章</option>
                <option value="地方政策">北京市与东城区地方政策</option>
                <option value="行业规范">文娱行业协会倡议自律规范</option>
              </select>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-500 pt-1 border-t border-slate-100">
          当前板块检索到 <strong className="text-blue-900 font-bold">{filteredNews.length}</strong> 条资讯记录
        </div>
      </div>

      {/* News Items List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            onClick={() => setReadingNews(item)}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-900 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {item.isTop && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                    置顶
                  </span>
                )}
                {item.isImportant && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    重要
                  </span>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.date}</span>
                </span>
                <span className="text-xs text-slate-400">| 来源：{item.source}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-none border-slate-100">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{item.viewCount} 阅</span>
              </div>
              <button className="text-xs font-semibold text-blue-900 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                <span>查阅全文</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}

        {filteredNews.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            暂无符合条件的资讯内容
          </div>
        )}
      </div>

      {/* Reading News Modal */}
      {readingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
            
            <div className="bg-[#0e2954] text-white px-6 py-4 flex items-center justify-between">
              <div className="text-xs font-bold text-amber-300">
                北京市东城区清朗文娱产业纠纷解决中心 · 官方公告专栏
              </div>
              <button
                onClick={() => setReadingNews(null)}
                className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
              <div className="space-y-3 border-b border-slate-200 pb-5 text-center">
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 leading-snug">
                  {readingNews.title}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                  <span>发布时间：{readingNews.date}</span>
                  <span>来源：{readingNews.source}</span>
                  <span>浏览次数：{readingNews.viewCount} 次</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4 font-sans">
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-600 font-medium">
                  <strong>导读摘要：</strong>{readingNews.summary}
                </p>
                <p>
                  为贯彻落实国家关于深化多元化纠纷解决机制改革的意见，北京市东城区清朗文娱产业纠纷解决中心坚持以首善标准服务首都全国文化中心建设。
                </p>
                <p>
                  中心依托最高人民法院与司法行政部门“总对总”在线诉调对接体系，发挥行业专业调解员中立公信力量，围绕首都文娱新业态发展痛点，健全“调诉一体化、诉调无缝隙”闭环体系。
                </p>
                <p>
                  广大文娱企业、演艺工作者及创作者如需进一步了解相关政策文件或申请具体案件调解支持，可随时通过本官方网站提交材料或致电中心秘书处。
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
                <span>编辑校对：中心法务秘书处宣传组</span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
                >
                  打印本页
                </button>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setReadingNews(null)}
                className="px-4 py-1.5 bg-[#0e2954] text-white rounded-lg text-xs font-semibold"
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
