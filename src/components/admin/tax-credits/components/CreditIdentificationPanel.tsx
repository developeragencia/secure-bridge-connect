
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';
import { FileSearch, Settings, Filter, Calendar, Download, RefreshCw } from "lucide-react";
import { useClientStore } from '@/hooks/useClientStore';
import { useActiveClient } from '@/hooks/useActiveClient';
import NewCreditAnalysisModal, { AnalysisFormData } from './NewCreditAnalysisModal';
import AnalysisSettings from './settings/AnalysisSettings';
import CreditStats from './stats/CreditStats';
import CreditSearch from './search/CreditSearch';
import CreditTabs from './tabs/CreditTabs';
import AnalysisProgressCard from './analysis/AnalysisProgressCard';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MOCK_CREDITS = [
  {
    id: 'CR-1001',
    supplier: 'Empresa de Tecnologia Ltda',
    cnpj: '12.345.678/0001-23',
    paymentDate: '2023-06-15',
    paymentAmount: 25000.00,
    taxableAmount: 20000.00,
    retentionRate: 1.5,
    retentionAmount: 300.00,
    correctionAmount: 28.50,
    totalCredit: 328.50,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'technology',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 27',
    retentionRequired: true
  },
  {
    id: 'CR-1002',
    supplier: 'Consultoria Financeira S/A',
    cnpj: '23.456.789/0001-34',
    paymentDate: '2023-07-10',
    paymentAmount: 35000.00,
    taxableAmount: 35000.00,
    retentionRate: 1.5,
    retentionAmount: 525.00,
    correctionAmount: 42.00,
    totalCredit: 567.00,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'consulting',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 35',
    retentionRequired: true
  },
  {
    id: 'CR-1003',
    supplier: 'Serviços Gráficos ME',
    cnpj: '34.567.890/0001-45',
    paymentDate: '2023-08-05',
    paymentAmount: 8500.00,
    taxableAmount: 8500.00,
    retentionRate: 1.5,
    retentionAmount: 127.50,
    correctionAmount: 8.50,
    totalCredit: 136.00,
    identificationDate: '2023-10-22',
    status: 'approved',
    category: 'printing',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 27',
    retentionRequired: true
  },
  {
    id: 'CR-1004',
    supplier: 'Manutenção Predial Eireli',
    cnpj: '45.678.901/0001-56',
    paymentDate: '2023-08-18',
    paymentAmount: 12000.00,
    taxableAmount: 12000.00,
    retentionRate: 1.5,
    retentionAmount: 180.00,
    correctionAmount: 10.80,
    totalCredit: 190.80,
    identificationDate: '2023-10-22',
    status: 'rejected',
    category: 'maintenance',
    rejectionReason: 'Serviço isento de retenção conforme IN RFB 1234/2012',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 40 (Exceção)',
    retentionRequired: false
  },
  {
    id: 'CR-1005',
    supplier: 'Sistemas de Segurança S/A',
    cnpj: '56.789.012/0001-67',
    paymentDate: '2023-09-01',
    paymentAmount: 18500.00,
    taxableAmount: 15000.00,
    retentionRate: 1.5,
    retentionAmount: 225.00,
    correctionAmount: 11.25,
    totalCredit: 236.25,
    identificationDate: '2023-10-22',
    status: 'pending',
    category: 'security',
    supplierType: 'service',
    applicableRule: 'IN RFB 1234/2012, Art. 32',
    retentionRequired: true
  }
];

