
import React from 'react';
import LoadingScreen from './LoadingScreen';

const IndexLoading: React.FC = () => {
  // Pass the variant prop to avoid re-renders
  return <LoadingScreen message="Carregando página inicial..." variant="default" />;
};

export default React.memo(IndexLoading);
