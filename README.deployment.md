
# Guia de Deployment para Hospedagem

## Pré-requisitos
- Conta em um serviço de hospedagem (como Hosting)
- Node.js e npm instalados localmente
- Acesso FTP ao seu servidor de hospedagem

## Passo a passo para deploy

### 1. Preparar o projeto para produção

```bash
# Instalar dependências
npm install

# Construir o projeto para produção
npm run build
```

### 2. Upload dos arquivos via FTP

Existem duas opções para o upload:

#### Opção 1: Upload manual via cliente FTP
1. Use um cliente FTP (como FileZilla, CyberDuck ou WinSCP)
2. Conecte-se ao seu servidor usando as credenciais fornecidas pela Hosting
3. Navegue até a pasta raiz do seu domínio (geralmente public_html, www, ou htdocs)
4. Faça o upload de todo o conteúdo da pasta `dist` para esta pasta

#### Opção 2: Usando o script de deploy
1. Execute o script de deploy incluído no projeto:
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```
2. Isso criará um arquivo `deploy.zip`
3. Faça upload deste arquivo zip para o servidor
4. Extraia o conteúdo na pasta raiz do seu domínio

### 3. Configuração do servidor

Para que a aplicação React funcione corretamente com rotas no lado do cliente:

1. Certifique-se de que o arquivo `.htaccess` foi carregado para a pasta raiz
2. Se você estiver usando o Nginx em vez do Apache, consulte o administrador do servidor para configurar corretamente as regras de redirecionamento

### 4. Teste a aplicação

Após o upload, visite o seu domínio para verificar se a aplicação está funcionando corretamente.

### 5. Solução de problemas comuns

- **Erro 404 nas rotas**: Verifique se o arquivo `.htaccess` está corretamente configurado e se o mod_rewrite está ativado no Apache.
- **Recursos não carregando**: Confirme que as referências aos recursos estão usando caminhos relativos corretos.
- **Erro na API**: Verifique se as URLs da API estão configuradas para apontar para o ambiente de produção.

## Notas importantes

- Para atualizações futuras, repita o processo de build e upload apenas dos arquivos modificados.
- Considere configurar um pipeline de CI/CD para automatizar este processo.
- Faça backup da sua aplicação antes de qualquer atualização importante.
