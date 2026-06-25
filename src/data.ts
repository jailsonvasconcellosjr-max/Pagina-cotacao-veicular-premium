import { Benefit, Review, FAQItem } from './types';

export const BENEFITS: Benefit[] = [
  {
    id: 'roubo_furto',
    title: 'Roubo, Furto e Incêndio',
    description: 'Cobertura integral em todo o território nacional. Se seu carro for roubado, furtado ou sofrer incêndio acidental, você recebe até 100% da tabela FIPE com agilidade incomparável.',
    badge: 'Proteção Total'
  },
  {
    id: 'reboque',
    title: 'Reboque Ilimitado 24h',
    description: 'Ficou na mão por colisão? O guincho conta com atendimento 24 horas por dia e quilometragem livre para remorcar seu automóvel até a concessionária ou oficina de sua inteira escolha.',
    badge: 'Colisão Coberta'
  },
  {
    id: 'terceiros',
    title: 'Até R$ 100.000,00 para Terceiros',
    description: 'Evite prejuízos milionários. Cobrimos danos físicos e materiais causados a outras pessoas e veículos em caso de colisão culposa onde você seja o responsável direto pelo sinistro.',
    badge: 'Alta Cobertura'
  },
  {
    id: 'carro_reserva',
    title: 'Até 120 dias de Carro Reserva',
    description: 'Sua rotina não pode parar! Garantimos um carro reserva completo novo (com ar condicionado, 4 portas e direção) por até 120 dias enquanto seu carro estiver no conserto credenciado.',
    badge: 'Carro Reserva Grátis'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev_1',
    name: 'Rodrigo Mendes',
    location: 'Sãp Paulo - SP',
    vehicle: 'Jeep Compass Limited 2022',
    rating: 5,
    text: 'Tive uma colisão lateral na Marginal Pinheiros num dia de chuva. O guincho chegou em 20 minutos e o processo de perícia e liberação do conserto do terceiro foi super transparente. Sem burocracia.',
    date: 'Há 2 semanas'
  },
  {
    id: 'rev_2',
    name: 'Alessandra Santos',
    location: 'Rio de Janeiro - RJ',
    vehicle: 'Chevrolet Tracker Premier 2021',
    rating: 5,
    text: 'Atendimento via WhatsApp espetacular! Fiz a minha cotação rápido, fechei a assinatura digital e já precisei de assistência para recarga de bateria essa semana. Funcionou perfeitamente e sem estresse.',
    date: 'Há 1 mês'
  },
  {
    id: 'rev_3',
    name: 'Juliana Vasconcelos',
    location: 'Curitiba - PR',
    vehicle: 'Toyota Corolla Altis 2020',
    rating: 5,
    text: 'A facilidade de não ter análise de perfil por motorista jovem ajudou muito meu filho que também dirige. O guincho ilimitado e a cobertura de terceiros dão uma paz surreal no trânsito!',
    date: 'Há 3 meses'
  },
  {
    id: 'rev_4',
    name: 'Mateus Oliveira',
    location: 'Belo Horizonte - MG',
    vehicle: 'Hyundai HB20 Evolution 2023',
    rating: 5,
    text: 'Sou motorista de aplicativo e não posso dar feedback negativo se as pessoas me dizem que recomendam. Fiquei 15 dias usando o carro reserva gratuito da PREMIUM Clube de Benefícios após uma colisão e consegui trabalhar normalmente.',
    date: 'Há 1 semana'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'O que é a PREMIUM Clube de Benefícios e como funciona?',
    answer: 'A PREMIUM Clube de Benefícios é uma associação líder em proteção veicular focada em oferecer as coberturas mais completas do mercado pelo melhor custo-benefício. Funcionamos no modelo de rateio administrado com fundo de reserva, o que torna a contribuição mensal até 40% mais em conta que o seguro convencional.',
    category: 'geral'
  },
  {
    id: 'faq_2',
    question: 'Há análise de perfil de condutor, idade ou gênero no preço?',
    answer: 'Não! Diferente das seguradoras que oneram o valor se houver jovens na casa ou dependendo do local de estacionamento, o cálculo da PREMIUM Clube de Benefícios leva em conta unicamente a Tabela FIPE do veículo e as coberturas adicionais selecionadas. Qualquer pessoa devidamente habilitada possui cobertura total ao guiar seu veículo.',
    category: 'geral'
  },
  {
    id: 'faq_3',
    question: 'Como funciona o Reboque Ilimitado?',
    answer: 'Em caso de colisão, capotamento, acidentes de trânsito ou sinistros cobertos, nossa central de assistência 24h envia um reboque para rebocar seu veículo de forma ILIMITADA em quilometragens até a sua garagem ou oficina de escolha. Não há custos adicionais nesses casos.',
    category: 'cobertura'
  },
  {
    id: 'faq_4',
    question: 'A PREMIUM Clube de Benefícios de fato cobre roubo, furto qualificado e incêndio?',
    answer: 'Sim, absolutamente! Se o seu veículo for furtado ou roubado e não for localizado, ou se for recuperado com perda total superior a 75%, indenizamos o valor integral de até 100% da tabela FIPE vigente. Incêndios decorrentes de acidentes também possuem cobertura.',
    category: 'cobertura'
  },
  {
    id: 'faq_5',
    question: 'Como posso solicitar e utilizar o Carro Reserva gratuito?',
    answer: 'Caso o reparo para sinistros cobertos (colisão de grande porte, etc) tenha prazo superior ao acordado de carência interna, você pode acionar seu benefício de Carro Reserva Grátis por até 120 dias, dependendo do plano, mantendo sua mobilidade diária intacta.',
    category: 'cobertura'
  },
  {
    id: 'faq_6',
    question: 'Motoristas de aplicativos (Uber/99) e taxistas podem aderir?',
    answer: 'Sim! Temos planos exclusivos focados em motoristas de aplicativo e frotistas comerciais. Oferecemos as mesmas vantagens, inclusive com carro reserva rápido para que você não perca dias valiosos de trabalho em caso de imprevisto ou batida.',
    category: 'financeiro'
  },
  {
    id: 'faq_7',
    question: 'Qual o tempo de carência após fechar o contrato?',
    answer: 'Nenhum! Após a realização e aprovação da vistoria digital simplificada e o pagamento da taxa de adesão, o seu veículo já passa a estar totalmente protegido em até 24 horas úteis, sem esperas irritantes ou carências de meses.',
    category: 'sinistro'
  }
];
