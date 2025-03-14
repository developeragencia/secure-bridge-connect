
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonEffectProps extends React.ComponentPropsWithoutRef<typeof Button> {
  icon?: React.ReactNode;
  label: string;
  shimmer?: boolean;
}

const ButtonEffect: React.FC<ButtonEffectProps> = ({ 
  icon, 
  label, 
  shimmer = true,
  className,
  ...props 
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Button 
        className={cn(
          "relative overflow-hidden group transition-colors duration-300",
          className
        )}
        {...props}
      >
        {shimmer && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        )}
        
        <span className="flex items-center gap-1.5">
          {icon && (
            <motion.span
              initial={{ rotate: 0 }}
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.span>
          )}
          {label}
        </span>
      </Button>
    </motion.div>
  );
};

export default ButtonEffect;
