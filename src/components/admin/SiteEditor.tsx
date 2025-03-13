
import React from 'react';
import SiteEditorTabs from './site-editor/SiteEditorTabs';

const SiteEditor = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Editor do Site</h1>
      <p className="text-muted-foreground">Personalize a aparência e o conteúdo do seu site</p>
      
      <SiteEditorTabs />
    </div>
  );
};

export default SiteEditor;
