
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const RecentReportsList: React.FC = () => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState<string | null>(null);
  
  // Mock recent reports data
  const recentReports = [
    { id: '1', name: 'Relatório Fiscal 1', date: new Date().toLocaleDateString() },
    { id: '2', name: 'Relatório Fiscal 2', date: new Date(Date.now() - 86400000).toLocaleDateString() },
    { id: '3', name: 'Relatório Fiscal 3', date: new Date(Date.now() - 172800000).toLocaleDateString() },
  ];

  const handleDownload = (id: string) => {
    setDownloading(id);
    
    // Simulate download delay
    setTimeout(() => {
      setDownloading(null);
      toast({
        title: "Download concluído",
        description: `O relatório #${id} foi baixado com sucesso.`,
      });
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {recentReports.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            Nenhum relatório recente encontrado
          </div>
        ) : (
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-muted-foreground">Gerado em {report.date}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDownload(report.id)}
                  disabled={downloading === report.id}
                >
                  {downloading === report.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentReportsList;
