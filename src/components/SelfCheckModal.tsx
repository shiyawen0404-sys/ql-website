import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

interface SelfCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoApply: () => void;
  onGoConsult: () => void;
}

export const SelfCheckModal: React.FC<SelfCheckModalProps> = ({
  isOpen,
  onClose,
  onGoApply,
  onGoConsult
}) => {
  const [step, setStep] = useState(1);
  const [industry, setIndustry] = useState('');
  const [disputeNature, setDisputeNature] = useState('');
  const [courtStatus, setCourtStatus] = useState('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setIndustry('');
    setDisputeNature('');
    setCourtStatus('');
  };

  const isEligible = courtStatus !== 'court_judged' && disputeNature !== 'criminal_labor';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0e2954] to-[#1e3e62] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold">我的纠纷能不能调？纠纷受理性快速自测</div>
              <div className="text-[11px] text-slate-300">回答3个简要问题，系统自动判断并提供立案指引</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                第 1 / 3 步：纠纷涉及的文娱产业领域
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                请选择您的争议所发生的业务形态：
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'film', label: '🎬 影视制作 / 联合出品 / 宣发' },
                  { id: 'agent', label: '🎤 演艺经纪 / 艺人解约 / 达人签约' },
                  { id: 'music', label: '🎵 音乐制作 / 词曲版税 / 发行' },
                  { id: 'aigc', label: '🤖 AIGC / 虚拟数字人 / AI侵权' },
                  { id: 'drama_game', label: '📱 微短剧 / 游戏动漫 / 电竞' },
                  { id: 'live', label: '🛍️ 网络直播 / MCN佣金 / 广告' },
                  { id: 'publish', label: '📚 文学出版 / 剧本著作权' },
                  { id: 'other', label: '⚖️ 其他文娱及知识产权相关领域' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setIndustry(item.label);
                      setStep(2);
                    }}
                    className="text-left p-3 rounded-lg border border-slate-200 hover:border-blue-900 hover:bg-blue-50 transition-colors font-medium text-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                第 2 / 3 步：争议核心性质
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                您与对方的主要争议矛盾表现在哪里？
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'contract', label: '📄 合同违约 / 款项拖欠 / 合作破裂 / 解除合同与违约金' },
                  { id: 'ip_infringement', label: '🛡️ 未经许可抄袭、洗稿、搬运、仿冒他人作品或商标权' },
                  { id: 'aigc_ai', label: '🤖 未经授权抓取数据用于AI模型训练或生成物权属争议' },
                  { id: 'criminal_labor', label: '⚠️ 纯刑事犯罪线索、或与文娱无关的传统纯劳动仲裁' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setDisputeNature(item.id);
                      setStep(3);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-900 hover:bg-blue-50 transition-colors font-medium text-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ← 返回上一步
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                第 3 / 3 步：诉讼或仲裁现状
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                目前该纠纷是否已经在法院或仲裁委处理过？
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { id: 'none', label: '🟢 尚未起诉或刚起诉立案前，希望诉前尽快和解' },
                  { id: 'in_litigation', label: '🟡 已向法院起诉但尚未开庭，希望法院委托专业调解' },
                  { id: 'court_judged', label: '🔴 法院已经作出终审生效判决或仲裁裁决' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCourtStatus(item.id);
                      setStep(4);
                    }}
                    className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-900 hover:bg-blue-50 transition-colors font-medium text-slate-700"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  ← 返回上一步
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 text-center py-2">
              {isEligible ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-900">
                    完全符合受理条件！适宜申请本中心调解
                  </h3>
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-left text-xs text-emerald-950 space-y-1.5">
                    <div><strong>认定领域：</strong>{industry}</div>
                    <div><strong>调解建议：</strong>本案适宜通过保密商事调解化解，建议尽快向本中心提交调解申请。达成协议后可直接一键向东城区法院申请司法确认。</div>
                    <div><strong>预期化解周期：</strong>普通案件约15-20日；微短剧等急迫争议可申请“7日快调通道”。</div>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onGoApply();
                      }}
                      className="flex-1 py-2.5 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow transition-all flex items-center justify-center gap-1"
                    >
                      <span>立即开始网上申请调解</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onGoConsult();
                      }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      咨询秘书处
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    可能属于不予受理情形或需特殊处理
                  </h3>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left text-xs text-amber-950 space-y-1.5">
                    <p>
                      如果纠纷已经由法院生效判决或涉嫌刑事犯罪，根据《调解规则》，通常不予作为民商事调解受理。
                    </p>
                    <p>
                      若您认为本案存在特殊执行和解或衍生争议情形，建议您先与本中心秘书处人工法务团队联系，进行个案初审。
                    </p>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        onClose();
                        onGoConsult();
                      }}
                      className="flex-1 py-2.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold shadow transition-all"
                    >
                      人工电话咨询秘书处
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>重新测试</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
