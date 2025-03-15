
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FileUploadModal from './FileUploadModal';
import { useFileUpload } from './imports/useFileUpload';
import ImportsHeader from './imports/ImportsHeader';
import FilesTabContent from './imports/FilesTabContent';
import HistoryTabContent from './imports/HistoryTabContent';
import SettingsTabContent from './imports/SettingsTabContent';
import UploadTabContent from './imports/UploadTabContent';
import { Button } from "@/components/ui/button";
import { FileUp, Settings } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Importação de Dados Operacionais</h2>
          <p className="text-muted-foreground">
            Importe dados de sistemas externos para processamento operacional.
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={activeTab === "upload" ? "default" : "outline"} 
            className="flex items-center gap-2"
            onClick={() => setActiveTab("upload")}
          >
            <FileUp className="h-4 w-4" />
            Upload de Arquivos
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            className="flex items-center gap-2"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        
        <FilesTabContent onFormatClick={handleFormatClick} />
        <UploadTabContent />
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
