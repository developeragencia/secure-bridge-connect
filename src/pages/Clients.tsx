
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientStore, Client } from '@/hooks/useClientStore';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { enUS } from 'date-fns/locale';
import { DateRange } from "react-day-picker"
import { PopoverClose } from '@radix-ui/react-popover';
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const Clients = () => {
  const { allClients, addClient, updateClient, removeClient, setActiveClient } = useClientStore();
  const [clients, setClients] = useState(allClients);
  const { toast } = useToast();
  const [newClientData, setNewClientData] = useState<Partial<Client>>({});
  const [editClientId, setEditClientId] = useState<string | null>(null);
  const [editClientData, setEditClientData] = useState<Partial<Client>>({});
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })
  const navigate = useNavigate();

  useEffect(() => {
    setClients(allClients);
  }, [allClients]);

  useEffect(() => {
    const filteredClients = allClients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.cnpj.includes(searchQuery)
    );
    setClients(filteredClients);
  }, [searchQuery, allClients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewClientData({ ...newClientData, [field]: e.target.value });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setEditClientData({ ...editClientData, [field]: e.target.value });
  };

  const handleAddClient = () => {
    const newClient: Client = {
      id: Date.now().toString(),
      name: newClientData.name || 'New Client', // Ensure name is always provided
      cnpj: newClientData.cnpj || '',
      email: newClientData.email || '',
      phone: newClientData.phone || '',
      address: newClientData.address || '',
      city: newClientData.city || '',
      state: newClientData.state || '',
      zipCode: newClientData.zipCode || '',
      contactName: newClientData.contactName || '',
      active: true,
      createdAt: new Date().toISOString(),
    };

    addClient(newClient);
    setNewClientData({});
    setOpen(false);
    toast({
      title: "Cliente adicionado",
      description: "O cliente foi adicionado com sucesso.",
    });
  };

  const handleEditClient = (client: Client) => {
    setEditClientId(client.id);
    setEditClientData(client);
  };

  const handleUpdateClient = () => {
    if (editClientId) {
      updateClient(editClientId, editClientData);
      setEditClientId(null);
      setEditClientData({});
      toast({
        title: "Cliente atualizado",
        description: "As informações do cliente foram atualizadas com sucesso.",
      });
    }
  };

  const handleRemoveClient = (id: string) => {
    removeClient(id);
    toast({
      title: "Cliente removido",
      description: "O cliente foi removido com sucesso.",
    });
  };

  const handleSetActiveClient = (client: Client) => {
    setActiveClient(client);
    navigate('/dashboard');
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Cliente</DialogTitle>
              <DialogDescription>
                Adicione um novo cliente à sua lista.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nome
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={newClientData.name || ''}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cnpj" className="text-right">
                  CNPJ
                </Label>
                <Input
                  type="text"
                  id="cnpj"
                  value={newClientData.cnpj || ''}
                  onChange={(e) => handleInputChange(e, 'cnpj')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={newClientData.email || ''}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Telefone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  value={newClientData.phone || ''}
                  onChange={(e) => handleInputChange(e, 'phone')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Endereço
                </Label>
                <Input
                  type="text"
                  id="address"
                  value={newClientData.address || ''}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">
                  Cidade
                </Label>
                <Input
                  type="text"
                  id="city"
                  value={newClientData.city || ''}
                  onChange={(e) => handleInputChange(e, 'city')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="state" className="text-right">
                  Estado
                </Label>
                <Input
                  type="text"
                  id="state"
                  value={newClientData.state || ''}
                  onChange={(e) => handleInputChange(e, 'state')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="zipCode" className="text-right">
                  CEP
                </Label>
                <Input
                  type="text"
                  id="zipCode"
                  value={newClientData.zipCode || ''}
                  onChange={(e) => handleInputChange(e, 'zipCode')}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactName" className="text-right">
                  Contato
                </Label>
                <Input
                  type="text"
                  id="contactName"
                  value={newClientData.contactName || ''}
                  onChange={(e) => handleInputChange(e, 'contactName')}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleAddClient}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar cliente..."
            className="pl-9 pr-4 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd MMM yyyy", { locale: enUS })} -{" "}
                    {format(date.to, "dd MMM yyyy", { locale: enUS })}
                  </>
                ) : (
                  format(date.from, "dd MMM yyyy", { locale: enUS })
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              pagedNavigation
              locale={enUS}
              className="border-0 rounded-md"
            />
            <Separator />
            <CardFooter className="justify-between space-x-2">
              <Button variant="outline" size="sm" className="h-8" onClick={() => setDate(undefined)}>
                Limpar
              </Button>
              <PopoverClose>
                <Button size="sm" className="h-8">
                  OK
                </Button>
              </PopoverClose>
            </CardFooter>
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Gerencie seus clientes e suas informações.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.cnpj}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="secondary" size="sm" onClick={() => handleSetActiveClient(client)}>
                        Acessar
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Editar Cliente</DialogTitle>
                            <DialogDescription>
                              Edite as informações do cliente.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nome
                              </Label>
                              <Input
                                type="text"
                                id="name"
                                value={editClientData.name || ''}
                                onChange={(e) => handleEditInputChange(e, 'name')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="cnpj" className="text-right">
                                CNPJ
                              </Label>
                              <Input
                                type="text"
                                id="cnpj"
                                value={editClientData.cnpj || ''}
                                onChange={(e) => handleEditInputChange(e, 'cnpj')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="email" className="text-right">
                                Email
                              </Label>
                              <Input
                                type="email"
                                id="email"
                                value={editClientData.email || ''}
                                onChange={(e) => handleEditInputChange(e, 'email')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                Telefone
                              </Label>
                              <Input
                                type="tel"
                                id="phone"
                                value={editClientData.phone || ''}
                                onChange={(e) => handleEditInputChange(e, 'phone')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="address" className="text-right">
                                Endereço
                              </Label>
                              <Input
                                type="text"
                                id="address"
                                value={editClientData.address || ''}
                                onChange={(e) => handleEditInputChange(e, 'address')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="city" className="text-right">
                                Cidade
                              </Label>
                              <Input
                                type="text"
                                id="city"
                                value={editClientData.city || ''}
                                onChange={(e) => handleEditInputChange(e, 'city')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="state" className="text-right">
                                Estado
                              </Label>
                              <Input
                                type="text"
                                id="state"
                                value={editClientData.state || ''}
                                onChange={(e) => handleEditInputChange(e, 'state')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="zipCode" className="text-right">
                                CEP
                              </Label>
                              <Input
                                type="text"
                                id="zipCode"
                                value={editClientData.zipCode || ''}
                                onChange={(e) => handleEditInputChange(e, 'zipCode')}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="contactName" className="text-right">
                                Contato
                              </Label>
                              <Input
                                type="text"
                                id="contactName"
                                value={editClientData.contactName || ''}
                                onChange={(e) => handleEditInputChange(e, 'contactName')}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" onClick={handleUpdateClient}>
                              Atualizar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="destructive" size="sm" onClick={() => handleRemoveClient(client.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
