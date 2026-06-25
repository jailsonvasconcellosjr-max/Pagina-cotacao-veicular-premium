/**
 * Shared types for the Blitz Premium application.
 */

export interface LeadQuote {
  fullName: string;
  whatsapp: string;
  carModel: string;
  carPlate: string;
  carYear: string;
  needsReserveCar: boolean;
  estimatedPrice: number;
  packageType: 'Essential' | 'Silver' | 'Platinum';
  timestamp: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  badge?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'cobertura' | 'financeiro' | 'sinistro' | 'geral';
}
