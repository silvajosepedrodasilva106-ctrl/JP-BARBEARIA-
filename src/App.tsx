/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import ServiceCatalog from './components/ServiceCatalog';
import Gallery from './components/Gallery';
import Scheduler from './components/Scheduler';
import AboutContact from './components/AboutContact';
import { 
  Menu, 
  X, 
  MapPin, 
  Scissors, 
  Sparkles, 
  MessageSquare, 
  CalendarCheck,
  CheckCircle,
  Clock,
  Instagram
} from 'lucide-react';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);

  const handleSelectService = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
    // Smooth scroll is handled internally via useEffect inside Scheduler,
    // but we double-verify here to jump straight to the component.
    const element = document.getElementById('agendamento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearPreSelected = () => {
    setPreSelectedServiceId(null);
  };

  const WHATSAPP_CLIENT_NUM = "5582999999999";
  const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${WHATSAPP_CLIENT_NUM}&text=Olá%20JP%20Barbearia!%20Gostaria%2520de%2520agendar%2520um%2520serviço%2520pelo%2520site.`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Dynamic Header Navbar */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="p-1.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
              <Scissors className="w-4 h-4 scale-x-[-1]" />
            </span>
            <span className="text-lg uppercase tracking-[0.25em] font-sans font-semibold text-white">
              JP <span className="font-serif text-amber-500 font-normal italic capitalize tracking-normal">Barbearia</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-mono text-zinc-400">
            <a href="#servicos" className="hover:text-amber-500 transition-colors">Serviços</a>
            <a href="#galeria" className="hover:text-amber-500 transition-colors">Galeria</a>
            <a href="#agendamento" className="hover:text-amber-500 transition-colors">Agendar</a>
            <a href="#sobre" className="hover:text-amber-500 transition-colors">Sobre Nós</a>
          </nav>

          {/* Call-to-action button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="py-1.5 px-3 rounded text-[11px] font-mono text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> (82) 99999-9999
            </a>
            <a
              href="#agendamento"
              className="bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-mono font-bold tracking-wider uppercase px-4 py-2.5 rounded transition-all duration-300 transform active:scale-98"
            >
              Agendar Online
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-950 border-b border-zinc-900 py-6 px-6 space-y-4 animate-fade-in">
            <nav className="flex flex-col gap-4 text-xs uppercase tracking-widest font-mono text-zinc-400">
              <a 
                href="#servicos" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-500 py-1 transition-colors"
              >
                Serviços
              </a>
              <a 
                href="#galeria" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-500 py-1 transition-colors"
              >
                Galeria
              </a>
              <a 
                href="#agendamento" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-500 py-1 transition-colors"
              >
                Agendamento
              </a>
              <a 
                href="#sobre" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-amber-500 py-1 transition-colors"
              >
                Sobre Nós
              </a>
            </nav>
            <div className="pt-4 border-t border-zinc-900 flex flex-col gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="py-2 text-xs font-mono text-center bg-zinc-900 hover:bg-zinc-850 rounded text-emerald-400 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-950" /> (82) 99999-9999
              </a>
              <a
                href="#agendamento"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-amber-500 text-zinc-950 hover:bg-amber-400 text-xs font-mono font-bold text-center tracking-wider uppercase py-3 rounded"
              >
                Agendar Online
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-zinc-950 overflow-hidden py-16">
        
        {/* Ambient background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_70%)] pointer-events-none"></div>
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-zinc-900/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Minimalist Grid Pattern matching the Swiss clean design */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none z-10"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-20 space-y-8">
          
          {/* Subheading Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 leading-none">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tradição e Estilo em Cajueiro - AL
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white leading-tight">
            Estilo Clássico com <br />
            <span className="font-serif italic text-amber-500 font-normal">Precisão Cirúrgica</span>
          </h1>

          <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A JP Barbearia alia técnicas tradicionais de navalha a tendências modernas para dar vida à sua melhor versão. Agende agora e experimente o cuidado premium.
          </p>

          {/* Pricing Badges - Display requirements explicitly */}
          <div className="py-5 border-y border-zinc-900/80 max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 sm:gap-0 justify-around items-center text-xs font-mono font-bold text-zinc-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              <span>Corte Social: <span className="text-amber-500">R$ 15,00</span></span>
            </div>
            <div className="hidden sm:block text-zinc-850">|</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              <span>Corte Degradê: <span className="text-amber-500">R$ 20,00</span></span>
            </div>
            <div className="hidden sm:block text-zinc-850">|</div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-500" />
              <span>Barba Clássica: <span className="text-amber-500">R$ 15,00</span></span>
            </div>
          </div>

          {/* Action triggers */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <a
              href="#servicos"
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider px-7 py-4 rounded transition-all duration-300"
            >
              Catálogo de Serviços
            </a>
            <a
              href="#agendamento"
              className="bg-amber-500 hover:bg-amber-450 hover:shadow-lg hover:shadow-amber-500/10 text-zinc-950 text-xs font-mono font-bold uppercase tracking-wider px-7 py-4 rounded transition-all duration-300 transform active:scale-98"
            >
              Agendar Horário Online
            </a>
          </div>

          <div className="pt-6 animate-bounce">
            <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase">Rolar Para Baixo</span>
          </div>

        </div>
      </section>

      {/* Services Catalog Section */}
      <ServiceCatalog onSelectService={handleSelectService} />

      {/* Haircuts Gallery Section */}
      <Gallery />

      {/* Scheduler Section */}
      <Scheduler 
        preSelectedServiceId={preSelectedServiceId} 
        onClearPreSelected={handleClearPreSelected} 
      />

      {/* About & contact details section */}
      <AboutContact />

      {/* Footer bar */}
      <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 font-mono text-xs py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Logo brand and terms */}
          <div className="text-center md:text-left space-y-2">
            <a href="#" className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-sm font-sans font-semibold uppercase tracking-wider text-white">
                JP <span className="font-serif text-amber-500 italic font-normal capitalize">Barbearia</span>
              </span>
            </a>
            <p className="text-[10px] text-zinc-600">
              © 2026 JP Barbearia. Todos os direitos reservados.
            </p>
          </div>

          {/* Small mid status tracker */}
          <div className="text-center space-y-1.5">
            <p className="text-zinc-500 text-[11px] uppercase tracking-widest">Atendimento Dedicado</p>
            <p className="text-zinc-300 text-sm font-semibold tracking-wider font-sans">
              (82) 99999-9999
            </p>
            <p className="text-[10px] text-zinc-600">Cajueiro - AL, Brasil</p>
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end gap-4 text-zinc-500">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 hover:bg-zinc-900 rounded-full hover:text-amber-500 transition-colors"
              title="Siga no Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href={WHATSAPP_LINK} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 hover:bg-zinc-900 rounded-full hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              title="Contato Direto"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

        </div>
        <div className="text-center text-[9px] text-zinc-700 mt-8 max-w-sm mx-auto">
          Plataforma de agendamento online de alta performance. Desenvolvido com carinho para a JP Barbearia.
        </div>
      </footer>

    </div>
  );
}
