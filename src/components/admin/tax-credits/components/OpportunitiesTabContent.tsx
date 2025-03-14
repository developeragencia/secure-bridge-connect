
import React from 'react';
import OpportunityCard from './OpportunityCard';

const OpportunitiesTabContent: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <OpportunityCard
        title="Crédito de PIS/COFINS sobre insumos"
        client="Empresa ABC Ltda"
        value="R$ 345.678,90"
        confidence={94}
        date="01/07/2023"
        status="Disponível"
      />
      <OpportunityCard
        title="Compensação de IRPJ"
        client="XYZ Indústria S.A."
        value="R$ 156.789,23"
        confidence={87}
        date="28/06/2023"
        status="Disponível"
      />
      <OpportunityCard
        title="Exclusão do ICMS da base de PIS/COFINS"
        client="Tech Solutions Ltda"
        value="R$ 567.123,45"
        confidence={96}
        date="15/06/2023"
        status="Em análise"
      />
      <OpportunityCard
        title="Crédito Extemporâneo de IPI"
        client="Comércio Geral Ltda"
        value="R$ 89.456,78"
        confidence={82}
        date="10/06/2023"
        status="Em análise"
      />
      <OpportunityCard
        title="Ressarcimento de ICMS-ST"
        client="Distribuidora Norte Ltda"
        value="R$ 123.987,65"
        confidence={91}
        date="05/06/2023"
        status="Aprovado"
      />
      <OpportunityCard
        title="Compensação de INSS sobre folha"
        client="Serviços Gerais S.A."
        value="R$ 234.567,89"
        confidence={88}
        date="01/06/2023"
        status="Aprovado"
      />
    </div>
  );
};

export default OpportunitiesTabContent;
