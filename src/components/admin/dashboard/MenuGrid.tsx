
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, MousePointerClick, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Definição do tipo para os itens de menu
export interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  isExternal?: boolean;
  highlight?: boolean;
  new?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
}

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: MenuItem, event: React.MouseEvent) => {
    // Prevent event propagation so parent elements don't capture the click
    event.stopPropagation();
    event.preventDefault();
    
    // Add console.log to debug navigation
    console.log('Navigating to:', item.route, 'isExternal:', item.isExternal);
    
    if (item.isExternal) {
      window.open(item.route, '_blank');
    } else {
      // Check if we need to add /admin prefix or not
      if (item.route === 'dashboard') {
        // For dashboard, navigate to the admin root
        navigate('/admin');
      } else {
        navigate(`/admin/${item.route}`);
      }
    }
  };

  // Animação para o container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Animação para os itens
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };
  
  // Efeito de brilho que percorre o card
  const shimmerVariants = {
    initial: { x: '-100%', opacity: 0 },
    animate: { 
      x: '200%', 
      opacity: 0.5,
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror" as const, 
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Efeito de pulsação para destacar novos itens
  const pulseVariants = {
    initial: { scale: 1, opacity: 0.7 },
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  // Base styles for cards (neutral, without hover effects)
  const getBaseCardStyles = (color: string) => {
    // Map of base card styles (neutral, without gradients)
    const baseColorMap: Record<string, string> = {
      'bg-blue-600/10': 'bg-muted/40 border-blue-500/20',
      'bg-purple-600/10': 'bg-muted/40 border-purple-500/20',
      'bg-green-600/10': 'bg-muted/40 border-green-500/20',
      'bg-yellow-600/10': 'bg-muted/40 border-yellow-500/20',
      'bg-red-600/10': 'bg-muted/40 border-red-500/20',
      'bg-pink-600/10': 'bg-muted/40 border-pink-500/20',
      'bg-indigo-600/10': 'bg-muted/40 border-indigo-500/20',
      'bg-teal-600/10': 'bg-muted/40 border-teal-500/20',
      'bg-orange-600/10': 'bg-muted/40 border-orange-500/20',
      'bg-cyan-600/10': 'bg-muted/40 border-cyan-500/20',
    };
    
    return baseColorMap[color] || 'bg-muted/40 border-primary/20';
  };
  
  // Hover gradient styles that only appear on hover/active
  const getHoverGradientStyles = (color: string) => {
    // Map of hover gradient styles
    const hoverColorMap: Record<string, string> = {
      'bg-blue-600/10': 'group-hover:bg-gradient-to-br group-hover:from-blue-500/30 group-hover:to-blue-700/30 group-active:from-blue-500/40 group-active:to-blue-700/40',
      'bg-purple-600/10': 'group-hover:bg-gradient-to-br group-hover:from-purple-500/30 group-hover:to-purple-700/30 group-active:from-purple-500/40 group-active:to-purple-700/40',
      'bg-green-600/10': 'group-hover:bg-gradient-to-br group-hover:from-green-500/30 group-hover:to-green-700/30 group-active:from-green-500/40 group-active:to-green-700/40',
      'bg-yellow-600/10': 'group-hover:bg-gradient-to-br group-hover:from-yellow-500/30 group-hover:to-yellow-700/30 group-active:from-yellow-500/40 group-active:to-yellow-700/40',
      'bg-red-600/10': 'group-hover:bg-gradient-to-br group-hover:from-red-500/30 group-hover:to-red-700/30 group-active:from-red-500/40 group-active:to-red-700/40',
      'bg-pink-600/10': 'group-hover:bg-gradient-to-br group-hover:from-pink-500/30 group-hover:to-pink-700/30 group-active:from-pink-500/40 group-active:to-pink-700/40',
      'bg-indigo-600/10': 'group-hover:bg-gradient-to-br group-hover:from-indigo-500/30 group-hover:to-indigo-700/30 group-active:from-indigo-500/40 group-active:to-indigo-700/40',
      'bg-teal-600/10': 'group-hover:bg-gradient-to-br group-hover:from-teal-500/30 group-hover:to-teal-700/30 group-active:from-teal-500/40 group-active:to-teal-700/40',
      'bg-orange-600/10': 'group-hover:bg-gradient-to-br group-hover:from-orange-500/30 group-hover:to-orange-700/30 group-active:from-orange-500/40 group-active:to-orange-700/40',
      'bg-cyan-600/10': 'group-hover:bg-gradient-to-br group-hover:from-cyan-500/30 group-hover:to-cyan-700/30 group-active:from-cyan-500/40 group-active:to-cyan-700/40',
    };
    
    return hoverColorMap[color] || 'group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-primary/30 group-active:from-primary/30 group-active:to-primary/40';
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={cn(
            "relative overflow-hidden rounded-xl p-6 cursor-pointer",
            "border backdrop-blur-sm group transition-all duration-300",
            "hover:shadow-lg hover:shadow-primary/10",
            getBaseCardStyles(item.color),
          )}
          variants={itemVariants}
          whileHover="hover"
          onClick={(e) => handleMenuClick(item, e)}
          layoutId={`menu-card-${item.id}`}
        >
          {/* Background overlay that only appears on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            getHoverGradientStyles(item.color)
          )} />
          
          {/* Shimmer effect only on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Highlight indicator with conditional animation */}
          {item.highlight && (
            <div className="absolute top-3 right-3">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "linear"
                }}
              >
                <Sparkles className="h-5 w-5 text-yellow-300 filter drop-shadow-md" />
              </motion.div>
            </div>
          )}
          
          {/* New item indicator with conditional pulse */}
          {item.new && (
            <div className="absolute top-3 left-3">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="flex items-center px-2 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white shadow-sm"
              >
                <Star className="h-3 w-3 mr-1" />
                Novo
              </motion.div>
            </div>
          )}
          
          {/* Icon container with enhanced visibility and hover interaction */}
          <motion.div 
            className="h-14 w-14 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-sm border border-muted/50 group-hover:border-primary/20 group-hover:bg-white/90 transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
              style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {item.icon}
            </motion.div>
          </motion.div>

          {/* Title with color transition on hover */}
          <h3 className="text-lg font-medium mb-2 transition-all duration-300 text-foreground/90 group-hover:text-primary">
            {item.title}
          </h3>
          
          {/* Description with transition effects */}
          <p className="text-sm text-muted-foreground/70 mb-4 transition-all duration-300 group-hover:text-foreground/80">
            {item.description}
          </p>
          
          {/* Action button with hover effect */}
          <div className="flex items-center mt-auto text-sm font-medium">
            <motion.span 
              className="transition-all duration-300 text-muted-foreground group-hover:text-primary"
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
            >
              Acessar
            </motion.span>
            {item.isExternal ? (
              <motion.div
                initial={{ x: 0, rotate: 0 }}
                whileHover={{ x: 5, rotate: 15 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
              >
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            )}
          </div>

          {/* Click effect with animated circle */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ 
                scale: [0, 1.5],
                opacity: [0, 0.3, 0],
                transition: { duration: 0.7 }
              }}
            >
              <MousePointerClick className="h-8 w-8 text-primary" />
            </motion.div>
          </motion.div>

          {/* Corner decoration with subtle animation */}
          <motion.div 
            className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent transition-all duration-500" 
            initial={{ rotate: 0, scale: 1 }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuGrid;
