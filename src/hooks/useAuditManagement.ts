
import { useState } from 'react';
import { Audit, AuditSummary } from '@/types/audit';
import { useToast } from '@/components/ui/use-toast';

export const useAuditManagement = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [audits, setAudits] = useState<Audit[]>([
    {
      id: '1',
      clientName: 'Empresa ABC Ltda',
      documentNumber: '12.345.678/0001-90',
      auditType: 'IRPJ',
      status: 'PENDENTE',
      date: '2023-08-15',
      startDate: '2023-08-15',
      deadline: '2023-09-15',
      assignedTo: 'João Silva',
      priority: 'Alta',
      documentsCount: 5,
      notes: 'Auditoria regular anual'
    },
    {
      id: '2',
      clientName: 'Tech Solutions S.A.',
      documentNumber: '23.456.789/0001-23',
      auditType: 'CSLL',
      status: 'EM_ANDAMENTO',
      date: '2023-07-20',
      startDate: '2023-07-20',
      deadline: '2023-08-20',
      assignedTo: 'Maria Oliveira',
      priority: 'Média',
      documentsCount: 8,
      notes: 'Verificação de despesas operacionais'
    },
    {
      id: '3',
      clientName: 'Distribuidora XYZ',
      documentNumber: '34.567.890/0001-45',
      auditType: 'PIS/COFINS',
      status: 'CONCLUIDA',
      date: '2023-06-10',
      startDate: '2023-06-10',
      deadline: '2023-07-10',
      completionDate: '2023-07-08',
      assignedTo: 'Carlos Santos',
      priority: 'Baixa',
      documentsCount: 12,
      notes: 'Créditos de exportação'
    },
    {
      id: '4',
      clientName: 'Indústrias Reunidas',
      documentNumber: '45.678.901/0001-67',
      auditType: 'IPI',
      status: 'PENDENTE',
      date: '2023-09-01',
      startDate: '2023-09-01',
      deadline: '2023-10-01',
      assignedTo: 'Paulo Mendes',
      priority: 'Alta',
      documentsCount: 3,
      notes: 'Auditoria de créditos acumulados'
    },
    {
      id: '5',
      clientName: 'Consultoria Financeira',
      documentNumber: '56.789.012/0001-89',
      auditType: 'IRRF',
      status: 'CANCELADA',
      date: '2023-05-15',
      startDate: '2023-05-15',
      deadline: '2023-06-15',
      assignedTo: 'Ana Pereira',
      priority: 'Média',
      documentsCount: 6,
      notes: 'Cancelada a pedido do cliente'
    }
  ]);

  const [auditSummary, setAuditSummary] = useState<AuditSummary>({
    totalAudits: 5,
    pendingAudits: 2,
    inProgressAudits: 1,
    completedAudits: 1,
    total: 5,
    pendentes: 2,
    emAndamento: 1,
    concluidas: 1
  });

  const viewDetails = (auditId: string) => {
    toast({
      title: "Detalhes da Auditoria",
      description: `Visualizando detalhes da auditoria ID: ${auditId}`,
    });
  };

  const downloadDocuments = (auditId: string) => {
    toast({
      title: "Download de Documentos",
      description: `Iniciando download dos documentos da auditoria ID: ${auditId}`,
    });
  };

  const editAudit = (auditId: string) => {
    toast({
      title: "Editar Auditoria",
      description: `Editando auditoria ID: ${auditId}`,
    });
  };

  const deleteAudit = (auditId: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAudits(audits.filter(audit => audit.id !== auditId));
      
      // Update summary
      const updatedSummary = { ...auditSummary };
      updatedSummary.totalAudits -= 1;
      updatedSummary.total -= 1;
      
      const deletedAudit = audits.find(audit => audit.id === auditId);
      if (deletedAudit) {
        if (deletedAudit.status === 'PENDENTE') {
          updatedSummary.pendingAudits -= 1;
          updatedSummary.pendentes -= 1;
        } else if (deletedAudit.status === 'EM_ANDAMENTO') {
          updatedSummary.inProgressAudits -= 1;
          updatedSummary.emAndamento -= 1;
        } else if (deletedAudit.status === 'CONCLUIDA') {
          updatedSummary.completedAudits -= 1;
          updatedSummary.concluidas -= 1;
        }
      }
      
      setAuditSummary(updatedSummary);
      setIsLoading(false);
      
      toast({
        title: "Auditoria Excluída",
        description: `A auditoria ID: ${auditId} foi excluída com sucesso`,
      });
    }, 1000);
  };

  const approveAudit = (auditId: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedAudits = audits.map(audit => {
        if (audit.id === auditId) {
          return {
            ...audit,
            status: 'CONCLUIDA',
            completionDate: new Date().toISOString().split('T')[0]
          };
        }
        return audit;
      });
      
      setAudits(updatedAudits);
      
      // Update summary
      const updatedSummary = { ...auditSummary };
      const updatedAudit = updatedAudits.find(audit => audit.id === auditId);
      
      if (updatedAudit) {
        if (updatedAudit.status === 'CONCLUIDA') {
          const oldAudit = audits.find(audit => audit.id === auditId);
          if (oldAudit?.status === 'PENDENTE') {
            updatedSummary.pendingAudits -= 1;
            updatedSummary.pendentes -= 1;
          } else if (oldAudit?.status === 'EM_ANDAMENTO') {
            updatedSummary.inProgressAudits -= 1;
            updatedSummary.emAndamento -= 1;
          }
          updatedSummary.completedAudits += 1;
          updatedSummary.concluidas += 1;
        }
      }
      
      setAuditSummary(updatedSummary);
      setIsLoading(false);
      
      toast({
        title: "Auditoria Aprovada",
        description: `A auditoria ID: ${auditId} foi aprovada com sucesso`,
        variant: "success",
      });
    }, 1000);
  };

  const addNewAudit = (newAudit: Audit) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Add new audit to list
      setAudits([newAudit, ...audits]);
      
      // Update summary
      const updatedSummary = { ...auditSummary };
      updatedSummary.totalAudits += 1;
      updatedSummary.total += 1;
      
      if (newAudit.status === 'PENDENTE') {
        updatedSummary.pendingAudits += 1;
        updatedSummary.pendentes += 1;
      } else if (newAudit.status === 'EM_ANDAMENTO') {
        updatedSummary.inProgressAudits += 1;
        updatedSummary.emAndamento += 1;
      } else if (newAudit.status === 'CONCLUIDA') {
        updatedSummary.completedAudits += 1;
        updatedSummary.concluidas += 1;
      }
      
      setAuditSummary(updatedSummary);
      setIsLoading(false);
      
      toast({
        title: "Auditoria Criada",
        description: `Nova auditoria criada com sucesso para ${newAudit.clientName}`,
        variant: "success",
      });
    }, 1000);
  };

  const filterAudits = (searchTerm: string) => {
    if (!searchTerm) {
      return audits;
    }
    
    searchTerm = searchTerm.toLowerCase();
    return audits.filter(audit => 
      audit.clientName.toLowerCase().includes(searchTerm) ||
      audit.documentNumber.toLowerCase().includes(searchTerm) ||
      audit.auditType.toLowerCase().includes(searchTerm)
    );
  };

  return {
    audits,
    auditSummary,
    isLoading,
    viewDetails,
    downloadDocuments,
    editAudit,
    deleteAudit,
    approveAudit,
    addNewAudit,
    filterAudits
  };
};
