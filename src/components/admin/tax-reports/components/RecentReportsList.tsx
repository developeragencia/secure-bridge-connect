
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const RecentReportsList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatórios Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center justify-between p-3 border rounded-md">
              <div>
                <p className="font-medium">Relatório Fiscal {item}</p>
                <p className="text-sm text-muted-foreground">Gerado em {new Date().toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentReportsList;
