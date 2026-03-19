import { ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SportCardProps {
  label: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function SportCard({ label, icon, selected, onClick }: SportCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-4 aspect-square rounded-3xl border transition-colors duration-300 ${
        selected
          ? "border-transparent ring-2 ring-pink-500/50 brand-gradient"
          : "border-border bg-card inner-glow hover:bg-secondary"
      }`}
    >
      <div className={selected ? "text-foreground" : "text-muted-foreground"}>{icon}</div>
      <span className={`font-semibold ${selected ? "text-foreground" : "text-muted-foreground"}`}>
        {label}
      </span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3"
        >
          <CheckCircle2 className="w-5 h-5 text-foreground" />
        </motion.div>
      )}
    </motion.button>
  );
}
