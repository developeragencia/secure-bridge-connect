
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, Download, Printer, Eye, FileDown, Send 
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Mock data for receipts
const mockReceipts = [
  { id: '1', supplier: 'Fornecedor A', document: '12.345.678/0001-90', date: '15/04/2023', amount: 'R$ 15.250,00', status: 'Emitido' },
  { id: '2', supplier: 'Fornecedor B', document: '23.456.789/0001-01', date: '23/05/2023', amount: 'R$ 8.750,30', status: 'Emitido' },
  { id: '3', supplier: 'Fornecedor C', document: '34.567.890/0001-12', date: '07/06/2023', amount: 'R$ 22.130,75', status: 'Pendente' },
  { id: '4', supplier: 'Fornecedor D', document: '45.678.901/0001-23', date: '18/06/2023', amount: 'R$ 5.480,90', status: 'Pendente' },
  { id: '5', supplier: 'Fornecedor E', document: '56.789.012/0001-34', date: '02/07/2023', amount: 'R$ 12.345,67', status: 'Emitido' },
];

const RetentionReceiptsPanel: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<null | typeof mockReceipts[0]>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedReceipts, setSelectedReceipts] = useState<string[]>([]);

  const filteredReceipts = mockReceipts.filter(receipt => 
    receipt.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.document.includes(searchTerm)
  );

  const handleGenerateReceipt = () => {
    setIsGenerating(true);
    
    // Simulate receipt generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Comprovante gerado com sucesso",
        description: "Seu comprovante está pronto para download.",
      });
    }, 1500);
  };

  const handlePreviewReceipt = (receipt: typeof mockReceipts[0]) => {
    setSelectedReceipt(receipt);
    setIsPreviewOpen(true);
  };

  const handleDownloadReceipt = (id: string) => {
    toast({
      title: "Download iniciado",
      description: `Fazendo o download do comprovante #${id}`,
    });
  };

  const handleSendReceipt = (id: string) => {
    toast({
      title: "Email enviado",
      description: `O comprovante #${id} foi enviado com sucesso.`,
    });
  };

  const handleSelectReceipt = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedReceipts([...selectedReceipts, id]);
    } else {
      setSelectedReceipts(selectedReceipts.filter(receiptId => receiptId !== id));
    }
  };

  const handleBulkDownload = () => {
    if (selectedReceipts.length === 0) {
      toast({
        title: "Nenhum comprovante selecionado",
        description: "Selecione pelo menos um comprovante para download.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Download em lote iniciado",
      description: `Baixando ${selectedReceipts.length} comprovantes.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Comprovantes de Retenção</h2>
          <p className="text-muted-foreground">Emissão de comprovantes para fornecedores e órgãos públicos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={selectedReceipts.length === 0} onClick={handleBulkDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download em Lote
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerar Novo Comprovante</CardTitle>
          <CardDescription>Preencha os dados para gerar um comprovante de retenção</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Fornecedor</Label>
              <Select>
                <SelectTrigger id="supplier">
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="supplier-1">Fornecedor A</SelectItem>
                  <SelectItem value="supplier-2">Fornecedor B</SelectItem>
                  <SelectItem value="supplier-3">Fornecedor C</SelectItem>
                  <SelectItem value="supplier-4">Fornecedor D</SelectItem>
                  <SelectItem value="supplier-5">Fornecedor E</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="receipt-type">Tipo de Comprovante</Label>
              <Select>
                <SelectTrigger id="receipt-type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="irrf">IRRF</SelectItem>
                  <SelectItem value="pis">PIS</SelectItem>
                  <SelectItem value="cofins">COFINS</SelectItem>
                  <SelectItem value="csll">CSLL</SelectItem>
                  <SelectItem value="inss">INSS</SelectItem>
                  <SelectItem value="iss">ISS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="receipt-date">Data de Competência</Label>
              <Input type="date" id="receipt-date" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="receipt-value">Valor da Retenção</Label>
              <Input type="text" id="receipt-value" placeholder="R$ 0,00" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="invoice">Nota Fiscal</Label>
              <Input type="text" id="invoice" placeholder="Número da nota fiscal" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="document">Documento</Label>
              <Input type="text" id="document" placeholder="CPF/CNPJ" />
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleGenerateReceipt} 
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>Gerando...</>
              ) : (
                <>
                  <FileDown className="mr-2 h-4 w-4" />
                  Gerar Comprovante
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Comprovantes Emitidos</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar por fornecedor ou CNPJ" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 w-8">
                    <Checkbox />
                  </th>
                  <th className="text-left py-3 px-2">Fornecedor</th>
                  <th className="text-left py-3 px-2">CNPJ</th>
                  <th className="text-left py-3 px-2">Data</th>
                  <th className="text-left py-3 px-2">Valor</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceipts.length > 0 ? (
                  filteredReceipts.map((receipt) => (
                    <tr key={receipt.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-2">
                        <Checkbox 
                          checked={selectedReceipts.includes(receipt.id)}
                          onCheckedChange={(checked) => handleSelectReceipt(receipt.id, !!checked)}
                        />
                      </td>
                      <td className="py-3 px-2">{receipt.supplier}</td>
                      <td className="py-3 px-2">{receipt.document}</td>
                      <td className="py-3 px-2">{receipt.date}</td>
                      <td className="py-3 px-2">{receipt.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          receipt.status === 'Emitido' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {receipt.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handlePreviewReceipt(receipt)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadReceipt(receipt.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleSendReceipt(receipt.id)}>
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-muted-foreground">
                      Nenhum comprovante encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Visualização do Comprovante</DialogTitle>
            <DialogDescription>
              Comprovante de retenção para {selectedReceipt?.supplier}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReceipt && (
            <div className="border rounded-md p-6 space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold">COMPROVANTE DE RETENÇÃO DE TRIBUTOS</h3>
                <p className="text-muted-foreground">Documento fiscal emitido conforme legislação vigente</p>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Fornecedor:</p>
                    <p className="font-medium">{selectedReceipt.supplier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CNPJ:</p>
                    <p className="font-medium">{selectedReceipt.document}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data de Emissão:</p>
                    <p className="font-medium">{selectedReceipt.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Retido:</p>
                    <p className="font-medium">{selectedReceipt.amount}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">Tributos Retidos:</p>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="border rounded p-2">
                      <p className="text-xs text-muted-foreground">IRRF (1,5%)</p>
                      <p className="font-medium">R$ 228,75</p>
                    </div>
                    <div className="border rounded p-2">
                      <p className="text-xs text-muted-foreground">PIS (0,65%)</p>
                      <p className="font-medium">R$ 99,13</p>
                    </div>
                    <div className="border rounded p-2">
                      <p className="text-xs text-muted-foreground">COFINS (3%)</p>
                      <p className="font-medium">R$ 457,50</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <p className="text-sm text-muted-foreground">Notas Fiscais Vinculadas:</p>
                  <p className="font-medium">NF-e 12345, NF-e 12346</p>
                </div>
                
                <div className="border-t pt-4 mt-4 text-center">
                  <p className="text-xs text-muted-foreground">Este documento tem validade fiscal e pode ser verificado no site da Receita Federal</p>
                  <p className="text-xs text-muted-foreground">Código de Verificação: ABC123DEF456GHI789</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>Fechar</Button>
            <Button onClick={() => {
              handleDownloadReceipt(selectedReceipt?.id || '');
              setIsPreviewOpen(false);
            }}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RetentionReceiptsPanel;
