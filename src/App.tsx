/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Flame, 
  ShieldAlert, 
  Truck, 
  Car, 
  Clock, 
  Phone, 
  MessageSquare, 
  Plus, 
  Minus, 
  Check, 
  Star, 
  CheckCircle2, 
  MapPin, 
  HelpCircle, 
  Send, 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp,
  FileText,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Shared data and types
import { LeadQuote } from './types';
import { BENEFITS, REVIEWS, FAQS } from './data';

// Modular Subcomponents
import QuoteForm from './components/QuoteForm';
import ActiveQuoteResult from './components/ActiveQuoteResult';
import Logo from './components/Logo';

// Hero image import
import heroImage from './assets/images/blitz_premium_hero_1781283113716.jpg';

export default function App() {
  // Navigation states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lead / Quote States
  const [activeQuote, setActiveQuote] = useState<LeadQuote | null>(null);
  const [historicalQuotes, setHistoricalQuotes] = useState<LeadQuote[]>([]);
  
  // FAQ accordion active state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq_1');
  const [activeFaqTab, setActiveFaqTab] = useState<'todos' | 'cobertura' | 'geral' | 'sinistro' | 'financeiro'>('todos');

  // Load user's historic simulation from localstorage if any (keeps it authentic!)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('premium_quotes');
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistoricalQuotes(parsed);
      }
    } catch (e) {
      console.error("Local storage not readable:", e);
    }
  }, []);

  const handleQuoteSubmission = (newQuote: LeadQuote) => {
    setActiveQuote(newQuote);
    
    // Save to local list of leads
    const updated = [newQuote, ...historicalQuotes].slice(0, 5); // limit to last 5
    setHistoricalQuotes(updated);
    try {
      localStorage.setItem('premium_quotes', JSON.stringify(updated));
    } catch (e) {
      console.error("Local storage update failed:", e);
    }

    // Scroll smoothly to success block
    setTimeout(() => {
      const targetElement = document.getElementById('cotador-section');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleResetQuote = () => {
    setActiveQuote(null);
  };

  // Helper to scroll to element
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter FAQs based on tab
  const filteredFAQs = FAQS.filter(item => {
    if (activeFaqTab === 'todos') return true;
    return item.category === activeFaqTab;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-brand-orange selection:text-white overflow-x-hidden">
      
      {/* 1. Header Notification Banner */}
      <div className="bg-brand-blue-dark text-white text-xs py-2 px-4 text-center font-medium relative z-50 border-b border-white/5 flex items-center justify-center gap-2">
        <span className="bg-brand-orange text-white text-[10px] uppercase font-bold py-0.5 px-2 rounded-full animate-bounce shrink-0">
          Super Bônus de Hoje
        </span>
        <span className="truncate">
          ⚡ Contate via WhatsApp hoje e ganhe <strong>120 dias de Carro Reserva Grátis</strong> + Proteção estendida de Terceiros!
        </span>
      </div>

      {/* 2. Primary Navigation Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 z-40 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo with chevron brand identifier */}
          <div className="cursor-pointer font-sans" onClick={() => scrollTo('hero')}>
            <Logo />
          </div>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollTo('beneficios')} className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition cursor-pointer">
              Benefícios
            </button>
            <button onClick={() => scrollTo('como-funciona')} className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition cursor-pointer">
              Como Funciona
            </button>
            <button onClick={() => scrollTo('depoimentos')} className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition cursor-pointer">
              Depoimentos
            </button>
            <button onClick={() => scrollTo('faq')} className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition cursor-pointer">
              Dúvidas
            </button>
          </nav>

          {/* Contact Actions for Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <a 
              href="tel:08006096779" 
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition"
              id="header-phone-cta"
            >
              <Phone className="w-3.5 h-3.5 text-brand-orange" />
              <span>0800 609 6779</span>
            </a>
            <button
              onClick={() => scrollTo('cotador-section')}
              id="header-quote-button"
              className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold text-xs py-2.5 px-4 rounded-lg shadow-sm transition active:scale-95 cursor-pointer flex items-center gap-1"
            >
              Cotação Online
              <span className="animate-ping bg-brand-orange w-1.5 h-1.5 rounded-full ml-1" />
            </button>
          </div>

          {/* Mobile Sandwich menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-brand-blue transition"
            id="mobile-menu-toggle"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-slate-100 bg-white overflow-hidden"
              id="mobile-navigation-drawer"
            >
              <div className="px-4 py-4 space-y-3">
                <button 
                  onClick={() => scrollTo('beneficios')} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 text-sm font-semibold text-slate-700"
                >
                  Benefícios Completos
                </button>
                <button 
                  onClick={() => scrollTo('como-funciona')} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 text-sm font-semibold text-slate-700"
                >
                  Como Funciona a Vistoria
                </button>
                <button 
                  onClick={() => scrollTo('depoimentos')} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 text-sm font-semibold text-slate-700"
                >
                  Depoimentos de Clientes
                </button>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="block w-full text-left py-2.5 px-3 rounded-lg hover:bg-slate-50 text-sm font-semibold text-slate-700"
                >
                  Perguntas Frequentes
                </button>
                <div className="border-t border-slate-100 pt-3 flex flex-col gap-2.5">
                  <a 
                    href="tel:08006096779" 
                    className="flex items-center gap-2 p-2 justify-center rounded-lg bg-slate-50 text-sm font-semibold text-slate-700"
                  >
                    <Phone className="w-4 h-4 text-brand-orange" />
                    Ligação Gratuita: 0800 609 6779
                  </a>
                  <button
                    onClick={() => scrollTo('cotador-section')}
                    className="w-full text-center bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-3 rounded-lg text-sm flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Simular Cotação WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Hero Section (Visual Slogans & Active Live Simulation) */}
      <section className="bg-gradient-to-b from-slate-100 to-slate-50 py-12 md:py-20 border-b border-slate-150" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Propositions */}
          <div className="lg:col-span-6 space-y-6 md:pr-4" id="hero-value-proposition">
            
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs uppercase font-extrabold px-3 py-1.5 rounded-full select-none">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Associação Inteiramente Registrada</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-brand-blue-dark tracking-tight leading-none">
              Seu patrimônio <br />
              <span className="text-brand-orange relative inline-block">
                vale muito!
                <svg className="absolute left-0 bottom-[-6px] w-full h-2 text-brand-orange/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="6" fill="transparent" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Proteja seu veículo hoje mesmo com condições especiais exclusivas. Tenha o melhor serviço de <strong>assistência 24h nacional</strong> sem burocracia, sem consulta ao SPC/Serasa e com adesão digital aprovada em minutos.
            </p>

            {/* List of high-fidelity guarantees showing the card details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Flame className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-slate-700 block">Roubo, Furto &amp; Incêndio</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Sem franquia nesses sinistros</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
                  <Truck className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-slate-700 block">Reboque Ilimitado</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Em colisões, guincho sem limite Km</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-slate-700 block">R$ 100.000 Terceiros</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Evite prejuízos corporais ou materiais</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center shrink-0 border border-rose-100">
                  <Car className="w-4 h-4 text-rose-600" />
                </div>
                <div>
                  <span className="font-semibold text-xs text-slate-700 block">Carro Reserva Grátis</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">Mobilidade por até 120 dias grátis</span>
                </div>
              </div>
            </div>

            {/* Quick stats for validation */}
            <div className="flex gap-6 items-center text-slate-500 pt-3">
              <div>
                <span className="font-display font-extrabold text-2xl text-brand-blue-dark block">+32 mil</span>
                <span className="text-[11px] text-slate-400 font-medium">Carros Protegidos</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="font-display font-extrabold text-2xl text-brand-blue-dark block">18 minutos</span>
                <span className="text-[11px] text-slate-400 font-medium">Tempo Médio de Guincho</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="font-display font-extrabold text-2xl text-emerald-600 block">★ 4.9/5</span>
                <span className="text-[11px] text-slate-400 font-medium">Nota no ReclameAQUI</span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Form Module */}
          <div className="lg:col-span-6" id="cotador-section">
            <AnimatePresence mode="wait">
              {!activeQuote ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <QuoteForm onSubmitSuccess={handleQuoteSubmission} />
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ActiveQuoteResult quote={activeQuote} onReset={handleResetQuote} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. Visual proof & Real image Section with Card Elements Overlay */}
      <section className="py-12 bg-white border-b border-slate-100" id="visual-overview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-brand-blue-dark rounded-3xl overflow-hidden shadow-2xl relative">
            
            {/* Dark Graphic Accent */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-blue opacity-5 pointer-events-none" />

            {/* Left Texts */}
            <div className="p-8 sm:p-12 lg:col-span-6 space-y-6 text-white">
              <span className="bg-brand-orange text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-full tracking-wider inline-block">
                Qualidade Certificada
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight">
                A melhor infraestrutura de proteção veicular do Brasil agora ao seu alcance
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Toda a assistência oferecida pela PREMIUM Clube de Benefícios foi desenhada para emular o conforto de planos corporativos de elite. Não deixe que furtos repentino, pane de bateria ou acidentes com terceiros arruínem suas finanças familiares.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 text-white stroke-[4]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">Central de Atendimento Própria</span>
                    <span className="text-xs text-slate-400 block mt-0.5 font-light">Disponível por WhatsApp ou ligação 24 horas por dia, inclusive domingos.</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-5 h-5 bg-brand-orange rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 text-white stroke-[4]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm block">Vistoria 100% Mobile (App de Vistoria Oficial)</span>
                    <span className="text-xs text-slate-400 block mt-0.5 font-light">Nada de mecânicos analisando ou agendando visitas chatas. Fotografe no celular e ative.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphics - Showcasing the generated photorealistic vehicle safety image */}
            <div className="lg:col-span-6 h-full p-6 lg:p-0 relative flex items-center justify-center border-t lg:border-t-0 lg:border-l border-white/10 [min-height:360px]">
              <div className="relative w-full h-[360px] lg:h-[480px] overflow-hidden rounded-2xl lg:rounded-none">
                <img 
                  src={heroImage} 
                  alt="Blitz Premium Veicular Protegido" 
                  className="w-full h-full object-cover select-none relative z-10"
                  referrerPolicy="no-referrer"
                />
                
                {/* Custom Overlay Float Ribbon simulating real insurance badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-lg p-4 rounded-xl z-20 border border-slate-100 flex items-center gap-3.5 max-w-sm animate-pulse-slow">
                  <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="font-display font-semibold text-xs text-slate-900 block">Selo de Proteção Ativa</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">Veículo Monitorado e Assegurado Nacional</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Benefits Deep-Dive / Features Details */}
      <section className="py-16 md:py-24 bg-slate-50" id="beneficios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-3 py-1 rounded-full">
              Sua Segurança em Primeiro Lugar
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-blue-dark tracking-tight">
              Diferenciais da Proteção PREMIUM Clube de Benefícios
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              Veja por que somos a escolha número #1 de quem cuida de carros no Brasil, superando seguradoras tradicionais em todos os aspectos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="coberturas-cards-grid">
            {BENEFITS.map((benefit, index) => {
              // Custom icons for benefits
              const iconMap = [
                <Flame className="w-6 h-6 text-brand-orange" />,
                <Truck className="w-6 h-6 text-brand-blue" />,
                <ShieldCheck className="w-6 h-6 text-indigo-600" />,
                <Car className="w-6 h-6 text-emerald-600" />
              ];
              const bgColors = [
                'bg-orange-50 border-orange-100',
                'bg-blue-50 border-blue-100',
                'bg-indigo-50 border-indigo-100',
                'bg-emerald-50 border-emerald-100'
              ];

              return (
                <div 
                  key={benefit.id}
                  id={`benefit-card-${benefit.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColors[index]} border shrink-0 transition-transform group-hover:scale-105`}>
                      {iconMap[index]}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                      {benefit.badge}
                    </span>
                    <h3 className="text-lg font-display font-bold text-slate-800 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Small line to represent progress */}
                  <div className="w-10 h-1 bg-brand-blue/10 rounded-full mt-6 group-hover:bg-brand-orange group-hover:w-full transition-all duration-300" />
                </div>
              );
            })}
          </div>

          {/* Quick Comparison Box */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-150 p-6 md:p-8 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 font-display mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-orange" />
              Comparativo Simples: PREMIUM Clube de Benefícios vs. Seguros Comuns
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4">Características</th>
                    <th className="py-3 px-4 text-brand-blue bg-blue-50/50">PREMIUM Clube de Benefícios</th>
                    <th className="py-3 px-4">Seguro Tradicional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Análise de CEP / Idade</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold bg-blue-50/30 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Isento (Foca só no Carro)
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">Punições de preço severas</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Burocracia de Contrato</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold bg-blue-50/30">
                      Vistoria digital em 5 minutos
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">Análises de dias e laudos físicos</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Consulta SPC/SERASA</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold bg-blue-50/30">
                      Liberado para qualquer CPF
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">Recusa imediata se negativado</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Franquia em Roubo/Furto</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold bg-blue-50/30">
                      Isento 100%
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">Cobranças surpresas frequentes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. customer testimonials section */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-150" id="depoimentos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-black text-brand-blue uppercase tracking-wider bg-brand-blue/10 px-3 py-1 rounded-full">
              Satisfação Real
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-blue-dark tracking-tight">
              Histórias de Quem Confia na PREMIUM
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              Damos voz a quem de fato já precisou usar nossos serviços no pior momento. Veja comentários reais de nossos milhares de associados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="testimonials-box-grid">
            {REVIEWS.map((review) => (
              <div 
                key={review.id}
                id={`testimonial-card-${review.id}`}
                className="bg-slate-50/50 rounded-2xl p-6 md:p-8 border border-slate-100 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>

                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "{review.text}"
                  </p>
                </div>

                <div className="border-t border-slate-200 mt-6 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-blue-dark text-white font-bold text-xs uppercase rounded-full flex items-center justify-center">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="font-semibold text-sm text-slate-800 block">
                        {review.name}
                      </span>
                      <span className="text-xs text-slate-400 block mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 text-slate-400" />
                        {review.location}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="bg-slate-250 px-2 py-0.5 rounded text-[10px] text-slate-500 block font-semibold border border-slate-300">
                      {review.vehicle}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Customer Support CTA card */}
          <div className="mt-12 bg-gradient-to-r from-brand-blue-dark to-brand-blue p-6 md:p-10 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 shadow-xl">
            <div className="space-y-2">
              <h4 className="text-xl font-bold font-display">Deseja falar diretamente com nossa equipe de suporte?</h4>
              <p className="text-slate-300 text-xs max-w-xl">
                Nossos consultores estão online agora para tirar dúvidas específicas sobre as condições para frotistas comerciais, táxis de luxo ou carros de colecionadores.
              </p>
            </div>
            <a 
              href="https://api.whatsapp.com/send?phone=5571988153822&text=Olá! Gostaria de falar com um consultor da PREMIUM Clube de Benefícios."
              target="_blank"
              rel="noopener noreferrer"
              id="cta-whatsapp-testimonial-banner"
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-bold text-sm py-3.5 px-6 rounded-xl transition duration-200 shadow-lg text-center flex items-center justify-center gap-1.5 py-4 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Chamar Consultor
            </a>
          </div>

        </div>
      </section>

      {/* 7. Detailed FAQ Accordion Component */}
      <section className="py-16 md:py-24 bg-slate-50" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="text-xs font-black text-brand-orange uppercase tracking-wider bg-brand-orange/10 px-3 py-1 rounded-full">
              Central de Respostas
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-blue-dark tracking-tight">
              Dúvidas Frequentes Respondidas
            </h2>
            <p className="text-sm text-slate-500">
              Tem alguma pergunta específica sobre a validade da proteção? Use nossos filtros rápidos ou pesquise abaixo.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8" id="faq-category-filters">
            {(['todos', 'geral', 'cobertura', 'financeiro', 'sinistro'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFaqTab(cat);
                  // Auto close FAQ when changing tabs to prevent visual overflow
                  setOpenFaqId(null);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeFaqTab === cat
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                }`}
              >
                {cat === 'todos' ? 'Ver Todas' : cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5" id="faq-accordion-list">
            <AnimatePresence initial={false}>
              {filteredFAQs.map((faq) => {
                const isOpen = openFaqId === faq.id;

                return (
                  <div 
                    key={faq.id}
                    className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-xs transition-shadow duration-200"
                  >
                    <button
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      className="w-full p-5 text-left font-semibold text-slate-800 text-sm md:text-base flex justify-between items-center gap-4 hover:bg-slate-50/50 transition duration-150"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-blue shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-slate-100 bg-slate-50/30 overflow-hidden"
                        >
                          <div className="p-5 text-slate-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 8. Session Historic Simulations Log Drawer (Hidden if empty, or shown inline above footer) */}
      {historicalQuotes.length > 0 && (
        <section className="py-10 bg-slate-100 border-t border-slate-200" id="leads-history">
          <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-1.5 justify-center sm:justify-start">
              <FileText className="w-3.5 h-3.5 text-brand-blue" />
              Suas Simulações Recentes nesta Sessão
            </h4>
            <div className="space-y-2">
              {historicalQuotes.map((hq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">{hq.fullName}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {hq.carModel} • Placa {hq.carPlate} • Plano {hq.packageType === 'Essential' ? 'Básico' : hq.packageType === 'Silver' ? 'Especial' : 'Platinum'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-medium">Preço Mensal</span>
                      <span className="text-sm font-bold text-brand-blue-dark">R$ {hq.estimatedPrice.toFixed(2).replace('.', ',')}</span>
                    </div>

                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => setActiveQuote(hq)}
                        className="bg-brand-blue hover:bg-brand-blue-light text-white font-bold py-1.5 px-3 rounded-lg text-[10px] transition"
                      >
                        Reabrir Orçamento
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Corporate Footer */}
      <footer className="bg-brand-blue-dark text-white py-12 border-t border-white/5 relative z-10" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={() => scrollTo('hero')}>
              <Logo lightTheme={true} sizeMultiplier={0.95} />
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed">
              Constituída sob as diretrizes do Código Civil brasileiro e amparada pela Constituição Federal (art. 5º, XVII, XVIII, XIX, XX e XXI), garantimos total segurança de rateio sem burocracias comerciais de terceiros.
            </p>

            <div className="flex gap-2">
              <span className="bg-white/10 text-slate-300 text-[10px] py-1 px-3 rounded-md font-bold">
                CNPJ: 12.345.678/0001-90
              </span>
              <span className="bg-white/10 text-slate-300 text-[10px] py-1 px-3 rounded-md font-bold">
                Susep: Isento (Rateio Livre)
              </span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 space-y-3 text-xs md:pl-6">
            <span className="text-slate-200 font-bold uppercase tracking-wider block mb-1">Navegação Rápida</span>
            <button onClick={() => scrollTo('hero')} className="block text-slate-400 hover:text-white transition py-0.5 cursor-pointer">Simulação On-line</button>
            <button onClick={() => scrollTo('beneficios')} className="block text-slate-400 hover:text-white transition py-0.5 cursor-pointer">Benefícios do Plano</button>
            <button onClick={() => scrollTo('depoimentos')} className="block text-slate-400 hover:text-white transition py-0.5 cursor-pointer">Depoimentos Reais</button>
            <button onClick={() => scrollTo('faq')} className="block text-slate-400 hover:text-white transition py-0.5 cursor-pointer">FAQ Respondida</button>
          </div>

          {/* Legal / Policy */}
          <div className="md:col-span-5 space-y-3 text-xs">
            <span className="text-slate-200 font-bold uppercase tracking-wider block mb-1">Nota Legal Importante</span>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              A PREMIUM Clube de Benefícios não realiza contratos de seguro de perfil rígido. Somos uma associação civil de benefícios mútuos (cooperativismo privado autorregulamentado), onde os prejuízos com automóveis são divididos em fundo de rateio simples. Esse modelo confere ampla economia mensal e dispensa consulta de score.
            </p>
            <p className="text-slate-450 text-[10px] text-slate-500 italic">
              © 2026 PREMIUM Clube de Benefícios - Todos os direitos reservados. Feito com amor com foco em segurança veicular.
            </p>
          </div>

        </div>

        {/* Flat bottom line */}
        <div className="border-t border-white/5 pt-6 text-center text-slate-500 text-[10px] max-w-7xl mx-auto px-4">
          PREMIUM Clube de Benefícios, Slogan "Seu patrimônio vale muito!" e layouts protegidos sob o regime de direitos intelectuais de marca.
        </div>
      </footer>

      {/* Floating Fast WhatsApp Widget Action button (highly responsive and useful) */}
      <a 
        href="https://api.whatsapp.com/send?phone=5571988153822&text=Olá! Estava navegando no site PREMIUM Clube de Benefícios e gostaria de tirar uma dúvida sobre a proteção."
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-widget"
        className="fixed bottom-6 right-6 bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/20 transition-all z-50 duration-300 hover:scale-110 active:scale-95 group shrink-0"
        aria-label="Fale conosco no WhatsApp"
      >
        <MessageSquare className="w-6 h-6 animate-pulse" />
        
        {/* Tiny float label indicator showing "Fale Conosco" on Hover */}
        <span className="absolute right-16 bg-brand-blue-dark text-white text-[11px] font-bold py-1 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-sm border border-slate-700">
          Chamar no WhatsApp (Online)
        </span>
      </a>

    </div>
  );
}
