
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

// Definição do tipo para os itens de menu
interface MenuItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  isExternal?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
}

const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  const navigate = useNavigate();

  const handleMenuClick = (item: MenuItem) => {
    if (item.isExternal) {
      window.open(item.route, '_blank');
    } else {
      navigate(`/admin/${item.route}`);
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
      scale: 1.03,
      boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)',
      transition: { duration: 0.2 }
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
            "border group transition-all duration-300",
            item.color
          )}
          variants={itemVariants}
          whileHover="hover"
          onClick={() => handleMenuClick(item)}
          layoutId={`menu-card-${item.id}`}
        >
          {/* Gradiente de fundo */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white via-white/20 to-transparent" />
          
          {/* Ícone do card */}
          <div className="h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
            {item.icon}
          </div>

          <h3 className="text-lg font-medium mb-2">{item.title}</h3>
          <p className="text-sm opacity-80 mb-4">{item.description}</p>
          
          {/* Ação de navegação */}
          <div className="flex items-center mt-auto text-sm font-medium">
            <span>Acessar</span>
            {item.isExternal ? (
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </div>

          {/* Decoração de canto */}
          <div className="absolute bottom-0 right-0 w-16 h-16 transform translate-x-8 translate-y-8 bg-white/5 rounded-full" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MenuGrid;
