
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
    initial: { x: '-100%', opacity: 0.1 },
    animate: { 
      x: '200%', 
      opacity: 0.5,
      transition: { 
        repeat: Infinity, 
        repeatType: "mirror", 
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
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut"
      }
    }
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
            "border border-white/10 backdrop-blur-sm group transition-all duration-500",
            "hover:shadow-xl",
            item.color
          )}
          variants={itemVariants}
          whileHover="hover"
          onClick={(e) => handleMenuClick(item, e)}
          layoutId={`menu-card-${item.id}`}
        >
          {/* Gradiente de fundo com transição melhorada */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white via-white/20 to-transparent" />
          
          {/* Efeito de shimmer que percorre o card */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Efeito de highlight para itens destacados */}
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
          
          {/* Efeito para itens novos */}
          {item.new && (
            <div className="absolute top-3 left-3">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
                className="flex items-center px-2 py-1 bg-green-500/80 rounded-full text-xs font-semibold text-white"
              >
                <Star className="h-3 w-3 mr-1" />
                Novo
              </motion.div>
            </div>
          )}
          
          {/* Container do ícone com efeito de flutuação */}
          <motion.div 
            className="h-14 w-14 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden"
            whileHover={{ y: -5, transition: { duration: 0.3, yoyo: Infinity } }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
          </motion.div>

          {/* Título com transição de cores */}
          <h3 className="text-lg font-medium mb-2 transition-colors duration-300 group-hover:text-white">
            {item.title}
          </h3>
          
          {/* Descrição com efeito fade-in no hover */}
          <p className="text-sm opacity-80 mb-4 transition-all duration-300 group-hover:opacity-100 group-hover:text-white/90">
            {item.description}
          </p>
          
          {/* Botão de ação com efeito hover melhorado */}
          <div className="flex items-center mt-auto text-sm font-medium">
            <motion.span 
              className="transition-colors duration-300 group-hover:text-white"
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
              >
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            )}
          </div>

          {/* Efeito de click com animação de ondas */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/0 pointer-events-none"
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
              <MousePointerClick className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Decoração de canto com animação melhorada */}
          <motion.div 
            className="absolute -bottom-10 -right-10 w-20 h-20 rounded-full bg-white/5" 
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
