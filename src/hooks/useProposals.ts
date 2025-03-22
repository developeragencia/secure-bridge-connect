import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { proposalService } from '@/services/proposalService';
import { Proposal, ProposalFilters } from '@/types/proposal';
import { useToast } from '@/components/ui/use-toast';

interface UseProposalsParams extends ProposalFilters {
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export function useProposals(params?: UseProposalsParams) {
  return useQuery({
    queryKey: ['proposals', params],
    queryFn: () => proposalService.getProposals(params),
    enabled: params?.enabled !== false,
  });
}

export function useProposal(id: string) {
  return useQuery({
    queryKey: ['proposal', id],
    queryFn: () => proposalService.getProposalById(id),
    enabled: !!id,
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.createProposal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast({
        title: 'Proposta criada com sucesso',
        description: `A proposta "${data.title}" foi criada com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar proposta',
        description: 'Ocorreu um erro ao criar a proposta. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateProposal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.updateProposal,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      toast({
        title: 'Proposta atualizada com sucesso',
        description: `A proposta "${data.title}" foi atualizada com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar proposta',
        description: 'Ocorreu um erro ao atualizar a proposta. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateProposalStatus() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.updateProposalStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      toast({
        title: 'Status atualizado com sucesso',
        description: `O status da proposta "${data.title}" foi atualizado com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar status',
        description: 'Ocorreu um erro ao atualizar o status da proposta. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteProposal() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.deleteProposal,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.removeQueries({ queryKey: ['proposal', id] });
      toast({
        title: 'Proposta excluída com sucesso',
        description: 'A proposta foi excluída com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao excluir proposta',
        description: 'Ocorreu um erro ao excluir a proposta. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useConvertToContract() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.convertToContract,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['proposal', data.id] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
      toast({
        title: 'Proposta convertida em contrato',
        description: `A proposta "${data.title}" foi convertida em contrato com sucesso.`,
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao converter proposta',
        description: 'Ocorreu um erro ao converter a proposta em contrato. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
}

export function useDownloadAttachment() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: proposalService.downloadAttachment,
    onSuccess: (data, variables) => {
      // Cria um URL para o blob e força o download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attachment-${variables.attachmentId}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error) => {
      toast({
        title: 'Erro ao baixar anexo',
        description: 'Ocorreu um erro ao baixar o anexo. Tente novamente.',
        variant: 'destructive',
      });
    },
  });
} 