import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BookingSectionProps {
  title: string;
  active: boolean;
  children: ReactNode;
}

export default function BookingSection({ title, active, children }: BookingSectionProps) {
  return (
    <motion.section
      animate={{ opacity: active ? 1 : 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${active ? "" : "pointer-events-none"}`}
    >
      <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-[0.2em] mb-6">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}
