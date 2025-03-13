
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, MousePointerClick } from 'lucide-react';
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
        staggerChildren: 0.1
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
      scale: 1.05,
      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={cn(
            "relative overflow-hidden rounded-xl p-6 cursor-pointer",
            "border border-white/10 group transition-all duration-300",
            "hover:shadow-xl hover:shadow-[var(--accent)]",
            item.color
          )}
          variants={itemVariants}
          whileHover="hover"
          onClick={(e) => handleMenuClick(item, e)}
          layoutId={`menu-card-${item.id}`}
        >
          {/* Gradiente de fundo com transição melhorada */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white via-white/20 to-transparent gradient-shift" />
          
          {/* Rastro luminoso que aparece no hover */}
          <motion.div 
            className="absolute inset-0 opacity-0 bg-white/5 group-hover:opacity-20 transition-opacity duration-700"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          
          {/* Efeito de highlight */}
          {item.highlight && (
            <div className="absolute top-3 right-3">
              <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
              >
                <Sparkles className="h-5 w-5 text-white/80" />
              </motion.div>
            </div>
          )}
          
          {/* Ícone do card com animação */}
          <motion.div 
            className="h-14 w-14 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center mb-4 overflow-hidden"
            initial={{ rotate: 0 }}
            whileHover={{ rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              {item.icon}
            </motion.div>
          </motion.div>

          <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors duration-300">{item.title}</h3>
          <p className="text-sm opacity-80 mb-4 group-hover:opacity-100 transition-opacity duration-300">{item.description}</p>
          
          {/* Ação de navegação com efeito hover */}
          <div className="flex items-center mt-auto text-sm font-medium">
            <span className="group-hover:text-white transition-colors duration-300">Acessar</span>
            {item.isExternal ? (
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
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

          {/* Efeito de click */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-black/0 pointer-events-none"
            whileTap={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 1.5, opacity: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <MousePointerClick className="h-8 w-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Decoração de canto com animação */}
          <motion.div 
            className="absolute bottom-0 right-0 w-20 h-20 transform translate-x-10 translate-y-10 bg-white/5 rounded-full" 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuGrid;
