/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Clock, MapPin, Sparkles, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function AboutContact() {
  const WHATSAPP_API_URL = "https://api.whatsapp.com/send?phone=5582999999999&text=Olá JP! Vi o site da barbearia e gostaria de tirar uma dúvida.";

  return (
    <section id="sobre" className="py-20 bg-zinc-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Dynamic features block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-6 bg-zinc-950 rounded border border-zinc-800 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Qualidade Garantida</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Utilizamos os melhores produtos do mercado para cabelo e barba, mantendo o padrão elevado.
              </p>
            </div>
          </div>
          <div className="p-6 bg-zinc-950 rounded border border-zinc-800 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Pontualidade no Atendimento</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Respeitamos o seu tempo. Agendou, chegou, cortou. Sem filas de espera intermináveis.
              </p>
            </div>
          </div>
          <div className="p-6 bg-zinc-950 rounded border border-zinc-800 flex items-start gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-1">Ambiente Confortável</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Espaço climatizado, música ambiente selecionada e atendimento cortês com café fresco.
              </p>
            </div>
          </div>
        </div>

        {/* Story and Hours block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-mono inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> JP Barbearia Est. 2024
            </span>
            <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight">
              A Arte da Navalha na <br />
              <span className="font-semibold text-amber-500 font-serif">Sua Melhor Versão</span>
            </h2>
            <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
              Mais do que apenas um corte de cabelo ou aparo de barba, na <strong className="text-white">JP Barbearia</strong> entregamos uma experiência de cuidado e bem-estar impecável. Fundada com o intuito de trazer o verdadeiro acabamento premium, nossa especialidade é a precisão do degradê navalhado e a milenar barboterapia relaxante.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl">
              Nosso espaço é desenhado de forma minimalista para oferecer um ambiente de tranquilidade, onde cada cliente recebe um atendimento único e sob medida. Venha tomar um café conosco, atualizar o visual e elevar sua autoestima.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_API_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold px-6 py-3 rounded text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white text-emerald-600" /> Falar no WhatsApp
              </a>
              <a
                href="#agendamento"
                className="border border-zinc-700 hover:border-amber-500 text-zinc-300 hover:text-amber-500 font-mono font-semibold px-6 py-3 rounded text-xs uppercase tracking-wider transition-all"
              >
                Agendar Horário Online
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-950 p-6 md:p-8 rounded border border-zinc-800 space-y-6">
            <h3 className="font-mono text-sm uppercase tracking-wider text-amber-500 pb-3 border-b border-zinc-900">
              Informações de Contato
            </h3>

            {/* Hours card detail */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <Clock className="w-4.5 h-4.5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase font-mono">Horário de Funcionamento</h4>
                  <ul className="text-sm mt-1 space-y-0.5 text-zinc-200">
                    <li>Segunda a Sexta: <span className="font-mono text-zinc-300">09:00h às 19:00h</span></li>
                    <li>Sábado: <span className="font-mono text-zinc-300">08:00h às 18:00h</span></li>
                    <li className="text-red-400">Domingo: Fechado</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2">
                <Phone className="w-4.5 h-4.5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase font-mono">Telefone / WhatsApp</h4>
                  <p className="text-sm text-zinc-200 mt-0.5 font-mono">
                    (82) 99999-9999
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5 italic">Atendimento fictício para demonstração.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2">
                <MapPin className="w-4.5 h-4.5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase font-mono">Endereço da Barbearia</h4>
                  <p className="text-sm text-zinc-200 mt-0.5 leading-snug">
                    PC DEP João Toledo, 34 - Centro <br />
                    Cajueiro - AL, CEP 57770-000
                  </p>
                  <span className="text-[10px] text-amber-500 underline font-mono block mt-1 hover:text-amber-400 cursor-pointer">
                    Ver no Google Maps
                  </span>
                </div>
              </div>
            </div>

            {/* Custom high contrast minimalistic map representation */}
            <div className="h-28 bg-zinc-900 rounded border border-zinc-800 relative overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>
              <div className="z-10 text-center space-y-1">
                <MapPin className="w-5 h-5 text-amber-500 mx-auto animate-bounce" />
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Praça Dep. João Toledo</p>
                <p className="text-[9px] text-zinc-500">Cajueiro, Alagoas — Brasil</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
