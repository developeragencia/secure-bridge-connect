
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { 
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Shield,
  UserCheck,
  Key,
  User,
  Mail,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { UserRole } from '@/types/user';

// Sample user data
const sampleUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    role: 'admin_master' as UserRole,
    status: 'active',
    avatar: '',
    lastLogin: '2023-06-10T14:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@exemplo.com',
    role: 'staff_permanent' as UserRole,
    status: 'active',
    avatar: '',
    lastLogin: '2023-06-09T11:15:00Z'
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@exemplo.com',
    role: 'client' as UserRole,
    status: 'active',
    avatar: '',
    lastLogin: '2023-06-08T16:45:00Z'
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@exemplo.com',
    role: 'commercial_rep' as UserRole,
    status: 'inactive',
    avatar: '',
    lastLogin: '2023-05-20T09:30:00Z'
  },
  {
    id: '5',
    name: 'Paulo Mendes',
    email: 'paulo.mendes@exemplo.com',
    role: 'staff_outsourced' as UserRole,
    status: 'active',
    avatar: '',
    lastLogin: '2023-06-07T13:20:00Z'
  }
];

const UsersPermissionsPanel: React.FC = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUserDialog, setNewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof sampleUsers[0] | null>(null);
  
  // Form state for new user
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'client' as UserRole,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handleAddUser = () => {
    // Validate inputs
    if (!newUser.name || !newUser.email) {
      toast.error("Erro ao adicionar usuário", {
        description: "Todos os campos obrigatórios devem ser preenchidos."
      });
      return;
    }

    // Simulate adding a user
    const createdUser = {
      id: `${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      avatar: '',
      lastLogin: new Date().toISOString()
    };

    setUsers([...users, createdUser]);
    setNewUser({
      name: '',
      email: '',
      role: 'client' as UserRole,
    });
    setNewUserDialog(false);

    toast.success("Usuário adicionado", {
      description: "O usuário foi adicionado com sucesso."
    });
  };

  const handleEditUser = (user: typeof sampleUsers[0]) => {
    setSelectedUser(user);
  };

  const handleUpdateUser = () => {
    if (!selectedUser) return;

    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setSelectedUser(null);

    toast.success("Usuário atualizado", {
      description: "As informações do usuário foram atualizadas com sucesso."
    });
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        
        toast.success(`Status alterado para ${newStatus === 'active' ? 'Ativo' : 'Inativo'}`, {
          description: `O usuário ${user.name} agora está ${newStatus === 'active' ? 'ativo' : 'inativo'}.`
        });
        
        return {
          ...user,
          status: newStatus
        };
      }
      return user;
    }));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: UserRole) => {
    switch(role) {
      case 'admin_master':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin Master</Badge>;
      case 'staff_permanent':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Staff Permanente</Badge>;
      case 'staff_outsourced':
        return <Badge className="bg-cyan-100 text-cyan-800 border-cyan-200">Staff Terceirizado</Badge>;
      case 'client':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Cliente</Badge>;
      case 'commercial_rep':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Rep. Comercial</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuários e Permissões</h1>
        <Dialog open={newUserDialog} onOpenChange={setNewUserDialog}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Usuário</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para adicionar um novo usuário ao sistema.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input 
                  id="name" 
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Perfil de Acesso</Label>
                <Select 
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value as UserRole})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin_master">Admin Master</SelectItem>
                    <SelectItem value="staff_permanent">Staff Permanente</SelectItem>
                    <SelectItem value="staff_outsourced">Staff Terceirizado</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="commercial_rep">Representante Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewUserDialog(false)}>Cancelar</Button>
              <Button onClick={handleAddUser}>Adicionar Usuário</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="roles">Perfis de Acesso</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lista de Usuários</CardTitle>
              <CardDescription>
                Gerencie usuários do sistema e suas permissões
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar usuários..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <Select value={roleFilter} onValueChange={handleRoleFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Perfil de Acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os perfis</SelectItem>
                    <SelectItem value="admin_master">Admin Master</SelectItem>
                    <SelectItem value="staff_permanent">Staff Permanente</SelectItem>
                    <SelectItem value="staff_outsourced">Staff Terceirizado</SelectItem>
                    <SelectItem value="client">Cliente</SelectItem>
                    <SelectItem value="commercial_rep">Rep. Comercial</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Último Acesso</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                {user.avatar ? (
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                ) : null}
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.status === 'active'
                                  ? 'bg-green-100 text-green-800 border-green-200'
                                  : 'bg-gray-100 text-gray-800 border-gray-200'
                              }
                            >
                              {user.status === 'active' ? 'Ativo' : 'Inativo'}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(user.lastLogin)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                  <User className="mr-2 h-4 w-4" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Permissões
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleToggleStatus(user.id)}>
                                  {user.status === 'active' ? (
                                    <>
                                      <span className="text-red-600">Desativar</span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="text-green-600">Ativar</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Nenhum usuário encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Edit User Dialog */}
          {selectedUser && (
            <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Editar Usuário</DialogTitle>
                  <DialogDescription>
                    Atualize as informações do usuário selecionado.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nome</Label>
                    <Input 
                      id="edit-name" 
                      value={selectedUser.name}
                      onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">E-mail</Label>
                    <Input 
                      id="edit-email" 
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-role">Perfil de Acesso</Label>
                    <Select 
                      value={selectedUser.role}
                      onValueChange={(value) => setSelectedUser({...selectedUser, role: value as UserRole})}
                    >
                      <SelectTrigger id="edit-role">
                        <SelectValue placeholder="Selecione o perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin_master">Admin Master</SelectItem>
                        <SelectItem value="staff_permanent">Staff Permanente</SelectItem>
                        <SelectItem value="staff_outsourced">Staff Terceirizado</SelectItem>
                        <SelectItem value="client">Cliente</SelectItem>
                        <SelectItem value="commercial_rep">Representante Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select 
                      value={selectedUser.status}
                      onValueChange={(value) => setSelectedUser({...selectedUser, status: value})}
                    >
                      <SelectTrigger id="edit-status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>Cancelar</Button>
                  <Button onClick={handleUpdateUser}>Salvar Alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Perfis de Acesso</CardTitle>
              <CardDescription>
                Gerenciamento de funções e responsabilidades de usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Shield className="h-5 w-5 text-purple-800" />
                        </div>
                        <div>
                          <h3 className="font-medium">Admin Master</h3>
                          <p className="text-xs text-muted-foreground">Acesso completo ao sistema</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin Master</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Permissões principais</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Gerenciar usuários</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Configurações do sistema</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Acesso a todos os módulos</Label>
                            <Switch checked disabled />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Usuários neste perfil</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-100">
                            João Silva
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <UserCheck className="h-5 w-5 text-blue-800" />
                        </div>
                        <div>
                          <h3 className="font-medium">Staff Permanente</h3>
                          <p className="text-xs text-muted-foreground">Funcionários em tempo integral</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">Staff Permanente</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Permissões principais</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Gerenciar clientes</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Acesso a relatórios</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Configurações limitadas</Label>
                            <Switch checked disabled />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Usuários neste perfil</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-100">
                            Maria Santos
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <User className="h-5 w-5 text-green-800" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cliente</h3>
                          <p className="text-xs text-muted-foreground">Acesso limitado a dados próprios</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">Cliente</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Permissões principais</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Visualizar seus dados</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Acesso ao dashboard</Label>
                            <Switch checked disabled />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label className="text-xs">Solicitar relatórios</Label>
                            <Switch checked disabled />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Usuários neste perfil</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-gray-100">
                            Carlos Oliveira
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Permissões</CardTitle>
              <CardDescription>
                Configuração detalhada de permissões por perfil de acesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Módulo/Funcionalidade</TableHead>
                      <TableHead>Admin Master</TableHead>
                      <TableHead>Staff</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Rep. Comercial</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Gestão de Usuários</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Limitado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Créditos Tributários</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">Visualizar</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Limitado</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gestão de Clientes</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Limitado</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Relatórios</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">Visualizar</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">Visualizar</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Configurações</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Limitado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Auditorias</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Limitado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800">Negado</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPermissionsPanel;
