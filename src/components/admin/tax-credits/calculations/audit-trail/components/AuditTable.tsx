
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AuditTrail } from '../types';
import AuditTableRow from './AuditTableRow';

interface AuditTableProps {
  audits: AuditTrail[];
  onViewDetails: (audit: AuditTrail) => void;
}

const AuditTable: React.FC<AuditTableProps> = ({ audits, onViewDetails }) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data/Hora</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Ação</TableHead>
            <TableHead>Recurso</TableHead>
            <TableHead>IP</TableHead>
            <TableHead className="text-center">Detalhes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {audits.length > 0 ? (
            audits.map((audit) => (
              <AuditTableRow 
                key={audit.id} 
                audit={audit} 
                onViewDetails={onViewDetails} 
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Nenhum registro de auditoria encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditTable;
