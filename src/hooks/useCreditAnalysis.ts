import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { creditAnalysisService } from '@/services/creditAnalysisService';
import { CreditAnalysis } from '@/types/proposal';
import { useToast } from '@/components/ui/use-toast';

interface UseAnalysesParams {
  clientId?: string;
  status?: CreditAnalysis['status'];
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useCreditAnalyses(params?: UseAnalysesParams) {
  return useQuery({
    queryKey: ['credit-analyses', params],
    queryFn: () => creditAnalysisService.getAnalyses(params),
    enabled: params?.enabled !== false,
  });
}

export function useCreditAnalysis(id: string) {
  return useQuery({
    queryKey: ['credit-analysis', id],
    queryFn: () => creditAnalysisService.getAnalysisById(id),
    enabled: !!id,
  });
}

export function useCreateAnalysis() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: creditAnalysisService.createAnalysis,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analyses'] });
      toast({
        title: 'Análise criada com sucesso',
        description: 'A análise de créditos foi iniciada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar análise',
        description: 'Ocorreu um erro ao criar a análise. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateTransactionStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ analysisId, ...data }: { analysisId: string } & Parameters<typeof creditAnalysisService.updateTransactionStatus>[1]) =>
      creditAnalysisService.updateTransactionStatus(analysisId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast({
        title: 'Status atualizado',
        description: 'O status da transação foi atualizado com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar status',
        description: 'Ocorreu um erro ao atualizar o status da transação. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useCancelAnalysis() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: creditAnalysisService.cancelAnalysis,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analyses'] });
      queryClient.removeQueries({ queryKey: ['credit-analysis', id] });
      toast({
        title: 'Análise cancelada',
        description: 'A análise de créditos foi cancelada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao cancelar análise',
        description: 'Ocorreu um erro ao cancelar a análise. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useDownloadReport() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: creditAnalysisService.downloadReport,
    onSuccess: (data, variables) => {
      // Cria um URL para o blob e força o download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `analise-creditos-${variables[0]}.${variables[1] || 'pdf'}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Download iniciado',
        description: 'O relatório está sendo baixado.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao baixar relatório',
        description: 'Ocorreu um erro ao baixar o relatório. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useUploadTransactions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: creditAnalysisService.uploadTransactions,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast({
        title: 'Upload concluído',
        description: 'As transações foram importadas com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro no upload',
        description: 'Ocorreu um erro ao importar as transações. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useApplyRetentionRules() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: creditAnalysisService.applyRetentionRules,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['credit-analysis', data.id] });
      toast({
        title: 'Regras aplicadas',
        description: 'As regras de retenção foram aplicadas com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao aplicar regras',
        description: 'Ocorreu um erro ao aplicar as regras de retenção. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useRetentionRules() {
  return useQuery({
    queryKey: ['retention-rules'],
    queryFn: creditAnalysisService.getRetentionRules,
  });
} 