const CreditIdentificationPanel = () => {
  const [activeTab, setActiveTab] = useState('identification');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportFormat, setExportFormat] = useState('excel');
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('60');
  const [advancedSettings, setAdvancedSettings] = useState({
    monthsToAnalyze: 60,
    includeCorrectionSelic: true,
    minimumCreditValue: 100,
    automaticallyApprove: false,
    applyRetentionRules: true,
    useHistoricalData: true,
    includeExemptSuppliers: false
  });
  
  const { activeClient } = useClientStore();
  const { activeClient: client, hasViewAccess, hasEditAccess } = useActiveClient();
  const { toast } = useToast();

  const filteredCredits = MOCK_CREDITS.filter(credit => 
    credit.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
    credit.cnpj.includes(searchQuery) ||
    credit.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartAnalysis = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente ativo para iniciar a análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalysisModalOpen(true);
  };

  const handleAnalysisSubmit = (data: AnalysisFormData) => {
    setIsAnalysisModalOpen(false);
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast({
      title: "Análise iniciada",
      description: `Analisando dados do cliente "${activeClient?.name}" no período selecionado.`,
    });
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            toast({
              title: "Análise concluída",
              description: "Foram identificados 5 possíveis créditos tributários.",
            });
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 800);
  };

  const handleQuickAnalysis = () => {
    if (!activeClient) {
      toast({
        title: "Cliente não selecionado",
        description: "Selecione um cliente ativo para iniciar a análise.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    toast({
      title: "Análise automática iniciada",
      description: `Analisando pagamentos dos últimos ${selectedPeriod} meses para ${activeClient?.name}.`,
    });
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsAnalyzing(false);
            toast({
              title: "Análise automática concluída",
              description: `Foram identificados 5 créditos tributários com base nas regras do Manual de Retenções IRPJ.`,
            });
          }, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 1;
      });
    }, 600);
  };

  const handleExportCredits = () => {
    toast({
      title: `Exportando dados em formato ${exportFormat.toUpperCase()}`,
      description: "O download dos dados será iniciado em breve.",
    });
    setShowExportOptions(false);
  };

  const handleApproveCredit = (creditId: string) => {
    toast({
      title: "Crédito aprovado",
      description: `O crédito ${creditId} foi aprovado e será incluído nos relatórios.`,
      variant: "default"
    });
  };

  const handleRejectCredit = (creditId: string) => {
    toast({
      title: "Crédito rejeitado",
      description: `O crédito ${creditId} foi rejeitado e não será considerado para recuperação.`,
      variant: "destructive"
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de identificação de créditos foram atualizadas.",
    });
    setShowSettings(false);
  };

  const totalIdentifiedCredits = MOCK_CREDITS.reduce((sum, credit) => sum + credit.totalCredit, 0);
  const approvedCredits = MOCK_CREDITS.filter(credit => credit.status === 'approved');
  const totalApprovedValue = approvedCredits.reduce((sum, credit) => sum + credit.totalCredit, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Identificação de Créditos</h2>
          <p className="text-muted-foreground">
            Identifique automaticamente os créditos tributários de IRRF/PJ.
          </p>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap gap-2">
          <Select
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Período de Análise</SelectLabel>
                <SelectItem value="12">Últimos 12 meses</SelectItem>
                <SelectItem value="24">Últimos 24 meses</SelectItem>
                <SelectItem value="36">Últimos 36 meses</SelectItem>
                <SelectItem value="48">Últimos 48 meses</SelectItem>
                <SelectItem value="60">Últimos 60 meses</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowExportOptions(true)}
          >
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsConfirmDialog(true)}
            disabled={isAnalyzing}
          >
            <FileSearch className="h-4 w-4" />
            {isAnalyzing ? "Analisando..." : "Análise Rápida"}
          </Button>
          <Button 
            variant="default"
            className="flex items-center gap-2"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            <RefreshCw className="h-4 w-4" />
            {isAnalyzing ? "Analisando..." : "Análise Completa"}
          </Button>
        </div>
      </div>

      {showSettings && (
        <AnalysisSettings 
          advancedSettings={advancedSettings}
          setAdvancedSettings={setAdvancedSettings}
          setShowSettings={setShowSettings}
          onSave={handleSaveSettings}
        />
      )}

      {isAnalyzing && (
        <AnalysisProgressCard 
          analysisProgress={analysisProgress}
          onCancel={() => setIsAnalyzing(false)}
        />
      )}

      <CreditStats 
        totalIdentifiedCredits={totalIdentifiedCredits}
        approvedCredits={approvedCredits}
        totalApprovedValue={totalApprovedValue}
        allCredits={MOCK_CREDITS}
      />

      <CreditSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <CreditTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredCredits={filteredCredits}
        onApprove={handleApproveCredit}
        onReject={handleRejectCredit}
      />

      <NewCreditAnalysisModal 
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onSubmit={handleAnalysisSubmit}
      />

      <AlertDialog open={isConfirmDialog} onOpenChange={setIsConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Iniciar Análise Automática</AlertDialogTitle>
            <AlertDialogDescription>
              Isso iniciará uma análise automática dos pagamentos realizados nos últimos {selectedPeriod} meses, 
              aplicando as regras do Manual de Retenções IRPJ e classificando automaticamente os fornecedores.
              
              Este processo pode demorar alguns minutos dependendo do volume de dados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleQuickAnalysis}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showExportOptions} onOpenChange={setShowExportOptions}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Exportar Créditos Identificados</AlertDialogTitle>
            <AlertDialogDescription>
              Selecione o formato de exportação dos créditos tributários identificados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Select
              value={exportFormat}
              onValueChange={setExportFormat}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Formato do Arquivo</SelectLabel>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleExportCredits}>Exportar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreditIdentificationPanel;
