import React, { useState, useRef, useEffect } from 'react';
import { 
  Scale, 
  FileText, 
  Search, 
  User, 
  ChevronDown, 
  Phone, 
  Clock, 
  Menu, 
  X, 
  ShieldCheck,
  KeyRound,
  Users,
  Award
} from 'lucide-react';
import { MainNavTab, LoginMode } from '../types';

interface HeaderProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab, subTab?: string) => void;
  onOpenLogin: (mode: LoginMode) => void;
  onOpenApply: () => void;
  onOpenQuery: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenLogin,
  onOpenApply,
  onOpenQuery
}) => {
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<MainNavTab | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: Array<{
    id: MainNavTab;
    label: string;
    subItems?: Array<{ key: string; label: string }>;
  }> = [
    { id: 'home', label: '首页' },
    {
      id: 'services',
      label: '调解服务',
      subItems: [
        { key: 'scope', label: '受理范围' },
        { key: 'process', label: '调解流程' },
        { key: 'rules', label: '调解规则' },
        { key: 'fees', label: '收费方法' },
        { key: 'apply', label: '申请调解' },
        { key: 'query', label: '案件查询' },
      ],
    },
    {
      id: 'mediators',
      label: '调解员',
      subItems: [
        { key: 'roster', label: '调解员名册' },
        { key: 'how-to-choose', label: '如何选择调解员' },
        { key: 'become-mediator', label: '成为调解员' },
      ],
    },
    {
      id: 'cases',
      label: '案例与研究',
      subItems: [
        { key: 'cases', label: '调解案例' },
        { key: 'research', label: '行业研究' },
        { key: 'annual-reports', label: '年度工作报告' },
      ],
    },
    {
      id: 'news',
      label: '动态资讯',
      subItems: [
        { key: 'center-news', label: '中心动态' },
        { key: 'notices', label: '通知公告' },
        { key: 'industry', label: '行业资讯' },
        { key: 'regulations', label: '政策法规动态' },
      ],
    },
    {
      id: 'help',
      label: '帮助中心',
      subItems: [
        { key: 'faq-overview', label: '我想先了解调解' },
        { key: 'faq-eligibility', label: '我不知道能不能调' },
        { key: 'faq-apply', label: '我想申请调解' },
        { key: 'faq-fees', label: '费用与时间' },
        { key: 'system-ops', label: '系统操作问题' },
        { key: 'guide-videos', label: '系统操作指引视频' },
      ],
    },
    {
      id: 'about',
      label: '关于我们',
      subItems: [
        { key: 'intro', label: '中心介绍' },
        { key: 'structure', label: '组织架构' },
        { key: 'mechanisms', label: '工作机制' },
        { key: 'regulations', label: '章程与制度' },
        { key: 'contact', label: '联系我们' },
        { key: 'cooperation', label: '合作与共建' },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* Top Authority Header Bar */}
      <div className="bg-[#0e2954] text-slate-200 text-xs py-1.5 px-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              北京市东城区司法局业务指导单位
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              北京市东城区人民法院诉调对接示范基地
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              调解咨询热线: <strong className="text-white font-semibold">010-8511 0188</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              工作日 09:00 - 17:30
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none py-2"
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0e2954] to-[#1e3e62] flex items-center justify-center text-amber-400 shadow-md border border-amber-500/30 group-hover:scale-105 transition-transform duration-200">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-serif leading-tight">
                  北京市东城区清朗文娱产业纠纷解决中心
                </h1>
                <span className="hidden lg:inline-block text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-300/80 px-1.5 py-0.5 rounded">
                  法定调解平台
                </span>
              </div>
              <p className="text-[11px] text-slate-500 tracking-wider uppercase font-medium">
                Beijing Dongcheng Qinglang Entertainment Dispute Resolution Center
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* 申请调解 按钮 */}
            <button
              id="header-btn-apply"
              onClick={onOpenApply}
              className="px-4 py-2.5 bg-gradient-to-r from-[#991b1b] to-[#b91c1c] hover:from-[#7f1d1d] hover:to-[#991b1b] text-white rounded-md text-sm font-semibold shadow hover:shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <FileText className="w-4 h-4 text-amber-200" />
              <span>申请调解</span>
            </button>

            {/* 案件查询 按钮 */}
            <button
              id="header-btn-query"
              onClick={onOpenQuery}
              className="px-4 py-2.5 bg-white hover:bg-slate-50 text-[#0e2954] border border-[#0e2954]/30 hover:border-[#0e2954] rounded-md text-sm font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <Search className="w-4 h-4 text-[#0e2954]" />
              <span>案件查询</span>
            </button>

            {/* 登录 下拉菜单 */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="header-btn-login-menu"
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="px-4 py-2.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-md text-sm font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>登录</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* 登录子菜单: 当事人登录 / 调解员登录 / 当事人调解码登录 */}
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    统一登录通道
                  </div>
                  <button
                    id="menu-party-login"
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      onOpenLogin('party');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2.5 transition-colors"
                  >
                    <User className="w-4 h-4 text-blue-700" />
                    <div>
                      <div className="font-medium leading-none">当事人登录</div>
                      <div className="text-[11px] text-slate-400 mt-1">账号密码 / 手机验证码</div>
                    </div>
                  </button>

                  <button
                    id="menu-mediator-login"
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      onOpenLogin('mediator');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-900 flex items-center gap-2.5 transition-colors border-t border-slate-100"
                  >
                    <Users className="w-4 h-4 text-indigo-700" />
                    <div>
                      <div className="font-medium leading-none">调解员登录</div>
                      <div className="text-[11px] text-slate-400 mt-1">专属调解员办案工作台</div>
                    </div>
                  </button>

                  <button
                    id="menu-code-login"
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      onOpenLogin('mediation-code');
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-900 flex items-center gap-2.5 transition-colors border-t border-slate-100"
                  >
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-medium text-amber-900 leading-none">当事人调解码登录</div>
                      <div className="text-[11px] text-amber-700/80 mt-1">免密直达案情与在线调解</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenApply()}
              className="px-2.5 py-1.5 bg-[#991b1b] text-white rounded text-xs font-semibold"
            >
              申请调解
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#0e2954] border-t border-blue-950 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li 
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                >
                  <button
                    id={`nav-item-${item.id}`}
                    onClick={() => onSelectTab(item.id)}
                    className={`px-5 py-3.5 text-sm font-medium flex items-center gap-1.5 transition-colors ${
                      isActive 
                        ? 'text-white bg-[#1a4073] border-b-2 border-amber-400 font-semibold' 
                        : 'text-slate-200 hover:text-white hover:bg-[#163b63]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.subItems && (
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>

                  {/* Dropdown Menu on hover */}
                  {item.subItems && hoveredNav === item.id && (
                    <div className="absolute left-0 top-full w-48 bg-white shadow-xl rounded-b-md border border-slate-200 py-1.5 z-50 animate-in fade-in duration-150">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.key}
                          id={`nav-sub-${item.id}-${sub.key}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTab(item.id, sub.key);
                            setHoveredNav(null);
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                          <span className="text-slate-300 group-hover:text-blue-500">›</span>
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>调解系统运行正常</span>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white border-t border-slate-800 p-4 space-y-4">
          <div className="grid grid-cols-3 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApply();
              }}
              className="py-2 bg-red-700 text-white rounded text-xs font-semibold text-center"
            >
              申请调解
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuery();
              }}
              className="py-2 bg-slate-800 border border-slate-700 text-white rounded text-xs font-semibold text-center"
            >
              案件查询
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin('party');
              }}
              className="py-2 bg-blue-700 text-white rounded text-xs font-semibold text-center"
            >
              系统登录
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.id} className="py-1">
                <button
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded font-medium text-sm ${
                    activeTab === item.id ? 'bg-blue-800 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
                {item.subItems && (
                  <div className="grid grid-cols-2 gap-1 pl-4 pt-1">
                    {item.subItems.map((sub) => (
                      <button
                        key={sub.key}
                        onClick={() => {
                          onSelectTab(item.id, sub.key);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left text-xs text-slate-400 hover:text-amber-300 py-1"
                      >
                        • {sub.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-around text-xs text-slate-400">
            <button onClick={() => onOpenLogin('party')} className="hover:text-white">当事人登录</button>
            <span>|</span>
            <button onClick={() => onOpenLogin('mediator')} className="hover:text-white">调解员登录</button>
            <span>|</span>
            <button onClick={() => onOpenLogin('mediation-code')} className="text-amber-400 hover:text-amber-300 font-semibold">调解码登录</button>
          </div>
        </div>
      )}
    </header>
  );
};
