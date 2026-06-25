import React from 'react';
import { LeadQuote } from '../types';
import { CheckCircle2, ShieldCheck, Printer, Send, MessageSquare, ArrowLeft, ClipboardCheck, Sparkles, Check, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

interface ActiveQuoteResultProps {
  quote: LeadQuote;
  onReset: () => void;
}

export default function ActiveQuoteResult({ quote, onReset }: ActiveQuoteResultProps) {
  
  // Format price helper
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Construct a beautiful WhatsApp click-to-chat API Link
  const getWhatsAppLink = () => {
    const defaultConsultantNumber = '5571988153822'; // Official company number provided by user
    const textMessage = `Olá, equipe PREMIUM Clube de Benefícios! Acabei de realizar uma simulação no site e gostaria de confirmar minha adesão.

📋 *DADOS DA COTAÇÃO PREMIUM:*
👤 *Nome completo:* ${quote.fullName}
📱 *WhatsApp:* ${quote.whatsapp}
🚗 *Veículo:* ${quote.carModel} (${quote.carYear})
🔢 *Placa:* ${quote.carPlate}
🛡️ *Plano:* ${quote.packageType === 'Essential' ? 'Básico (Essencial)' : quote.packageType === 'Silver' ? 'Especial (Silver)' : 'Platinum (Elite)'}
🚗 *Carro Reserva:* ${quote.needsReserveCar ? 'Incluso (Até 120 dias)' : 'Não incluso'}
💰 *Mensalidade Calculada:* ${formatBRL(quote.estimatedPrice)}/mês

Aguardando contato para vistoria e liberação da minha cobertura!`;

    return `https://api.whatsapp.com/send?phone=${defaultConsultantNumber}&text=${encodeURIComponent(textMessage)}`;
  };

  // Copy details helper
  const handleCopyDetails = () => {
    const rawText = `📋 COTAÇÃO PREMIUM Clube de Benefícios
Nome: ${quote.fullName}
WhatsApp: ${quote.whatsapp}
Carro: ${quote.carModel} (${quote.carYear})
Placa: ${quote.carPlate}
Plano: ${quote.packageType}
Preço: ${formatBRL(quote.estimatedPrice)}/mês`;
    
    navigator.clipboard.writeText(rawText);
    alert('Resumo da cotação copiado para a área de transferência!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-w-2xl mx-auto"
      id="cotador-success-panel"
    >
      {/* Visual Success Accent */}
      <div className="bg-emerald-600 p-8 text-center text-white relative">
        <div className="absolute right-4 top-4 bg-white/10 text-white text-xs px-2.5 py-1 rounded-full font-semibold border border-white/20">
          Código: PREMIUM-{Math.floor(Math.random() * 90000) + 10000}
        </div>
        <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border-2 border-white/20">
          <CheckCircle2 className="w-10 h-10 text-white animate-bounce" />
        </div>
        <h3 className="text-2xl font-display font-semibold">Simulação Concluída!</h3>
        <p className="text-emerald-100 text-sm mt-1 max-w-md mx-auto">
          Pronto, {quote.fullName.split(' ')[0]}! O seu automóvel é elegível para proteção PREMIUM Clube de Benefícios. Veja abaixo o seu orçamento:
        </p>
      </div>

      <div className="p-8 space-y-6">
        
        {/* Invoice styled layout breakdown */}
        <div className="bg-slate-50 border border-slate-150 rounded-xl p-6 relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-brand-blue" />
          </div>

          <div className="border-b border-dashed border-slate-200 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-slate-800 text-lg uppercase">PREMIUM CLUBE DE BENEFÍCIOS ADESÃO</span>
              <span className="text-xs text-slate-400 font-mono">Gerado hoje às {quote.timestamp}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Modalidade: Proteção Veicular Pronta Ativação</p>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <span className="text-xs text-slate-400 block uppercase font-semibold">Associado</span>
              <span className="font-semibold text-slate-700">{quote.fullName}</span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block uppercase font-semibold">WhatsApp</span>
              <span className="font-semibold text-slate-700">{quote.whatsapp}</span>
            </div>
            
            <div className="border-t border-slate-100 pt-3 mt-1">
              <span className="text-xs text-slate-400 block uppercase font-semibold">Carro Simulado</span>
              <span className="font-semibold text-slate-700">{quote.carModel} <span className="text-xs bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-mono font-bold">{quote.carYear}</span></span>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-1">
              <span className="text-xs text-slate-400 block uppercase font-semibold">Placa Registrada</span>
              <span className="font-mono font-bold text-brand-blue bg-blue-50 px-2 py-0.5 rounded text-xs select-all text-center tracking-wider inline-block">
                {quote.carPlate}
              </span>
            </div>
            
            <div className="border-t border-slate-150 pt-3 col-span-2 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-semibold">Categoria Escolhida</span>
                <span className="font-bold text-slate-700 flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    quote.packageType === 'Essential' ? 'bg-amber-400' : quote.packageType === 'Silver' ? 'bg-blue-500' : 'bg-purple-600 animate-pulse'
                  }`} />
                  {quote.packageType === 'Essential' ? 'Plano Bronze Cobertura Essencial' : quote.packageType === 'Silver' ? 'Plano Silver Cobertura Especial' : 'Plano Platinum Cobertura Elite'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block uppercase font-semibold">Valor Final Estimado</span>
                <span className="text-2xl font-bold font-display text-brand-blue-dark">
                  {formatBRL(quote.estimatedPrice)}
                  <span className="text-xs text-slate-400 font-normal">/mês</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Informative next steps */}
        <div className="space-y-3.5 bg-sky-50 border border-sky-100 rounded-xl p-5">
          <h4 className="text-sm font-bold text-brand-blue-dark flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-orange animate-spin duration-1000" />
            O que acontece agora?
          </h4>
          <ol className="text-xs text-sky-950 space-y-2 list-decimal list-inside pl-1">
            <li>Faça o envio da cotação para nossa central pelo link de WhatsApp abaixo.</li>
            <li>Um consultor especializado PREMIUM Clube de Benefícios validará os dados do seu automóvel.</li>
            <li>Agendaremos a vistoria digital simples (feita pelo seu próprio celular sem burocracias).</li>
            <li>Pronto! Você paga a adesão leve e seu carro estará protegido em até 24h.</li>
          </ol>
        </div>

        {/* Buttons section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            id="quote-success-whatsapp-button"
            className="flex-1 bg-brand-orange hover:bg-brand-orange-light text-white text-center font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            Enviar Cotação por WhatsApp
          </a>

          <button
            onClick={handleCopyDetails}
            id="quote-success-copy-button"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ClipboardCheck className="w-4 h-4 text-slate-500" />
            Copiar Resumo
          </button>
        </div>

        {/* Secondary controls to return */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-5 text-xs text-slate-400 font-medium">
          <button
            onClick={onReset}
            id="quote-success-back-button"
            className="flex items-center gap-1.5 hover:text-brand-blue-dark transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Fazer Nova Simulação
          </button>
          
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-1.5 hover:text-slate-700 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir Recibo
          </button>
        </div>

      </div>
    </motion.div>
  );
}
