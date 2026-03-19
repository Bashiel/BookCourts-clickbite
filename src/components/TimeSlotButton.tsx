import { motion } from "framer-motion";

interface TimeSlotButtonProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export default function TimeSlotButton({ label, selected, onClick }: TimeSlotButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full h-14 rounded-2xl border flex items-center justify-between px-6 transition-all duration-300 ${
        selected
          ? "border-transparent brand-gradient brand-shadow"
          : "border-border bg-card inner-glow text-muted-foreground hover:bg-secondary"
      }`}
    >
      <span className={`font-medium ${selected ? "text-foreground" : ""}`}>{label}</span>
      <div
        className={`w-2 h-2 rounded-full ${
          selected ? "bg-foreground animate-pulse-dot" : "bg-muted-foreground/30"
        }`}
      />
    </motion.button>
  );
}
