/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Booking } from '../types';
import { SERVICES } from './ServiceCatalog';
import { Calendar, Clock, User, Phone, CheckCircle2, AlertCircle, Trash2, Send } from 'lucide-react';

interface SchedulerProps {
  preSelectedServiceId: string | null;
  onClearPreSelected: () => void;
}

// Generate next 7 days (helper)
const getNext7Days = () => {
  const days = [];
  const weekdayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  for (let i = 0; i < 8; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Barbershops are typically closed on Sundays, let's skip/disable Sunday
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;
    
    const formattedDateString = date.toISOString().split('T')[0];
    
    days.push({
      dateString: formattedDateString,
      dayName: weekdayNames[dayOfWeek],
      dayNum: date.getDate(),
      monthName: monthNames[date.getMonth()],
      isSunday,
    });
  }
  return days;
};

const TIME_SLOTS = [
  { time: '09:00', label: 'Manhã' },
  { time: '09:40', label: 'Manhã' },
  { time: '10:20', label: 'Manhã' },
  { time: '11:00', label: 'Manhã' },
  { time: '11:40', label: 'Manhã' },
  { time: '13:00', label: 'Tarde' },
  { time: '13:40', label: 'Tarde' },
  { time: '14:20', label: 'Tarde' },
  { time: '15:00', label: 'Tarde' },
  { time: '15:40', label: 'Tarde' },
  { time: '16:20', label: 'Tarde' },
  { time: '17:00', label: 'Tarde' },
  { time: '17:40', label: 'Tarde' },
  { time: '18:20', label: 'Tarde' },
];

