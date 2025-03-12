
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/30 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-primary">Secure</span>Bridge
            </h3>
            <p className="text-sm text-foreground/70 mb-6 max-w-xs">
              Arquitetura de backend moderna para soluções empresariais com FastAPI, SQLModel e PostgreSQL.
            </p>
            <div className="flex space-x-4">
              {['GitHub', 'Twitter', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-foreground/60 hover:text-primary transition-colors">
                  <span className="sr-only">{social}</span>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-border hover:border-primary transition-colors">
                    {/* Social icons would go here */}
                    <span className="text-xs">{social[0]}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground/60 mb-4">Recursos</h4>
            <ul className="space-y-3">
              {['Documentação', 'Referência da API', 'Exemplos', 'Tutoriais'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground/60 mb-4">Empresa</h4>
            <ul className="space-y-3">
              {['Sobre', 'Blog', 'Carreiras', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold uppercase text-foreground/60 mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Política de Privacidade', 'Termos de Serviço', 'Política de Cookies', 'LGPD'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SecureBridge. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            {['Política de Privacidade', 'Termos de Uso', 'Política de Cookies'].map((item) => (
              <a key={item} href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
