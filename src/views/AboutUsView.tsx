import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  Award, 
  Handshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  Compass, 
  ChevronRight,
  Landmark
} from 'lucide-react';
import { AboutSubTab } from '../types';

interface AboutUsViewProps {
  initialSubTab?: AboutSubTab;
}

export const AboutUsView: React.FC<AboutUsViewProps> = ({
  initialSubTab = 'intro'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AboutSubTab>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) setActiveSubTab(initialSubTab);
  }, [initialSubTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Sub-Nav */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>首页</span>
          <span>›</span>
          <span className="text-blue-900 font-medium">关于我们</span>
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            北京市东城区清朗文娱产业纠纷解决中心
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            立足首都全国文化中心核心区 · 护航文娱新质生产力健康持续繁荣发展
          </p>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 text-xs sm:text-sm border-t border-slate-100 pt-3">
          {[
            { id: 'intro', label: '中心简介' },
            { id: 'structure', label: '组织架构' },
            { id: 'advisors', label: '专家顾问' },
            { id: 'partners', label: '合作共建' },
            { id: 'contact-us', label: '联系我们' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as AboutSubTab)}
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
          1. 中心简介 (Intro)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'intro' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          <div className="bg-gradient-to-r from-[#0e2954] via-[#163b63] to-[#1f4a7c] text-white rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold">
              <Compass className="w-4 h-4" />
              <span>中心基本定位与使命</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif leading-snug">
              专业、中立、高效的文娱法治多元解纷高地
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
              北京市东城区清朗文娱产业纠纷解决中心是经司法行政部门指导成立、依法设立的专门化民办非企业调解机构。中心扎根首都东城区深厚文化沃土，紧密衔接影视剧作、舞台演艺、数字音乐、出版经纪、网络微短剧及AIGC前沿产业链条，致力于打造全国标杆性的文娱纠纷多元化解服务综合平台。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                🎯
              </div>
              <h4 className="text-base font-bold text-slate-900">核心使命</h4>
              <p className="text-slate-500 leading-relaxed">
                以法治化、市场化方式有效化解文化娱乐行业存量矛盾，防范文娱投融资履约法律风险，为首都全国文化中心建设注入稳健法治正能量。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
                ⚖️
              </div>
              <h4 className="text-base font-bold text-slate-900">服务宗旨</h4>
              <p className="text-slate-500 leading-relaxed">
                坚持“以和为贵、守正创新、中立保密、促成共赢”。既解法律争议之“死结”，更解行业伙伴之“心结”，帮助文娱当事人维系长期商业合作纽带。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold">
                🌟
              </div>
              <h4 className="text-base font-bold text-slate-900">战略愿景</h4>
              <p className="text-slate-500 leading-relaxed">
                构建具有全国公信力、行业影响力和国际竞争力的文娱知识产权商事调解首选品牌，塑造“诉前调解首选清朗”的首都法治名片。
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          2. 组织架构 (Structure)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'structure' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-serif">中心治理结构与内设机构</h3>
            <p className="text-xs text-slate-500">健全的现代法人治理体系 · 理事会领导下的主任负责制</p>
          </div>

          <div className="space-y-6 max-w-2xl mx-auto text-xs text-slate-700">
            {/* Tier 1: 理事会 */}
            <div className="p-4 rounded-xl bg-[#0e2954] text-white text-center shadow">
              <div className="font-bold text-sm text-amber-300">中心理事会 / 监事会</div>
              <div className="text-[11px] text-slate-300 mt-0.5">决策机构：负责审定中心章程、发展规划及重大调解规则修订</div>
            </div>

            <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

            {/* Tier 2: 主任 / 副主任 */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 text-center">
              <div className="font-bold text-sm text-slate-900">中心主任 / 常务副主任</div>
              <div className="text-[11px] text-slate-500 mt-0.5">执行机构：全面负责中心日常运营、重大案件调处及行政协调</div>
            </div>

            <div className="w-0.5 h-6 bg-slate-300 mx-auto" />

            {/* Tier 3: 秘书处与各专业委员会 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                <div className="font-bold text-blue-900">常设秘书处</div>
                <p className="text-[11px] text-slate-500">
                  立案审核室、诉调对接窗口、在线调解技术保障组、行政财务部
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                <div className="font-bold text-blue-900">调解员管理委员会</div>
                <p className="text-[11px] text-slate-500">
                  负责调解员选聘考核、履职培训、道德纪律监督与公信力测评
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 text-center space-y-1">
                <div className="font-bold text-blue-900">文娱法治专家委员会</div>
                <p className="text-[11px] text-slate-500">
                  疑难复杂案件咨询研讨、行业白皮书编制、AIGC新兴前沿课题攻关
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          3. 专家顾问 (Advisors)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'advisors' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-lg font-bold text-slate-900 font-serif">专家顾问委员会</h3>
            <p className="text-xs text-slate-500">
              中心聘请中国政法大学、北京大学法学院、中国传媒大学知识产权学院知名学者及文娱行业领军人物担任高级智库顾问
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: '孙教授',
                title: '法学顾问 · 知识产权法学带头人',
                org: '中国政法大学知识产权研究所',
                desc: '原国务院反垄断反不正当竞争专家组成员，长期专注于文娱著作权保护与商业特许经营法治研究。'
              },
              {
                name: '赵前高级法官',
                title: '司法顾问 · 原知识产权审判庭庭长',
                org: '资深知识产权审判专家',
                desc: '审理过多起在全国具有标杆意义的著作权及不正当竞争大案，曾获全国审判业务专家称号。'
              },
              {
                name: '钱会长',
                title: '产业顾问 · 文娱产业投资人',
                org: '首都文化产业投融资促进会',
                desc: '三十年文娱全产业链投资管理经验，熟悉影视宣发、微短剧出海及演艺经纪商业运转规则。'
              }
            ].map((adv, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-900 flex items-center justify-center font-bold text-base">
                  {adv.name.slice(0, 1)}
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{adv.name}</h4>
                  <div className="text-xs text-blue-900 font-medium mt-0.5">{adv.title}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{adv.org}</div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          4. 合作共建 (Partners)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'partners' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-serif">诉调对接与产业共建合作生态</h3>
            <p className="text-xs text-slate-500">
              与人民法院、司法局、行业商协会及版权保护机构建立全方位深度战略协作网络
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-slate-700">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Landmark className="w-4 h-4 text-blue-900" />
                <span>北京市东城区人民法院 · 诉调对接绿色通道</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                全面入驻东城区人民法院“多元调解+速裁”线上协同平台，对中心主持达成的文娱和解协议，开辟在线司法确认极速审查通道，当日立案、3日内下达执行力民事裁定。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-blue-900" />
                <span>首都知识产权与网络版权监测中心</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                实现区块链电子侵权取证数据与中心调解卷宗直通互认。当事人可一键导入被侵权视频/图文存证证书，调解员直接采信作为调解基准事实。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Handshake className="w-4 h-4 text-blue-900" />
                <span>文娱行业协会与影视制片联盟</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                联合中国电视剧制作产业协会、网络视听微短剧委员会，在标准行业合同中推荐载入《争议提交清朗调解示范条款》，倡导“先行调解、友好协商”。
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Award className="w-4 h-4 text-blue-900" />
                <span>首都文娱法治产学研实习基地</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                为多所重点政法院校设立“文娱商事调解联合教研基地”，共同开展真实文娱案件模拟实训、撰写年度产业解纷白皮书。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────
          5. 联系我们 (Contact Us)
      ────────────────────────────────────────────────────────── */}
      {activeSubTab === 'contact-us' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-200">
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif">官方联络方式与地理方位</h3>
              <p className="text-xs text-slate-500">东城区中心地段 · 交通便利 · 设有一站式调解接待大厅</p>
            </div>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <strong>办公与调解地址：</strong>
                  <span>北京市东城区东华门街道文娱法治大厦 5 层（综合调解接待大厅）</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <strong>调解立案热线：</strong>
                  <span>010-8511 0188（专线导诉，工作日 09:00 - 17:30）</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <strong>中心官方收案邮箱：</strong>
                  <span className="font-mono">secretariat@dongcheng-adr.org.cn</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-900 shrink-0 mt-0.5" />
                <div>
                  <strong>现场接待时间：</strong>
                  <span>周一至周五 09:00 - 11:30，13:30 - 17:00（法定节假日除外）</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                <strong>🚇 公共交通指引：</strong>
                <br />
                乘坐地铁1号线或8号线至【王府井站】，自B出口出站向北步行约300米即达；
                <br />
                自驾前往可导航至“文娱法治大厦地下停车场”，大厦设有专供参调当事人的预约停车位。
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Scale className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold font-serif text-white">
                北京市东城区清朗文娱产业纠纷解决中心
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                以法治力量护航文化繁荣，以首善标准化解文娱纠纷。欢迎首都及全国文娱产业主体来电咨询、申请调解或商洽诉调合作。
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 space-y-1">
              <div>统一社会信用代码：52110101MJ0018899X</div>
              <div>民办非企业调解机构登记证号：京东民证字第089号</div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