export default function Scheduler({ preSelectedServiceId, onClearPreSelected }: SchedulerProps) {
  // Booking state
  const [serviceId, setServiceId] = useState<string>(SERVICES[0].id);
  const [professional, setProfessional] = useState<'jean' | 'pedro' | 'qualquer'>('qualquer');
  
  const daysList = getNext7Days();
  const firstAvailableDay = daysList.find(d => !d.isSunday)?.dateString || daysList[0].dateString;
  const [selectedDate, setSelectedDate] = useState<string>(firstAvailableDay);
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  
  // Local bookings history
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  // Mock occupied bookings to simulate active scheduling
  const [occupiedSlots, setOccupiedSlots] = useState<{ [key: string]: string[] }>({});
  
  const [lastCreatedBooking, setLastCreatedBooking] = useState<Booking | null>(null);
  const [showConfirmSuccess, setShowConfirmSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Auto-detect preselected service
  useEffect(() => {
    if (preSelectedServiceId) {
      setServiceId(preSelectedServiceId);
      // Scroll smoothly to reservation
      const element = document.getElementById('agendamento');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      onClearPreSelected();
    }
  }, [preSelectedServiceId]);

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('jp_barber_bookings');
    if (stored) {
      try {
        setMyBookings(JSON.parse(stored));
      } catch (error) {
        console.error('Erro ao ler agendamentos locais', error);
      }
    }

    // Set up some mock busy slots for the next couple of days, so the UI looks alive
    const mockBusy: { [key: string]: string[] } = {};
    daysList.forEach((day, index) => {
      if (index < 3) {
        // randomly choose 2 or 3 timeslots as already busy
        mockBusy[day.dateString] = index === 0 
          ? ['10:20', '14:20', '15:40'] 
          : index === 1 
          ? ['09:00', '13:40', '17:00']
          : ['11:00', '16:20'];
      }
    });
    setOccupiedSlots(mockBusy);
  }, []);

  const saveBookings = (newBookings: Booking[]) => {
    setMyBookings(newBookings);
    localStorage.setItem('jp_barber_bookings', JSON.stringify(newBookings));
  };

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!serviceId) {
      setValidationError('Por favor, selecione um serviço.');
      return;
    }
    if (!selectedDate) {
      setValidationError('Por favor, selecione a data do corte.');
      return;
    }
    const dayObj = daysList.find(d => d.dateString === selectedDate);
    if (dayObj?.isSunday) {
      setValidationError('A barbearia está fechada aos domingos. Por favor, escolha outro dia.');
      return;
    }
    if (!selectedTime) {
      setValidationError('Por favor, selecione um horário disponível.');
      return;
    }
    if (!clientName.trim()) {
      setValidationError('Por favor, insira o seu nome.');
      return;
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 8) {
      setValidationError('Por favor, insira um número de WhatsApp válido.');
      return;
    }

    // Check availability
    const alreadyBusy = occupiedSlots[selectedDate]?.includes(selectedTime);
    const inMyList = myBookings.some(b => b.date === selectedDate && b.timeSlot === selectedTime);
    if (alreadyBusy || inMyList) {
      setValidationError('Infelizmente este horário acabou de ser reservado. Escolha outro slot.');
      return;
    }

    const matchedService = SERVICES.find(s => s.id === serviceId);
    if (!matchedService) return;

    // Create Booking
    const newBooking: Booking = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      date: selectedDate,
      timeSlot: selectedTime,
      serviceId,
      professional,
      totalPrice: matchedService.price,
      createdAt: new Date().toISOString(),
    };

    const updated = [newBooking, ...myBookings];
    saveBookings(updated);
    setLastCreatedBooking(newBooking);
    setShowConfirmSuccess(true);

    // Update busy list in state
    setOccupiedSlots(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), selectedTime]
    }));

    // Reset single booking choices
    setSelectedTime('');
  };

  const handleDeleteBooking = (id: string, dateStr: string, timeStr: string) => {
    const updated = myBookings.filter(b => b.id !== id);
    saveBookings(updated);

    // Remove from occupied state if there
    if (occupiedSlots[dateStr]) {
      setOccupiedSlots(prev => ({
        ...prev,
        [dateStr]: prev[dateStr].filter(t => t !== timeStr)
      }));
    }
  };

  const getWhatsAppLink = (booking: Booking) => {
    const matchedService = SERVICES.find(s => s.id === booking.serviceId);
    const serviceName = matchedService ? matchedService.name : 'Corte';
    const rawPrice = matchedService ? matchedService.price : 15.00;
    
    // Format professional label
    const profName = booking.professional === 'jean' ? 'Barbeiro Jean' 
                   : booking.professional === 'pedro' ? 'Barbeiro Pedro' 
                   : 'Qualquer Profissional (JP)';

    // Date formatting (DD/MM)
    const [year, month, day] = booking.date.split('-');
    const dateFormatted = `${day}/${month}/${year}`;

    const text = `Olá JP Barbearia! Solicito agendamento pelo site:
━━━━━━━━━━━━━━━━━━━━
💈 *Serviço:* ${serviceName}
💰 *Valor:* R$ ${rawPrice.toFixed(2).replace('.', ',')}
👤 *Cliente:* ${booking.clientName}
📱 *WhatsApp:* ${booking.clientPhone}
📅 *Data:* ${dateFormatted}
⏰ *Horário:* ${booking.timeSlot}
✂️ *Profissional:* ${profName}
━━━━━━━━━━━━━━━━━━━━
Aguardo a confirmação da minha vaga no sistema! Obrigado.`;

    return `https://api.whatsapp.com/send?phone=5582999999999&text=${encodeURIComponent(text)}`;
  };

  const handleOpenWhatsApp = (booking: Booking) => {
    const link = getWhatsAppLink(booking);
    window.open(link, '_blank');
  };

  const selectedServiceObj = SERVICES.find(s => s.id === serviceId);

  return (
    <section id="agendamento" className="py-20 bg-zinc-950 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-amber-500 font-mono inline-flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5" /> 100% Online e Seguro
          </span>
          <h2 className="text-3xl md:text-4xl font-sans font-light tracking-tight text-white animate-fade-in">
            Reserve o seu <span className="font-semibold text-amber-500 font-serif">Horário</span>
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto mt-2 text-sm">
            Escolha os seus serviços, agende de forma fácil, e confirme no WhatsApp do barbeiro INSTANTANEAMENTE.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Scheduler Form */}
          <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded shadow-xl">
            {showConfirmSuccess && lastCreatedBooking ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2">Reserva Pré-Agendada!</h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
                  Seu horário foi reservado localmente no site. Agora, para garantir o seu atendimento, clique no botão abaixo para enviar os detalhes no WhatsApp do barbeiro para validação final!
                </p>

                {/* Reciept card */}
                <div className="bg-zinc-950 p-6 rounded border border-zinc-800 max-w-sm mx-auto mb-8 text-left text-sm font-mono leading-relaxed">
                  <p className="text-center font-bold text-amber-200 border-b border-zinc-850 pb-2 mb-3">RECIBO DE SOLICITAÇÃO</p>
                  <p><span className="text-zinc-500">COD:</span> #{lastCreatedBooking.id}</p>
                  <p><span className="text-zinc-500">Serviço:</span> {SERVICES.find(s => s.id === lastCreatedBooking.serviceId)?.name}</p>
                  <p><span className="text-zinc-500">Valor:</span> R$ {lastCreatedBooking.totalPrice.toFixed(2).replace('.', ',')}</p>
                  <p><span className="text-zinc-500">Data:</span> {lastCreatedBooking.date.split('-').reverse().join('/')}</p>
                  <p><span className="text-zinc-500">Horário:</span> {lastCreatedBooking.timeSlot}h</p>
                  <p><span className="text-zinc-500">Profissional:</span> {lastCreatedBooking.professional === 'jean' ? 'Barbeiro Jean' : lastCreatedBooking.professional === 'pedro' ? 'Barbeiro Pedro' : 'JP Barbearia (Qualquer)'}</p>
                  <p className="pt-2 border-t border-zinc-850 mt-3 text-center text-xs text-amber-500/80">★ Aguardando confirmação via Whats</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button
                    onClick={() => {
                      handleOpenWhatsApp(lastCreatedBooking);
                    }}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold px-6 py-3 rounded flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Send className="w-4 h-4 fill-white" /> Enviar para o WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirmSuccess(false);
                      setLastCreatedBooking(null);
                    }}
                    className="w-full sm:w-auto border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-mono text-xs px-5 py-3 rounded transition-colors"
                  >
                    Fazer Novo Agendamento
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {validationError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-200 text-xs py-3 px-4 rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Step 1: Select Service */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2.5">
                    1. Selecione o Serviço
                  </label>
                  <div className="relative">
                    <select
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-3 text-sm focus:border-amber-500 outline-none text-white appearance-none cursor-pointer"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — R$ {s.price.toFixed(2).replace('.', ',')} ({s.durationMinutes} min)
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                      ▼
                    </div>
                  </div>
                  {selectedServiceObj && (
                    <p className="text-zinc-500 text-[11px] mt-1.5 italic">
                      Dica: {selectedServiceObj.description}
                    </p>
                  )}
                </div>

                {/* Step 2: Choose Professional */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2.5">
                    2. Escolha o Profissional
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setProfessional('qualquer')}
                      className={`flex items-center justify-center gap-2 p-3 rounded text-xs border transition-all ${
                        professional === 'qualquer'
                          ? 'border-amber-500 bg-amber-500/5 text-amber-500 font-semibold'
                          : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" /> Qualquer Profissional
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfessional('jean')}
                      className={`flex items-center justify-center gap-2 p-3 rounded text-xs border transition-all ${
                        professional === 'jean'
                          ? 'border-amber-500 bg-amber-500/5 text-amber-500 font-semibold'
                          : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" /> Barbeiro Jean
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfessional('pedro')}
                      className={`flex items-center justify-center gap-2 p-3 rounded text-xs border transition-all ${
                        professional === 'pedro'
                          ? 'border-amber-500 bg-amber-500/5 text-amber-500 font-semibold'
                          : 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" /> Barbeiro Pedro
                    </button>
                  </div>
                </div>

                {/* Step 3: Date Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2.5">
                    3. Escolha a Data
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
                    {daysList.map((day) => (
                      <button
                        key={day.dateString}
                        type="button"
                        onClick={() => {
                          if (!day.isSunday) {
                            setSelectedDate(day.dateString);
                            // Auto reset selected slot on date change to prevent booking wrong slot
                            setSelectedTime('');
                          }
                        }}
                        disabled={day.isSunday}
                        className={`flex flex-col items-center justify-center p-3.5 min-w-[70px] rounded border transition-all cursor-pointer ${
                          day.isSunday
                            ? 'opacity-30 border-dashed border-zinc-800 text-zinc-600 bg-zinc-950/20 cursor-not-allowed'
                            : selectedDate === day.dateString
                            ? 'border-amber-500 bg-amber-500 text-zinc-950 font-bold scale-102 shadow-md'
                            : 'border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono tracking-wider opacity-80">{day.dayName}</span>
                        <span className="text-lg font-mono font-extrabold my-0.5">{day.dayNum}</span>
                        <span className="text-[9px] uppercase font-mono tracking-wider opacity-80">{day.monthName}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    * Barbearia fechada aos domingos.
                  </p>
                </div>

                {/* Step 4: Time Selector */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-2.5">
                    4. Escolha o Horário
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {TIME_SLOTS.map(({ time, label }) => {
                      const isBusy = occupiedSlots[selectedDate]?.includes(time);
                      const isSelected = selectedTime === time;

                      return (
                        <button
                          key={time}
                          type="button"
                          disabled={isBusy}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-1 rounded text-center font-mono text-xs transition-all ${
                            isBusy
                              ? 'bg-zinc-950 text-zinc-600 border border-zinc-900/50 line-through cursor-not-allowed'
                              : isSelected
                              ? 'bg-amber-500 text-zinc-950 font-bold scale-102 border border-amber-500'
                              : 'bg-zinc-950 hover:bg-zinc-900 text-zinc-300 border border-zinc-800'
                          }`}
                        >
                          <div>{time}</div>
                          <div className={`text-[8px] active:scale-95 transition-all uppercase tracking-wider scale-90 ${
                            isBusy 
                              ? 'text-zinc-600' 
                              : isSelected 
                              ? 'text-zinc-900 font-semibold' 
                              : 'text-zinc-500'
                          }`}>
                            {isBusy ? 'ocupado' : label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 5: Personal details */}
                <div className="border-t border-zinc-800 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5 flex items-center gap-1">
                      <User className="w-3 h-3 text-amber-500" /> Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João da Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-sm focus:border-amber-500 outline-none text-white text-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-mono text-zinc-400 mb-1.5 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-500" /> Seu WhatsApp
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ex: (82) 99947-9442"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded px-4 py-2.5 text-sm focus:border-amber-500 outline-none text-white text-sans"
                    />
                  </div>
                </div>

                {/* Submit Trigger */}
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 py-3.5 font-mono font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 shadow-lg hover:shadow-amber-500/10 cursor-pointer"
                >
                  Solicitar Agendamento
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Local storage list of my bookings */}
          <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-850 p-6 rounded">
            <h3 className="text-sm font-semibold uppercase tracking-wider font-mono mb-4 text-amber-500 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Seus Agendamentos
            </h3>
            
            {myBookings.length === 0 ? (
              <div className="py-8 text-center text-zinc-500">
                <p className="text-xs">Você não cadastrou nenhum corte neste navegado ainda.</p>
                <p className="text-[10px] mt-2 italic leading-normal">Seus agendamentos salvos ficarão exibidos aqui de forma organizada.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {myBookings.map((bk) => {
                  const correlatedService = SERVICES.find(s => s.id === bk.serviceId);
                  const serviceName = correlatedService ? correlatedService.name : 'Corte Masculino';

                  return (
                    <div 
                      key={bk.id}
                      className="p-4 bg-zinc-950 rounded border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono bg-zinc-900 text-amber-500 px-2 py-0.5 rounded uppercase font-bold">
                          #{bk.id}
                        </span>
                        <button
                          onClick={() => {
                            if (confirm('Deseja desmarcar este agendamento localmente?')) {
                              handleDeleteBooking(bk.id, bk.date, bk.timeSlot);
                            }
                          }}
                          className="text-zinc-500 hover:text-red-400 p-0.5 transition-colors"
                          title="Remover agendamento"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-xs font-semibold text-white leading-snug">
                        {serviceName}
                      </h4>

                      <div className="mt-3 text-[11px] font-mono text-zinc-400 space-y-1">
                        <p className="flex items-center gap-1.5">
                          <span className="text-zinc-600">Dia:</span> {bk.date.split('-').reverse().join('/')}
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className="text-zinc-600">Hora:</span> {bk.timeSlot}h
                        </p>
                        <p className="flex items-center gap-1.5">
                          <span className="text-zinc-600">Preço:</span> R$ {bk.totalPrice.toFixed(2).replace('.', ',')}
                        </p>
                      </div>

                      <div className="mt-3.5 pt-3.5 border-t border-zinc-900 flex justify-between items-center">
                        <span className="text-[9px] uppercase tracking-wider text-amber-500/90 font-mono">
                          Pagar na Barbearia
                        </span>
                        <button
                          onClick={() => handleOpenWhatsApp(bk)}
                          className="text-[10px] font-semibold text-emerald-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
                        >
                          Enviar Whats
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-t border-zinc-800/80 mt-6 pt-4 text-[11px] text-zinc-500 leading-normal">
              <p className="mb-2">⚠️ <strong className="text-zinc-400">Nota:</strong> Seus dados são salvos em segurança no seu próprio celular ou navegador offline (LocalStorage).</p>
              <p>Dúvidas? Entre em contato pelo WhatsApp <a href="https://api.whatsapp.com/send?phone=5582999999999" className="text-amber-500 hover:underline" target="_blank">(82) 99999-9999</a>.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
