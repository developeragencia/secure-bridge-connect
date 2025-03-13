
import React from 'react';
import { motion } from 'framer-motion';
import { User, UserRole } from '@/types/client';
import UserProfileHeader from './user-profiles/UserProfileHeader';
import ProfilePermissions from './user-profiles/ProfilePermissions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Sample user data - replace with real data
const mockUser: User = {
  id: '1',
  name: 'Claudio Figueiredo',
  email: 'admin@sistemasclaudio.com',
  role: 'admin' as UserRole,
  status: 'active' as const,
  createdAt: '2023-01-01',
};

const AdminUserProfile = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Perfil de Usuário</h1>
        <p className="text-muted-foreground">Gerenciar perfil e permissões do usuário</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <UserProfileHeader user={mockUser} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="permissions">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="permissions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Permissões do Perfil</CardTitle>
                <CardDescription>
                  Visualize as permissões associadas a este perfil de usuário.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfilePermissions userRole={mockUser.role} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Histórico de atividades realizadas por este usuário no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Não há registros de atividade para este usuário.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações deste usuário no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Configurações não disponíveis nesta versão.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminUserProfile;
