/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service } from '../types';
import { Scissors, Coins, Flame, Layers } from 'lucide-react';

export const SERVICES: Service[] = [
  {
    id: 'corte-social',
    name: 'Corte Social',
    price: 15.00,
    durationMinutes: 30,
    description: 'Corte tradicional e elegante realizado na máquina e tesoura. Finalizado com higienização do contorno e pomada modeladora de alta fixação.',
    category: 'cabelo',
  },
  {
    id: 'corte-degrade',
    name: 'Corte Degradê (Fade)',
    price: 20.00,
    durationMinutes: 40,
    description: 'Técnica moderna de graduação suave e precisa (low, mid ou high fade). Desenho do ' +
      'perfil limpo e preciso com acabamento premium.',
    category: 'cabelo',
  },
  {
    id: 'barba',
    name: 'Barba Clássica',
    price: 15.00,
    durationMinutes: 25,
    description: 'Modelagem de barba com aplicação de creme aromatizado, toalha morna relaxante para abertura de poros e remoção minuciosa com navalha descartável.',
    category: 'barba',
  },
  {
    id: 'combo-social',
    name: 'Combo Social + Barba',
    price: 30.00, // 15 + 15
    durationMinutes: 50,
    description: 'O melhor custo-benefício tradicional. Corte social clássico alinhado de forma harmônica com a barba clássica relaxante.',
    category: 'combo',
  },
  {
    id: 'combo-degrade',
    name: 'Combo Degradê + Barba',
    price: 35.00, // 20 + 15
    durationMinutes: 60,
    description: 'Estilo integral de ponta. O degradê degradado moderno combinado perfeitamente com a barba alinhada e refinada.',
    category: 'combo',
  },
];

interface ServiceCatalogProps {
  onSelectService: (serviceId: string) => void;
}

export default function ServiceCatalog({ onSelectService }: ServiceCatalogProps) {
  return (
    <section id="servicos" className="py-20 bg-zinc-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-mono inline-flex items-center gap-1.5 mb-2">
            <Coins className="w-3 h-3" /> Preços Transparentes
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-white">
            Nossos <span className="font-semibold text-amber-500 font-serif">Serviços</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mt-2 text-sm">
            Especialistas em cortes masculinos e barboterapia. Escolha o serviço ideal para o seu estilo.
          </p>
        </div>

        {/* Highlighted pricing cards with visual layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SERVICES.slice(0, 3).map((svc) => (
            <div 
              key={svc.id}
              className="bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 p-6 rounded transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-zinc-900 rounded inline-block text-amber-500">
                    {svc.id === 'barba' ? (
                      <Flame className="w-5 h-5" />
                    ) : (
                      <Scissors className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-2xl font-mono font-medium text-amber-500">
                    R$ {svc.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{svc.name}</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  {svc.description}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Duração: ~{svc.durationMinutes} min
                </span>
                <button
                  onClick={() => onSelectService(svc.id)}
                  className="text-xs font-mono font-medium border border-zinc-800 hover:border-amber-500 hover:text-amber-500 px-3.5 py-1.5 rounded transition-all duration-300"
                >
                  Agendar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Combo services row */}
        <div className="bg-zinc-950/50 rounded border border-zinc-800/80 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="text-amber-500 w-4 h-4" />
            <h4 className="text-xs uppercase tracking-widest font-mono text-zinc-300">Combos Recomendados (Economize)</h4>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {SERVICES.slice(3).map((combo) => (
              <div 
                key={combo.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-900/60 rounded border border-zinc-800/40 hover:border-zinc-700/60 transition-colors gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[9px] font-mono rounded tracking-wider uppercase">Combo</span>
                    <h5 className="font-semibold text-white text-sm">{combo.name}</h5>
                  </div>
                  <p className="text-xs text-zinc-400">{combo.description}</p>
                  <span className="text-[10px] font-mono text-zinc-500 mt-1 block">Duração: ~{combo.durationMinutes} minutos</span>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-800">
                  <span className="text-xl font-mono font-semibold text-amber-500">
                    R$ {combo.price.toFixed(2).replace('.', ',')}
                  </span>
                  <button
                    onClick={() => onSelectService(combo.id)}
                    className="bg-amber-500 text-zinc-950 hover:bg-amber-400 text-xs font-mono font-semibold px-4 py-1.5 rounded transition-all duration-300 uppercase tracking-wider"
                  >
                    Agendar Combo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
