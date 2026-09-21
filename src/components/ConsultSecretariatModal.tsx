import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle2, Send } from 'lucide-react';

interface ConsultSecretariatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultSecretariatModal: React.FC<ConsultSecretariatModalProps> = ({
  isOpen,
  onClose
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [disputeType, setDisputeType] = useState('合同纠纷');
  const [desc, setDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      // Auto close after showing thank you note
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0e2954] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold">咨询秘书处 · 专线指导</div>
              <div className="text-[11px] text-slate-300">北京市东城区清朗文娱产业纠纷解决中心</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Contact Direct Hotlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs">
            <div className="space-y-1">
              <div className="text-slate-500 flex items-center gap-1 font-medium">
                <Phone className="w-3.5 h-3.5 text-blue-800" />
                调解立案与咨询专线
              </div>
              <div className="text-base font-bold text-[#0e2954]">
                010-8511 0188
              </div>
              <div className="text-[11px] text-slate-400">法定工作日 9:00 - 17:30</div>
            </div>

            <div className="space-y-1">
              <div className="text-slate-500 flex items-center gap-1 font-medium">
                <Mail className="w-3.5 h-3.5 text-blue-800" />
                秘书处官方收案邮箱
              </div>
              <div className="text-xs font-semibold text-slate-800 break-all">
                secretariat@dongcheng-adr.org.cn
              </div>
              <div className="text-[11px] text-slate-400">24小时接收调解初审材料</div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-600 bg-blue-50/70 border border-blue-100 rounded-lg p-3">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-blue-800 shrink-0 mt-0.5" />
              <span><strong>线下接待地址：</strong>北京市东城区东华门街道文娱法治大厦5层 综合调解接待大厅</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>现场接待时间：周一至周五 09:00 - 11:30，13:30 - 17:00</span>
            </div>
          </div>

          {/* Online Quick Callback Reservation */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3 pt-1 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                <span>在线留言或预约秘书处回电（15分钟内响应）</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">联系人姓名</label>
                  <input
                    type="text"
                    required
                    placeholder="如：陈先生/李女士"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">联系手机号</label>
                  <input
                    type="tel"
                    required
                    placeholder="请输入11位手机号"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">初步咨询类型</label>
                <select
                  value={disputeType}
                  onChange={(e) => setDisputeType(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none bg-white"
                >
                  <option value="合同纠纷">合同纠纷（演艺经纪/影视制作/授权分成）</option>
                  <option value="权属与侵权纠纷">权属与侵权纠纷（著作权/商标/邻接权）</option>
                  <option value="新型业态纠纷">新型业态纠纷（AIGC/短视频微短剧/网络平台）</option>
                  <option value="费用及流程咨询">费用、流程及调解员选定咨询</option>
                  <option value="其他">其他文娱产业争议</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">简要咨询事项</label>
                <textarea
                  rows={2}
                  placeholder="请简要描述您遇到的纠纷情况（如涉案主体、争议焦点），我们将指派对应专业法务秘书与您沟通"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-900 outline-none resize-none"
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0e2954] hover:bg-[#163b63] text-white rounded-lg text-xs font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>提交咨询预约</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-slate-900">咨询预约提交成功！</div>
              <p className="text-xs text-slate-500">
                中心秘书处法务专员已收到您的需求，将在工作时间内第一时间致电为您提供专业答疑。
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
