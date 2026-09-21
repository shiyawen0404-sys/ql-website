import React, { useState } from 'react';
import { X, User, Users, KeyRound, ShieldCheck, ArrowRight, CheckCircle2, Phone, Lock } from 'lucide-react';
import { LoginMode } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  initialMode: LoginMode;
  onClose: () => void;
  onLoginSuccess: (role: string, targetCaseCode?: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  const [activeMode, setActiveMode] = useState<LoginMode>(initialMode);
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'sms' | 'pwd'>('sms');
  const [mediatorAccount, setMediatorAccount] = useState('');
  const [mediationCode, setMediationCode] = useState('QL-2026-0318');
  const [phoneTail, setPhoneTail] = useState('8899');
  const [countdown, setCountdown] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [successInfo, setSuccessInfo] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendCode = () => {
    if (!phone || phone.length < 11) {
      setErrorMsg('请输入正确的11位手机号码');
      return;
    }
    setErrorMsg('');
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePartySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginType === 'sms' && !phone) {
      setErrorMsg('请输入手机号');
      return;
    }
    setErrorMsg('');
    setSuccessInfo('当事人验证成功，正在进入调解服务台...');
    setTimeout(() => {
      onLoginSuccess('party');
      onClose();
    }, 800);
  };

  const handleMediatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediatorAccount) {
      setErrorMsg('请输入调解员执业证书号或登记手机号');
      return;
    }
    setErrorMsg('');
    setSuccessInfo('调解员身份核验通过，正在载入调解卷宗工作台...');
    setTimeout(() => {
      onLoginSuccess('mediator');
      onClose();
    }, 800);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediationCode) {
      setErrorMsg('请输入有效的调解码');
      return;
    }
    setErrorMsg('');
    setSuccessInfo(`调解码 [${mediationCode}] 验证通过，直达案情看板...`);
    setTimeout(() => {
      onLoginSuccess('code', mediationCode);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
        
        {/* Header Bar */}
        <div className="bg-[#0e2954] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-800/80 flex items-center justify-center text-amber-400 border border-amber-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">统一身份认证与调解登录</div>
              <div className="text-[11px] text-slate-300">北京市东城区清朗文娱纠纷解决中心</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
          <button
            id="tab-login-party"
            onClick={() => { setActiveMode('party'); setErrorMsg(''); setSuccessInfo(null); }}
            className={`py-3 px-2 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeMode === 'party' 
                ? 'border-[#0e2954] text-[#0e2954] bg-white font-bold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>当事人登录</span>
          </button>

          <button
            id="tab-login-mediator"
            onClick={() => { setActiveMode('mediator'); setErrorMsg(''); setSuccessInfo(null); }}
            className={`py-3 px-2 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeMode === 'mediator' 
                ? 'border-[#0e2954] text-[#0e2954] bg-white font-bold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>调解员登录</span>
          </button>

          <button
            id="tab-login-code"
            onClick={() => { setActiveMode('mediation-code'); setErrorMsg(''); setSuccessInfo(null); }}
            className={`py-3 px-2 text-center border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeMode === 'mediation-code' 
                ? 'border-amber-600 text-amber-800 bg-amber-50/50 font-bold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>调解码登录</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successInfo && (
            <div className="mb-4 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg p-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successInfo}</span>
            </div>
          )}

          {/* TAB 1: 当事人登录 */}
          {activeMode === 'party' && (
            <form onSubmit={handlePartySubmit} className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
                <span className="text-slate-500">选择认证方式：</span>
                <div className="flex items-center gap-3">
                  <button 
                    type="button" 
                    onClick={() => setLoginType('sms')} 
                    className={`font-medium ${loginType === 'sms' ? 'text-blue-900 underline' : 'text-slate-400'}`}
                  >
                    手机验证码
                  </button>
                  <span className="text-slate-300">|</span>
                  <button 
                    type="button" 
                    onClick={() => setLoginType('pwd')} 
                    className={`font-medium ${loginType === 'pwd' ? 'text-blue-900 underline' : 'text-slate-400'}`}
                  >
                    账号密码
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">手机号码 / 统一社会信用代码</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    id="party-phone-input"
                    type="text"
                    placeholder="请输入11位手机号或企业机构代码"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                  />
                </div>
              </div>

              {loginType === 'sms' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">短信动态验证码</label>
                  <div className="flex gap-2">
                    <input
                      id="party-sms-input"
                      type="text"
                      placeholder="6位验证码"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendCode}
                      disabled={countdown > 0}
                      className="px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shrink-0 border border-slate-300 disabled:opacity-50"
                    >
                      {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">登录密码</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      id="party-password-input"
                      type="password"
                      placeholder="请输入注册密码"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  id="btn-submit-party-login"
                  type="submit"
                  className="w-full py-2.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-sm font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>确认登录</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                未注册用户首次手机验证码登录将自动完成实人账号开通
              </p>
            </form>
          )}

          {/* TAB 2: 调解员登录 */}
          {activeMode === 'mediator' && (
            <form onSubmit={handleMediatorSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200/80 rounded-lg p-2.5 text-xs text-blue-900">
                ⚖️ <strong>调解员专属工作台</strong>：仅限清朗文娱产业纠纷解决中心聘任入册调解员登录。
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">调解员账号 / 执业证号</label>
                <div className="relative">
                  <Users className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    id="mediator-account-input"
                    type="text"
                    placeholder="如：MED-2026-088 或 律师执业证号"
                    value={mediatorAccount}
                    onChange={(e) => setMediatorAccount(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">动态安全口令 / 电子印章密码</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    id="mediator-password-input"
                    type="password"
                    placeholder="请输入安全密钥或短信口令"
                    defaultValue="******"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-mediator-login"
                  type="submit"
                  className="w-full py-2.5 bg-[#163b63] hover:bg-[#0e2954] text-white rounded-lg text-sm font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>进入调解员办案室</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                首次登录请在秘书处指导下绑定司法区块链电子调解印鉴
              </p>
            </form>
          )}

          {/* TAB 3: 当事人调解码登录 */}
          {activeMode === 'mediation-code' && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                  <span>什么是调解码？</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  当事人无需注册，凭立案受理短信中附带的专属调解码（如 QL-2026-XXXX）与手机尾号，可直接免密查阅案情、提交证据、参加视频调解。
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">专属调解码</label>
                <input
                  id="code-mediation-input"
                  type="text"
                  placeholder="例如：QL-2026-0318"
                  value={mediationCode}
                  onChange={(e) => setMediationCode(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono tracking-wider border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">立案预留手机号后4位</label>
                <input
                  id="code-phone-tail-input"
                  type="text"
                  maxLength={4}
                  placeholder="例如：8899"
                  value={phoneTail}
                  onChange={(e) => setPhoneTail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-600 outline-none"
                />
              </div>

              <div className="pt-1 flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMediationCode('QL-2026-0318');
                    setPhoneTail('8899');
                  }}
                  className="text-amber-700 hover:text-amber-900 font-medium underline"
                >
                  ⚡ 点击填入演示案卷调解码
                </button>
                <span className="text-slate-400">免密安全直通</span>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-code-login"
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white rounded-lg text-sm font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>使用调解码直通案卷</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
