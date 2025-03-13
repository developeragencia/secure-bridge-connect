
import React from 'react';
import { useParams } from 'react-router-dom';
import { useActiveClient } from '@/hooks/useActiveClient';
import ClientDetail from './tax-credits/ClientDetail';

interface ExtraTabContentProps {
  activeTab: string;
}

const ExtraTabContent: React.FC<ExtraTabContentProps> = ({ activeTab }) => {
  // Check if this is a client detail view
  const isClientDetail = activeTab.startsWith('client-');
  const clientId = isClientDetail ? activeTab.replace('client-', '') : '';
  
  if (isClientDetail && clientId) {
    return <ClientDetail clientId={clientId} />;
  }
  
  return null;
};

export default ExtraTabContent;
