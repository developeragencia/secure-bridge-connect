
import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, FileSearch, Calculator, BarChart, HelpCircle, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface OperationButton {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  color: string;
}

interface ClientOperationsAccessProps {
  client: Client;
}

const ClientOperationsAccess: React.FC<ClientOperationsAccessProps> = ({ client }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const operationButtons: OperationButton[] = [
    {
      id: 'recovery',
      title: 'Recuperação',
      description: 'Processos de recuperação fiscal',
      icon: <FileCheck className="h-5 w-5 text-white" />,
      route: `/admin/recovery?client=${client.id}`,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700'
    },
    {
      id: 'credit_identification',
      title: 'Identificação',
      description: 'Identificação de créditos tributários',
      icon: <FileSearch className="h-5 w-5 text-white" />,
      route: `/admin/credit-identification?client=${client.id}`,
      color: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700'
    },
    {
      id: 'calculations',
      title: 'Cálculos IRRF',
      description: 'Cálculo e simulação de IRRF',
      icon: <Calculator className="h-5 w-5 text-white" />,
      route: `/admin/calculations?client=${client.id}`,
      color: 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700'
    },
    {
      id: 'reports',
      title: 'Relatórios',
      description: 'Relatórios e análises fiscais',
      icon: <BarChart className="h-5 w-5 text-white" />,
      route: `/admin/fiscal-reports?client=${client.id}`,
      color: 'bg-gradient-to-br from-rose-500 via-rose-600 to-red-700'
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Configurações do cliente',
      icon: <Settings className="h-5 w-5 text-white" />,
      route: `/admin/client-settings?client=${client.id}`,
      color: 'bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700'
    },
    {
      id: 'support',
      title: 'Suporte',
      description: 'Suporte técnico e ajuda',
      icon: <HelpCircle className="h-5 w-5 text-white" />,
      route: `/admin/support?client=${client.id}`,
      color: 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700'
    },
  ];

  const handleButtonClick = (operation: OperationButton) => {
    toast({
      title: `Acessando ${operation.title}`,
      description: `Gerenciando ${operation.title} para ${client.name}`,
    });
    navigate(operation.route);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Operações Disponíveis</CardTitle>
        <CardDescription>
          Acesse as operações disponíveis para este cliente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {operationButtons.map((operation) => (
            <motion.button
              key={operation.id}
              onClick={() => handleButtonClick(operation)}
              className={`${operation.color} text-white p-4 rounded-lg shadow-md flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ y: 0 }}
                whileHover={{ y: -3 }}
                className="bg-white/20 p-2 rounded-full"
              >
                {operation.icon}
              </motion.div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">{operation.title}</h3>
                <p className="text-xs opacity-80">{operation.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientOperationsAccess;
