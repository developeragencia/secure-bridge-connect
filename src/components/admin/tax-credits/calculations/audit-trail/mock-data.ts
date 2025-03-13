
import { AuditTrail } from './types';
import { subDays, subHours, subMinutes } from 'date-fns';

// Generate mock audit logs
export const mockAuditLogs: AuditTrail[] = [
  {
    id: "audit-001",
    date: subMinutes(new Date(), 15),
    userName: "João Silva",
    userRole: "Administrador",
    action: "create",
    resourceName: "Cálculo IRRF",
    resourceId: "calc-001",
    details: "Criação de novo cálculo de IRRF para o cliente ABC Ltda.",
    ipAddress: "192.168.1.100"
  },
  {
    id: "audit-002",
    date: subHours(new Date(), 2),
    userName: "Maria Oliveira",
    userRole: "Analista Fiscal",
    action: "update",
    resourceName: "Cliente",
    resourceId: "client-002",
    details: "Atualização de dados cadastrais do cliente XYZ Comércio.",
    ipAddress: "192.168.1.101"
  },
  {
    id: "audit-003",
    date: subDays(new Date(), 1),
    userName: "Carlos Mendes",
    userRole: "Contador",
    action: "delete",
    resourceName: "Documento",
    resourceId: "doc-003",
    details: "Exclusão de documento duplicado do cliente ABC Ltda.",
    ipAddress: "192.168.1.102"
  },
  {
    id: "audit-004",
    date: subHours(new Date(), 5),
    userName: "João Silva",
    userRole: "Administrador",
    action: "status_change",
    resourceName: "Crédito Tributário",
    resourceId: "credit-004",
    details: "Alteração de status de crédito tributário de 'Em Análise' para 'Aprovado'.",
    ipAddress: "192.168.1.100",
    previousStatus: "ANALYZING",
    newStatus: "APPROVED"
  },
  {
    id: "audit-005",
    date: subDays(new Date(), 2),
    userName: "Amanda Costa",
    userRole: "Analista Financeiro",
    action: "calculation",
    resourceName: "Correção SELIC",
    resourceId: "selic-005",
    details: "Cálculo de correção SELIC para crédito tributário.",
    ipAddress: "192.168.1.103"
  },
  {
    id: "audit-006",
    date: subHours(new Date(), 12),
    userName: "Maria Oliveira",
    userRole: "Analista Fiscal",
    action: "export",
    resourceName: "Relatório",
    resourceId: "report-006",
    details: "Exportação de relatório fiscal para o cliente DEF Indústria.",
    ipAddress: "192.168.1.101"
  },
  {
    id: "audit-007",
    date: subDays(new Date(), 3),
    userName: "Carlos Mendes",
    userRole: "Contador",
    action: "import",
    resourceName: "Dados Fiscais",
    resourceId: "import-007",
    details: "Importação de dados fiscais para o cliente GHI Serviços.",
    ipAddress: "192.168.1.102"
  },
  {
    id: "audit-008",
    date: subHours(new Date(), 36),
    userName: "Amanda Costa",
    userRole: "Analista Financeiro",
    action: "create",
    resourceName: "Proposta",
    resourceId: "proposal-008",
    details: "Criação de nova proposta comercial para o cliente JKL Consultoria.",
    ipAddress: "192.168.1.103"
  }
];
