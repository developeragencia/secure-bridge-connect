import { api } from '@/lib/api';
import { CreditAnalysis, CreditTransaction } from '@/types/proposal';

interface CreateAnalysisData {
  clientId: string;
  period: {
    start: string;
    end: string;
  };
}

interface UpdateTransactionData {
  id: string;
  status: CreditTransaction['status'];
  observations?: string;
}

interface GetAnalysesParams {
  clientId?: string;
  status?: CreditAnalysis['status'];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface AnalysesResponse {
  analyses: CreditAnalysis[];
  total: number;
  page: number;
  totalPages: number;
}

export const creditAnalysisService = {
  async getAnalyses(params?: GetAnalysesParams): Promise<AnalysesResponse> {
    try {
      const { data } = await api.get<AnalysesResponse>('/credit-analyses', { params });
      return data;
    } catch (error) {
      console.error('Erro ao buscar análises:', error);
      throw error;
    }
  },

  async getAnalysisById(id: string): Promise<CreditAnalysis> {
    try {
      const { data } = await api.get<CreditAnalysis>(`/credit-analyses/${id}`);
      return data;
    } catch (error) {
      console.error('Erro ao buscar análise:', error);
      throw error;
    }
  },

  async createAnalysis(data: CreateAnalysisData): Promise<CreditAnalysis> {
    try {
      const { data: response } = await api.post<CreditAnalysis>('/credit-analyses', data);
      return response;
    } catch (error) {
      console.error('Erro ao criar análise:', error);
      throw error;
    }
  },

  async updateTransactionStatus(analysisId: string, data: UpdateTransactionData): Promise<CreditAnalysis> {
    try {
      const { data: response } = await api.patch<CreditAnalysis>(
        `/credit-analyses/${analysisId}/transactions/${data.id}`,
        {
          status: data.status,
          observations: data.observations,
        }
      );
      return response;
    } catch (error) {
      console.error('Erro ao atualizar status da transação:', error);
      throw error;
    }
  },

  async cancelAnalysis(id: string): Promise<void> {
    try {
      await api.delete(`/credit-analyses/${id}`);
    } catch (error) {
      console.error('Erro ao cancelar análise:', error);
      throw error;
    }
  },

  async downloadReport(id: string, format: 'pdf' | 'xlsx' = 'pdf'): Promise<Blob> {
    try {
      const { data } = await api.get<Blob>(
        `/credit-analyses/${id}/report`,
        {
          params: { format },
          responseType: 'blob',
        }
      );
      return data;
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
      throw error;
    }
  },

  async uploadTransactions(analysisId: string, file: File): Promise<CreditAnalysis> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await api.post<CreditAnalysis>(
        `/credit-analyses/${analysisId}/transactions/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (error) {
      console.error('Erro ao fazer upload de transações:', error);
      throw error;
    }
  },

  async applyRetentionRules(analysisId: string): Promise<CreditAnalysis> {
    try {
      const { data } = await api.post<CreditAnalysis>(
        `/credit-analyses/${analysisId}/apply-rules`
      );
      return data;
    } catch (error) {
      console.error('Erro ao aplicar regras de retenção:', error);
      throw error;
    }
  },

  async getRetentionRules(): Promise<{
    id: string;
    code: string;
    description: string;
    conditions: string[];
    retentionPercentage: number;
    active: boolean;
  }[]> {
    try {
      const { data } = await api.get('/retention-rules');
      return data;
    } catch (error) {
      console.error('Erro ao buscar regras de retenção:', error);
      throw error;
    }
  },
}; 