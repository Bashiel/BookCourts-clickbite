import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import BookingSection from "@/components/BookingSection";
import SportCard from "@/components/SportCard";
import TimeSlotButton from "@/components/TimeSlotButton";
import CaptainInput from "@/components/CaptainInput";

const TIME_SLOTS = [
  "16:30 - 18:00",
  "18:00 - 19:30",
  "19:30 - 21:00",
  "21:00 - 22:30",
];

const slideUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

export default function Index() {
  const [step, setStep] = useState(1);
  const [sport, setSport] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirm = () => {
    if (!date) return;
    const message = `¡Hola! 👋 Quiero reservar un turno en el complejo.
🏆 Deporte: ${sport}
📅 Fecha: ${format(date, "PPPP", { locale: es })}
⏰ Horario: ${time}
👤 A nombre de: ${name}

_Enviado vía Book Courts by ClickBite_`;

    window.open(`https://wa.me/5491122334455?text=${encodeURIComponent(message)}`, "_blank");
  };

  const canConfirm = name.length > 3 && time && date && sport;

  return (
    <div className="min-h-svh bg-background text-foreground font-sans">
      <div className="max-w-md mx-auto px-6 py-12 pb-40">
        {/* Hero */}
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-3 py-1 rounded-full border border-border bg-secondary text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4"
          >
            MVP Demo System
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-extrabold tracking-tight mb-2 leading-tight"
          >
            Complejo{" "}
            <span className="brand-gradient-text">Book Courts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-muted-foreground text-lg"
          >
            Reservá tu cancha en segundos.
          </motion.p>
        </header>

        <div className="space-y-12">
          {/* Step 1 - Sport */}
          <BookingSection title="1. Seleccioná el deporte" active={step >= 1}>
            <div className="grid grid-cols-2 gap-4">
              <SportCard
                label="Pádel"
                icon={<span className="text-3xl">🎾</span>}
                selected={sport === "Pádel"}
                onClick={() => { setSport("Pádel"); if (step < 2) setStep(2); }}
              />
              <SportCard
                label="Fútbol Sintético"
                icon={<span className="text-3xl">⚽</span>}
                selected={sport === "Fútbol Sintético"}
                onClick={() => { setSport("Fútbol Sintético"); if (step < 2) setStep(2); }}
              />
            </div>
          </BookingSection>

          {/* Step 2 - Date & Time */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div {...slideUp}>
                <BookingSection title="2. Fecha y Horario" active={step >= 2}>
                  <div className="card-surface p-2 mb-6 overflow-hidden">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        if (d && step < 3) setStep(2);
                      }}
                      disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="pointer-events-auto mx-auto [&_.rdp-day_focus]:ring-ring [&_.rdp-day_selected]:brand-gradient [&_.rdp-day_selected]:text-foreground"
                    />
                  </div>

                  {date && (
                    <motion.div {...slideUp} className="grid grid-cols-1 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <TimeSlotButton
                          key={slot}
                          label={slot}
                          selected={time === slot}
                          onClick={() => { setTime(slot); setStep(3); }}
                        />
                      ))}
                    </motion.div>
                  )}
                </BookingSection>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 - Captain */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div {...slideUp}>
                <BookingSection title="3. Datos del Capitán" active={step >= 3}>
                  <div className="space-y-4">
                    <CaptainInput
                      label="Nombre y Apellido"
                      icon={<User className="w-4 h-4" />}
                      placeholder="Ej: Juan Pérez"
                      value={name}
                      onChange={setName}
                    />
                    <CaptainInput
                      label="Teléfono"
                      icon={<Phone className="w-4 h-4" />}
                      placeholder="Ej: 11 2233 4455"
                      value={phone}
                      onChange={setPhone}
                      type="tel"
                    />
                  </div>
                </BookingSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ClickBite Badge */}
      <div className="text-center pb-6 pt-2">
        <a
          href="https://clickbiteweb.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/60 hover:bg-secondary transition-colors group"
        >
          <span className="flex items-center justify-center w-5 h-5 rounded-md text-[9px] font-black text-white bg-gradient-to-br from-indigo-500 to-violet-500 leading-none select-none">
            CB
          </span>
          <span className="text-[11px] text-muted-foreground group-hover:text-foreground transition-colors tracking-wide">
            Desarrollado por <span className="font-semibold text-foreground">ClickBite</span>
          </span>
        </a>
      </div>

      {/* Sticky CTA */}
      <AnimatePresence>
        {canConfirm && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-3 h-16 rounded-2xl font-bold text-foreground brand-gradient brand-shadow transition-transform"
            >
              Confirmar Cancha por WhatsApp
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
