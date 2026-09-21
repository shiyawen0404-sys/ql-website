import React, { useState } from 'react';
import { 
  MainNavTab, 
  ServicesSubTab, 
  MediatorsSubTab, 
  CasesResearchSubTab, 
  NewsSubTab, 
  HelpSubTab, 
  AboutSubTab,
  LoginRoleTab,
  Mediator,
  MediationCase
} from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuickFloatingBar } from './components/QuickFloatingBar';
import { LoginModal } from './components/LoginModal';
import { ConsultSecretariatModal } from './components/ConsultSecretariatModal';
import { SelfCheckModal } from './components/SelfCheckModal';

// Main Views
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { MediatorsView } from './views/MediatorsView';
import { CasesResearchView } from './views/CasesResearchView';
import { NewsView } from './views/NewsView';
import { HelpCenterView } from './views/HelpCenterView';
import { AboutUsView } from './views/AboutUsView';

export default function App() {
  // Navigation States
  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [servicesSubTab, setServicesSubTab] = useState<ServicesSubTab>('scope');
  const [mediatorsSubTab, setMediatorsSubTab] = useState<MediatorsSubTab>('roster');
  const [casesSubTab, setCasesSubTab] = useState<CasesResearchSubTab>('cases');
  const [newsSubTab, setNewsSubTab] = useState<NewsSubTab>('center-news');
  const [helpSubTab, setHelpSubTab] = useState<HelpSubTab>('faq');
  const [aboutSubTab, setAboutSubTab] = useState<AboutSubTab>('intro');

  // Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [loginInitialTab, setLoginInitialTab] = useState<LoginRoleTab>('party');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState<boolean>(false);
  const [isSelfCheckModalOpen, setIsSelfCheckModalOpen] = useState<boolean>(false);

  // Cross-view selection payloads
  const [selectedMediator, setSelectedMediator] = useState<Mediator | null>(null);
  const [selectedCase, setSelectedCase] = useState<MediationCase | null>(null);
  const [prefilledQueryCode, setPrefilledQueryCode] = useState<string>('');

  // Universal Tab Switcher
  const handleSelectTab = (tab: MainNavTab, subTab?: string) => {
    setActiveTab(tab);
    if (subTab) {
      if (tab === 'services') setServicesSubTab(subTab as ServicesSubTab);
      if (tab === 'mediators') setMediatorsSubTab(subTab as MediatorsSubTab);
      if (tab === 'cases') setCasesSubTab(subTab as CasesResearchSubTab);
      if (tab === 'news') setNewsSubTab(subTab as NewsSubTab);
      if (tab === 'help') setHelpSubTab(subTab as HelpSubTab);
      if (tab === 'about') setAboutSubTab(subTab as AboutSubTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open apply mediation flow
  const handleOpenApply = () => {
    setActiveTab('services');
    setServicesSubTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open case query flow
  const handleOpenQuery = (code?: string) => {
    setActiveTab('services');
    setServicesSubTab('query');
    if (code) {
      setPrefilledQueryCode(code);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open specific login tab
  const handleOpenLogin = (role: LoginRoleTab = 'party') => {
    setLoginInitialTab(role);
    setIsLoginModalOpen(true);
  };

  // Select Mediator from Home/Roster
  const handleSelectMediator = (med: Mediator) => {
    setSelectedMediator(med);
    setActiveTab('mediators');
    setMediatorsSubTab('roster');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Case from Home/Cases
  const handleSelectCase = (c: MediationCase) => {
    setSelectedCase(c);
    setActiveTab('cases');
    setCasesSubTab('cases');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased font-sans selection:bg-blue-900 selection:text-white">
      
      {/* 1. Header (Navigation + Right Sticky Actions: 申请调解, 案件查询, 登录及子菜单) */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenApply={handleOpenApply}
        onOpenQuery={() => handleOpenQuery()}
        onOpenLogin={handleOpenLogin}
      />

      {/* 2. Main Content Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onOpenApply={handleOpenApply}
            onOpenQuery={() => handleOpenQuery()}
            onOpenConsult={() => setIsConsultModalOpen(true)}
            onOpenSelfCheck={() => setIsSelfCheckModalOpen(true)}
            onSelectMediator={handleSelectMediator}
            onSelectCase={handleSelectCase}
          />
        )}

        {activeTab === 'services' && (
          <ServicesView
            initialSubTab={servicesSubTab}
            prefilledCode={prefilledQueryCode}
            onOpenConsult={() => setIsConsultModalOpen(true)}
          />
        )}

        {activeTab === 'mediators' && (
          <MediatorsView
            initialSubTab={mediatorsSubTab}
            selectedMediator={selectedMediator}
            onClearSelectedMediator={() => setSelectedMediator(null)}
            onOpenApplyForCase={handleOpenApply}
          />
        )}

        {activeTab === 'cases' && (
          <CasesResearchView
            initialSubTab={casesSubTab}
            selectedCase={selectedCase}
            onClearSelectedCase={() => setSelectedCase(null)}
            onOpenApply={handleOpenApply}
          />
        )}

        {activeTab === 'news' && (
          <NewsView
            initialSubTab={newsSubTab}
          />
        )}

        {activeTab === 'help' && (
          <HelpCenterView
            initialSubTab={helpSubTab}
            onOpenApply={handleOpenApply}
            onOpenSelfCheck={() => setIsSelfCheckModalOpen(true)}
          />
        )}

        {activeTab === 'about' && (
          <AboutUsView
            initialSubTab={aboutSubTab}
          />
        )}
      </main>

      {/* 3. Footer (With Trust Statistics & Secretariat Direct Line) */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenConsult={() => setIsConsultModalOpen(true)}
        onOpenApply={handleOpenApply}
      />

      {/* 4. Quick Floating Action Bar on the Right */}
      <QuickFloatingBar
        onOpenApply={handleOpenApply}
        onOpenQuery={() => handleOpenQuery()}
        onOpenLogin={handleOpenLogin}
        onOpenSelfCheck={() => setIsSelfCheckModalOpen(true)}
        onOpenConsult={() => setIsConsultModalOpen(true)}
      />

      {/* 5. Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        initialMode={loginInitialTab}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(_role: string, targetCaseCode?: string) => {
          setIsLoginModalOpen(false);
          if (targetCaseCode) {
            handleOpenQuery(targetCaseCode);
          }
        }}
      />

      <ConsultSecretariatModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />

      <SelfCheckModal
        isOpen={isSelfCheckModalOpen}
        onClose={() => setIsSelfCheckModalOpen(false)}
        onGoApply={handleOpenApply}
        onGoConsult={() => setIsConsultModalOpen(true)}
      />

    </div>
  );
}
