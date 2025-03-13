
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuditAction } from './types';

export const formatDate = (date: Date) => {
  return format(date, "dd/MM/yyyy HH:mm", { locale: ptBR });
};

export const getActionBadge = (action: AuditAction) => {
  const config: Record<AuditAction, { label: string, class: string }> = {
    create: { label: 'Criação', class: 'bg-green-100 text-green-800' },
    update: { label: 'Atualização', class: 'bg-blue-100 text-blue-800' },
    delete: { label: 'Exclusão', class: 'bg-red-100 text-red-800' },
    status_change: { label: 'Mudança de Status', class: 'bg-purple-100 text-purple-800' },
    calculation: { label: 'Cálculo', class: 'bg-yellow-100 text-yellow-800' },
    export: { label: 'Exportação', class: 'bg-indigo-100 text-indigo-800' },
    import: { label: 'Importação', class: 'bg-pink-100 text-pink-800' }
  };
  
  const style = config[action];
  return {
    label: style.label,
    className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.class}`
  };
};
