import React from 'react';
import { Scale, Phone, Mail, MapPin, Clock, ShieldCheck, Award, FileText, ChevronRight } from 'lucide-react';
import { TRUST_STATS } from '../data/mockData';
import { MainNavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: MainNavTab, subTab?: string) => void;
  onOpenConsult: () => void;
  onOpenApply: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenConsult,
  onOpenApply
}) => {
  return (
    <footer className="bg-[#0b1d3a] text-slate-300 border-t border-slate-800">
      {/* Trust Stats Bar */}
      <div className="border-b border-blue-950/80 bg-gradient-to-r from-[#0d2346] via-[#102b54] to-[#0d2346] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-amber-400 text-xs font-semibold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>司法对接 · 行业公信 · 权威调解数据</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
              文娱产业纠纷多元化解信任基石
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl mx-auto">
              立足北京市东城区文化核心区，为影视、音乐、出版、AIGC、演艺经纪等文化新质生产力保驾护航
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
            {TRUST_STATS.map((stat, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/60 rounded-lg p-4 border border-blue-900/40 text-center hover:border-amber-500/40 transition-colors"
              >
                <div className="text-2xl lg:text-3xl font-bold text-white font-serif flex items-baseline justify-center gap-1">
                  <span className="text-amber-400">{stat.value}</span>
                  <span className="text-sm font-normal text-slate-400">{stat.unit}</span>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-tight">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Center Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-amber-400 border border-amber-500/30">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <div className="text-white font-bold text-base font-serif">
                  北京市东城区清朗文娱产业纠纷解决中心
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                  Beijing Dongcheng Dispute Resolution Center
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-4">
              经北京市东城区有关部门批准设立，专注于文化娱乐全产业链争议的多元化解与商事调解机构。致力于通过专业、高效、保密、弹性的调解方式，协助文娱企业与从业者化解矛盾纠纷，重塑商业信任。
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded text-slate-300 border border-slate-700">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                法院司法确认联络点
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded text-slate-300 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                调解全流程保密承诺
              </span>
            </div>

            <div className="pt-3">
              <button
                id="footer-btn-consult-secretariat"
                onClick={onOpenConsult}
                className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded text-xs font-semibold shadow flex items-center gap-1.5 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-amber-200" />
                <span>联系咨询秘书处</span>
              </button>
            </div>
          </div>

          {/* Col 3: 调解服务导航 */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold border-l-2 border-amber-400 pl-2.5">
              调解服务
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectTab('services', 'scope')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 受理范围概览
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('services', 'process')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 六步调解流程
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('services', 'rules')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 调解规则与程序
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('services', 'fees')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 公益收费方法
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenApply}
                  className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-amber-400" /> 申请调解通道
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: 帮助与答疑 */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold border-l-2 border-amber-400 pl-2.5">
              帮助中心
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onSelectTab('help', 'faq-eligibility')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 我不知道能不能调
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('help', 'faq-apply')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 申请前需要准备什么
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('help', 'faq-fees')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 费用承担与时长
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('help', 'system-ops')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 调解码登录指南
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('help', 'guide-videos')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-400 hover:translate-x-0.5 transform duration-150"
                >
                  <ChevronRight className="w-3 h-3 text-slate-500" /> 系统操作指引视频
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: 秘书处联系方式 */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-semibold border-l-2 border-amber-400 pl-2.5">
              联系秘书处
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>北京市东城区东华门街道文娱法治大厦5层（近王府井文创街区）</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-white font-medium">010-8511 0188</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>secretariat@dongcheng-adr.org.cn</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>法定工作日 09:00 - 17:30</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p>© 2026 北京市东城区清朗文娱产业纠纷解决中心 版权所有</p>
            <p className="mt-1 text-[11px] text-slate-600">
              京ICP备2026019888号-1 · 京公网安备 11010102008899号 · 规范文号：东司发〔2025〕19号
            </p>
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <button onClick={() => onSelectTab('services', 'rules')} className="hover:text-slate-200">免责声明</button>
            <span>•</span>
            <button onClick={() => onSelectTab('services', 'rules')} className="hover:text-slate-200">保密协议</button>
            <span>•</span>
            <button onClick={() => onSelectTab('about', 'contact')} className="hover:text-slate-200">到达路线</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
