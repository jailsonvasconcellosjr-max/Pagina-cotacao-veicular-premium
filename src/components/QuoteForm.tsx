import React, { useState, useEffect } from 'react';
import { LeadQuote } from '../types';
import { Shield, Check, Send, AlertCircle, Sparkles, HelpCircle, Car, HelpCircle as HelpIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuoteFormProps {
  onSubmitSuccess: (quote: LeadQuote) => void;
}

export default function QuoteForm({ onSubmitSuccess }: QuoteFormProps) {
  // Form states
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carPlate, setCarPlate] = useState('');
  const [carYear, setCarYear] = useState('2020');
  const [carValueRange, setCarValueRange] = useState<number>(45000); // estimated FIPE in R$
  const [needsReserveCar, setNeedsReserveCar] = useState(true);
  const [packageType, setPackageType] = useState<'Essential' | 'Silver' | 'Platinum'>('Silver');

  // Interactive Live Calculation
  const [estimatedPrice, setEstimatedPrice] = useState(129.90);

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Masking functions
  const maskPhone = (val: string) => {
    // strip non-digits
    const clean = val.replace(/\D/g, '');
    if (clean.length === 0) return '';
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatsapp(maskPhone(e.target.value));
  };

  const maskPlate = (val: string) => {
    // Standard plates AAA-1234 or Mercosul AAA1A23
    // Keep only alphanumeric, convert to uppercase, limit to 7 chars
    const clean = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 7);
    
    // If old style, add dash after 3 chars
    if (clean.length > 3 && /^[A-Z]{3}[0-9]/.test(clean)) {
      // check if it fits the ABC-1234 old format
      if (clean.length >= 5 && /^[A-Z]{3}[0-9]{2}/.test(clean) && !/^[A-Z]{3}[0-9][A-Z]/.test(clean)) {
        return `${clean.slice(0, 3)}-${clean.slice(3)}`;
      }
    }
    return clean;
  };

  const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarPlate(maskPlate(e.target.value));
  };

  // Live estimate math (simulates an real backend insurance valuation logic)
  useEffect(() => {
    let base = 79.90; // Base monthly price
    
    // Add value based on car price FIPE
    const fipeFactor = carValueRange * 0.001; // 0.1% FIPE
    base += fipeFactor;

    // Package multiplier
    if (packageType === 'Essential') {
      base *= 0.85; // fewer details covered
    } else if (packageType === 'Platinum') {
      base *= 1.35; // maximum assistance, R$ 100k third party + comprehensive
    }

    // Car reserve cost
    if (needsReserveCar) {
      base += packageType === 'Platinum' ? 15.00 : 25.00;
    } else {
      // No extra charge, but let's give a discount
      base -= 10.00;
    }

    // Car year surcharge (older cars might cost a tiny bit more to maintain)
    const yearInt = parseInt(carYear);
    if (yearInt < 2012) {
      base += 30; // old vehicle
    } else if (yearInt < 2018) {
      base += 15;
    }

    setEstimatedPrice(parseFloat(base.toFixed(2)));
  }, [carValueRange, needsReserveCar, packageType, carYear]);

  // Validation before submission
  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = 'Nome completo é obrigatório';
    else if (fullName.trim().split(' ').length < 2) tempErrors.fullName = 'Digite seu nome e sobrenome';

    if (!whatsapp) tempErrors.whatsapp = 'WhatsApp de contato é obrigatório';
    else if (whatsapp.replace(/\D/g, '').length < 10) tempErrors.whatsapp = 'Insira um número de WhatsApp válido';

    if (!carModel.trim()) tempErrors.carModel = 'Modelo do veículo é obrigatório';
    
    if (!carPlate) tempErrors.carPlate = 'Placa do veículo é obrigatória';
    else {
      const cleanPlate = carPlate.replace(/[^A-Za-z0-9]/g, '');
      if (cleanPlate.length !== 7) tempErrors.carPlate = 'Placa inválida (deve ter 7 caracteres)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate a secure, beautiful processing time
    setTimeout(() => {
      const liveQuote: LeadQuote = {
        fullName: fullName.trim(),
        whatsapp,
        carModel: carModel.trim(),
        carPlate: carPlate.replace(/[^A-Za-z0-9]/g, '').toUpperCase(),
        carYear,
        needsReserveCar,
        estimatedPrice,
        packageType,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setIsSubmitting(false);
      onSubmitSuccess(liveQuote);
    }, 1200);
  };

  // Convert number to currency BRL
  const formatBRL = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="cotador-form-container">
      {/* Head */}
      <div className="bg-brand-blue-dark p-6 text-white relative">
        <div className="absolute right-4 top-4 bg-yellow-500/10 text-yellow-500 text-xs px-2.5 py-1 rounded-full font-semibold border border-yellow-500/20 flex items-center gap-1.5 animate-pulse">
          <Sparkles className="w-3 animate-spin duration-300" />
          Preço Especial Hoje
        </div>
        <h3 className="text-xl font-display font-bold">Simulação Rápida Grátis</h3>
        <p className="text-slate-300 text-sm mt-1">
          Preencha abaixo e veja o seu valor aproximado em tempo real!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Step 1: Personal info */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" htmlFor="nome">
            1. Seus Dados de Contato
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                id="quote-fullName"
                type="text"
                placeholder="Nome Completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none ${
                  errors.fullName ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-blue'
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 text-red-500" />
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <input
                id="quote-whatsapp"
                type="text"
                placeholder="WhatsApp (com DDD)"
                value={whatsapp}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none ${
                  errors.whatsapp ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-blue'
                }`}
              />
              {errors.whatsapp && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 text-red-500" />
                  {errors.whatsapp}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Step 2: Car details */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2" htmlFor="veiculo">
            2. Informações do Seu Carro
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1.5">
              <input
                id="quote-carModel"
                type="text"
                placeholder="Ex: Chevrolet Onix 1.0"
                value={carModel}
                onChange={(e) => setCarModel(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border text-sm transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none ${
                  errors.carModel ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-blue'
                }`}
              />
              {errors.carModel && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 text-red-500" />
                  {errors.carModel}
                </p>
              )}
            </div>

            <div>
              <input
                id="quote-carPlate"
                type="text"
                placeholder="Placa (Ex: ABC-1234)"
                value={carPlate}
                onChange={handlePlateChange}
                className={`w-full px-4 py-3 rounded-lg border text-sm font-mono tracking-wider transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none ${
                  errors.carPlate ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-brand-blue'
                }`}
              />
              {errors.carPlate && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 text-red-500" />
                  {errors.carPlate}
                </p>
              )}
            </div>

            <div>
              <select
                id="quote-carYear"
                value={carYear}
                onChange={(e) => setCarYear(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm transition-all bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-brand-blue/30 outline-none focus:border-brand-blue cursor-pointer"
              >
                {Array.from({ length: 22 }, (_, i) => {
                  const yr = String(2027 - i);
                  return <option key={yr} value={yr}>{yr}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Step 3: FIPE Value & Package Choice slider */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              3. Valor de Mercado Estimado (Tabela FIPE)
            </span>
            <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full select-none">
              {formatBRL(carValueRange)}
            </span>
          </div>
          <input
            id="quote-fipe-slider"
            type="range"
            min="15000"
            max="180000"
            step="5000"
            value={carValueRange}
            onChange={(e) => setCarValueRange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>R$ 15 mil</span>
            <span>R$ 80 mil</span>
            <span>R$ 150 mil+</span>
          </div>
        </div>

        {/* Package Radio & Options */}
        <div className="grid grid-cols-3 gap-3">
          {(['Essential', 'Silver', 'Platinum'] as const).map((pkg) => (
            <button
              id={`quote-pkg-${pkg}`}
              type="button"
              key={pkg}
              onClick={() => setPackageType(pkg)}
              className={`p-3 rounded-xl border text-center transition-all ${
                packageType === pkg
                  ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-sm ring-1 ring-brand-blue'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="text-sm font-bold">{pkg === 'Essential' ? 'Básico' : pkg === 'Silver' ? 'Especial' : 'Platinum'}</div>
              <div className="text-[10px] mt-0.5 opacity-80">
                {pkg === 'Essential' ? 'Essencial' : pkg === 'Silver' ? 'Mais Vendido' : 'Proteção Elite'}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed custom options */}
        <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-slate-100">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              id="quote-reserveCar"
              type="checkbox"
              checked={needsReserveCar}
              onChange={(e) => setNeedsReserveCar(e.target.checked)}
              className="mt-1 w-4 h-4 text-brand-blue bg-gray-100 border-gray-300 rounded focus:ring-brand-blue focus:ring-2 accent-brand-blue"
            />
            <div>
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                Carro Reserva Grátis por até 120 dias
                <span className="bg-emerald-500/10 text-emerald-600 text-[10px] uppercase font-bold py-0.5 px-1.5 rounded">
                  Recomendado
                </span>
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Garante que sua rotina nunca pare enquanto o automóvel passa por vistorias ou manutenções longas.
              </p>
            </div>
          </label>
        </div>

        {/* Real-time calculated price visualization */}
        <div className="mt-6 border-t border-slate-150 pt-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">
              Mensalidade Estimada:
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xs font-display text-slate-500 font-bold">R$</span>
              <span className="text-3xl font-display font-bold text-brand-blue-dark">
                {Math.floor(estimatedPrice)}
              </span>
              <span className="text-sm font-bold text-slate-500">
                ,{String((estimatedPrice % 1).toFixed(2)).split('.')[1]}
              </span>
              <span className="text-xs font-semibold text-slate-400 ml-1">/mês</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full block text-center uppercase tracking-wide">
              Pronto a Ativar
            </span>
            <span className="text-[10px] text-slate-400 block mt-1">Taxa de adesão inclusa</span>
          </div>
        </div>

        {/* Active quote guarantees */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Check className="w-3.5 text-emerald-500 shrink-0" />
            <span>Sem franquia abusiva ou consulta ao SPC/Serasa</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Check className="w-3.5 text-emerald-500 shrink-0" />
            <span>Sem análise complexa de perfil do condutor</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          id="btn-submit-quote"
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Calculando Valores...
            </span>
          ) : (
            <>
              Solicitar Cotação no WhatsApp
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
