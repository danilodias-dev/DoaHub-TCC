/* eslint-disable react/prop-types */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function PremiumButton({
  className,
  variant = 'solid',
  size = 'md',
  icon,
  children,
  ...props
}) {
  
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-default rounded-full active:scale-95";
  
  const variants = {
    solid: "bg-emerald text-white hover:bg-emerald-light shadow-lg shadow-emerald/30",
    glass: "glass text-graphite-dark hover:bg-white hover:shadow-xl",
    outline: "border-2 border-emerald text-emerald hover:bg-emerald/5",
    ghost: "bg-transparent text-graphite-light hover:text-emerald hover:bg-emerald/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
