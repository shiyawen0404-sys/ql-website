import React, { useState, useEffect } from 'react';
import { FileText, Search, KeyRound, HelpCircle, Phone, ArrowUp } from 'lucide-react';
import { LoginMode } from '../types';

interface QuickFloatingBarProps {
  onOpenApply: () => void;
  onOpenQuery: () => void;
  onOpenLogin: (mode: LoginMode) => void;
  onOpenConsult: () => void;
  onOpenSelfCheck: () => void;
}

export const QuickFloatingBar: React.FC<QuickFloatingBarProps> = ({
  onOpenApply,
  onOpenQuery,
  onOpenLogin,
  onOpenConsult,
  onOpenSelfCheck
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="快捷服务入口" className="fixed right-3 bottom-16 z-40 flex flex-col items-center gap-2 select-none">
      <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-200/80 p-1.5 flex flex-col gap-1 text-slate-700">
        
        {/* 申请调解 */}
        <button
          id="float-btn-apply"
          onClick={onOpenApply}
          title="申请调解"
          className="w-12 h-14 rounded-lg bg-gradient-to-b from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 shadow-sm transition-all group"
        >
          <FileText className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
          <span className="leading-tight text-center">申请<br />调解</span>
        </button>

        {/* 案件查询 */}
        <button
          id="float-btn-query"
          onClick={onOpenQuery}
          title="案件查询"
          className="w-12 h-14 rounded-lg hover:bg-blue-50 text-[#0e2954] hover:text-blue-800 flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 transition-colors group"
        >
          <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="leading-tight text-center">案件<br />查询</span>
        </button>

        {/* 调解码 */}
        <button
          id="float-btn-code"
          onClick={() => onOpenLogin('mediation-code')}
          title="调解码直登"
          className="w-12 h-14 rounded-lg hover:bg-amber-50 text-amber-800 flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 transition-colors group border-t border-slate-100"
        >
          <KeyRound className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          <span className="leading-tight text-center">调解<br />码</span>
        </button>

        {/* 纠纷自查 */}
        <button
          id="float-btn-selfcheck"
          onClick={onOpenSelfCheck}
          title="纠纷能不能调·自测"
          className="w-12 h-14 rounded-lg hover:bg-emerald-50 text-emerald-800 flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 transition-colors group border-t border-slate-100"
        >
          <HelpCircle className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          <span className="leading-tight text-center">纠纷<br />自查</span>
        </button>

        {/* 咨询秘书处 */}
        <button
          id="float-btn-consult"
          onClick={onOpenConsult}
          title="咨询秘书处"
          className="w-12 h-14 rounded-lg hover:bg-blue-50 text-blue-900 flex flex-col items-center justify-center text-[10px] font-medium gap-0.5 transition-colors group border-t border-slate-100"
        >
          <Phone className="w-4 h-4 text-blue-700 group-hover:scale-110 transition-transform" />
          <span className="leading-tight text-center">咨询<br />热线</span>
        </button>
      </div>

      {/* 回到顶部 */}
      {showBackToTop && (
        <button
          id="float-btn-backtotop"
          onClick={scrollToTop}
          title="回到顶部"
          className="w-10 h-10 rounded-full bg-slate-800/90 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg transition-all animate-in fade-in zoom-in duration-200"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
};
