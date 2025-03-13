
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadModal from './FileUploadModal';
import { useFileUpload } from './imports/useFileUpload';
import ImportsHeader from './imports/ImportsHeader';
import FilesTabContent from './imports/FilesTabContent';
import HistoryTabContent from './imports/HistoryTabContent';
import SettingsTabContent from './imports/SettingsTabContent';

const OperationalImportsPanel = () => {
  const [activeTab, setActiveTab] = useState("files");
  const {
    selectedFormat,
    isModalOpen,
    fileInputRef,
    handleFormatClick,
    handleUploadClick,
    handleFileChange,
    closeModal,
    handleModalUpload
  } = useFileUpload();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <ImportsHeader 
        onUploadClick={handleUploadClick}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
      />

      <Tabs defaultValue="files" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <FilesTabContent onFormatClick={handleFormatClick} />
        <HistoryTabContent />
        <SettingsTabContent />
      </Tabs>

      {isModalOpen && (
        <FileUploadModal
          format={selectedFormat || ''}
          onClose={closeModal}
          onUpload={handleModalUpload}
        />
      )}
    </div>
  );
};

export default OperationalImportsPanel;
