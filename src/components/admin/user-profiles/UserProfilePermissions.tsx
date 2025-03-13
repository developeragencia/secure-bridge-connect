
import React from 'react';
import { UserRole } from '@/types/client';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserProfilePermissionsProps {
  userRole: UserRole;
}

const UserProfilePermissions = ({ userRole }: UserProfilePermissionsProps) => {
  // Define permissions based on user role
  const permissions = {
    admin: {
      title: 'Administrador Master',
      description: 'Acesso total ao sistema e todas as funcionalidades.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: true },
        { name: 'Gerenciar clientes', allowed: true },
        { name: 'Acessar todos os clientes', allowed: true },
        { name: 'Gerenciar créditos tributários', allowed: true },
        { name: 'Executar auditorias', allowed: true },
        { name: 'Configurar sistema', allowed: true },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: true },
      ],
    },
    office: {
      title: 'Equipe do Escritório',
      description: 'Execução dividida entre permanente e terceirizada.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: true },
        { name: 'Acessar todos os clientes', allowed: true },
        { name: 'Gerenciar créditos tributários', allowed: true },
        { name: 'Executar auditorias', allowed: true },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    client: {
      title: 'Cliente (Órgão Público)',
      description: 'Visualização limitada, sem detalhes operacionais.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: false },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: false },
        { name: 'Executar auditorias', allowed: false },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    sales: {
      title: 'Representante Comercial',
      description: 'Acompanha a execução dos clientes que captou.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: false },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: false },
        { name: 'Executar auditorias', allowed: false },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    representative: {
      title: 'Representante',
      description: 'Acompanha a execução dos clientes associados.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: false },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: false },
        { name: 'Executar auditorias', allowed: false },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    staff: {
      title: 'Funcionário',
      description: 'Acesso limitado baseado em permissões específicas.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: true },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: true },
        { name: 'Executar auditorias', allowed: true },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
  };

  const roleInfo = permissions[userRole] || permissions.client;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card/50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{roleInfo.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{roleInfo.description}</p>
        </div>
        <Badge variant="outline" className="bg-primary/5 border-primary/10">
          <Shield className="h-3 w-3 mr-1 text-primary" />
          <span className="capitalize">{userRole}</span>
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roleInfo.capabilities.map((capability, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-center justify-between p-2 rounded-md",
              capability.allowed ? "bg-primary/5" : "bg-muted"
            )}
          >
            <span className="text-sm">{capability.name}</span>
            {capability.allowed ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePermissions;
