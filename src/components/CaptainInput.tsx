import { ReactNode } from "react";

interface CaptainInputProps {
  label: string;
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export default function CaptainInput({ label, icon, placeholder, value, onChange, type = "text" }: CaptainInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-muted-foreground ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-14 bg-card border border-border rounded-2xl pl-12 pr-4 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring transition-all inner-glow"
        />
      </div>
    </div>
  );
}
