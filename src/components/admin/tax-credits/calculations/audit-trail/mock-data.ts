
import { AuditLogEntry } from './types';
import { format, subDays, subHours, subMinutes } from 'date-fns';

// Generate mock audit logs
export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: "audit-001",
    timestamp: subMinutes(new Date(), 15).toISOString(),
    user: {
      id: "user-001",
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "https://ui-avatars.com/api/?name=JS"
    },
    action: "create",
    resource: "Cálculo IRRF",
    resourceId: "calc-001",
    details: "Criação de novo cálculo de IRRF para o cliente ABC Ltda.",
    ipAddress: "192.168.1.100",
    changes: {
      before: null,
      after: {
        clientId: "client-001",
        period: "2023-01",
        totalValue: 12500.00
      }
    }
  },
  {
    id: "audit-002",
    timestamp: subHours(new Date(), 2).toISOString(),
    user: {
      id: "user-002",
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      avatar: "https://ui-avatars.com/api/?name=MO"
    },
    action: "update",
    resource: "Cliente",
    resourceId: "client-002",
    details: "Atualização de dados cadastrais do cliente XYZ Comércio.",
    ipAddress: "192.168.1.101",
    changes: {
      before: {
        name: "XYZ Comércio",
        email: "contato@xyzcomercio.com",
        phone: "1133334444"
      },
      after: {
        name: "XYZ Comércio e Distribuição",
        email: "financeiro@xyzcomercio.com",
        phone: "1133335555"
      }
    }
  },
  {
    id: "audit-003",
    timestamp: subDays(new Date(), 1).toISOString(),
    user: {
      id: "user-003",
      name: "Carlos Mendes",
      email: "carlos.mendes@example.com",
      avatar: "https://ui-avatars.com/api/?name=CM"
    },
    action: "delete",
    resource: "Documento",
    resourceId: "doc-003",
    details: "Exclusão de documento duplicado do cliente ABC Ltda.",
    ipAddress: "192.168.1.102",
    changes: {
      before: {
        name: "Comprovante de Pagamento.pdf",
        size: "1.2MB",
        uploadDate: "2023-03-15"
      },
      after: null
    }
  },
  {
    id: "audit-004",
    timestamp: subHours(new Date(), 5).toISOString(),
    user: {
      id: "user-001",
      name: "João Silva",
      email: "joao.silva@example.com",
      avatar: "https://ui-avatars.com/api/?name=JS"
    },
    action: "status_change",
    resource: "Crédito Tributário",
    resourceId: "credit-004",
    details: "Alteração de status de crédito tributário de 'Em Análise' para 'Aprovado'.",
    ipAddress: "192.168.1.100",
    changes: {
      before: { status: "Em Análise" },
      after: { status: "Aprovado" }
    }
  },
  {
    id: "audit-005",
    timestamp: subDays(new Date(), 2).toISOString(),
    user: {
      id: "user-004",
      name: "Amanda Costa",
      email: "amanda.costa@example.com",
      avatar: "https://ui-avatars.com/api/?name=AC"
    },
    action: "calculation",
    resource: "Correção SELIC",
    resourceId: "selic-005",
    details: "Cálculo de correção SELIC para crédito tributário.",
    ipAddress: "192.168.1.103",
    changes: {
      before: { totalValue: 15000.00 },
      after: { totalValue: 15750.00, selicRate: "5.00%" }
    }
  },
  {
    id: "audit-006",
    timestamp: subHours(new Date(), 12).toISOString(),
    user: {
      id: "user-002",
      name: "Maria Oliveira",
      email: "maria.oliveira@example.com",
      avatar: "https://ui-avatars.com/api/?name=MO"
    },
    action: "export",
    resource: "Relatório",
    resourceId: "report-006",
    details: "Exportação de relatório fiscal para o cliente DEF Indústria.",
    ipAddress: "192.168.1.101",
    changes: {
      before: null,
      after: {
        reportType: "Fiscal",
        format: "PDF",
        period: "2023-Q1"
      }
    }
  },
  {
    id: "audit-007",
    timestamp: subDays(new Date(), 3).toISOString(),
    user: {
      id: "user-003",
      name: "Carlos Mendes",
      email: "carlos.mendes@example.com",
      avatar: "https://ui-avatars.com/api/?name=CM"
    },
    action: "import",
    resource: "Dados Fiscais",
    resourceId: "import-007",
    details: "Importação de dados fiscais para o cliente GHI Serviços.",
    ipAddress: "192.168.1.102",
    changes: {
      before: null,
      after: {
        fileType: "CSV",
        recordCount: 156,
        period: "2023-02"
      }
    }
  },
  {
    id: "audit-008",
    timestamp: subHours(new Date(), 36).toISOString(),
    user: {
      id: "user-004",
      name: "Amanda Costa",
      email: "amanda.costa@example.com",
      avatar: "https://ui-avatars.com/api/?name=AC"
    },
    action: "create",
    resource: "Proposta",
    resourceId: "proposal-008",
    details: "Criação de nova proposta comercial para o cliente JKL Consultoria.",
    ipAddress: "192.168.1.103",
    changes: {
      before: null,
      after: {
        clientId: "client-008",
        proposalValue: 25000.00,
        validUntil: "2023-06-30"
      }
    }
  }
];
