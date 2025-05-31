
import React, { useState } from 'react';
import { Edit3, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface EditProjectNameProps {
  projectId: number;
  currentName: string;
  onNameChange: (id: number, newName: string) => void;
}

const EditProjectName: React.FC<EditProjectNameProps> = ({ 
  projectId, 
  currentName, 
  onNameChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentName);
  const { toast } = useToast();

  const handleSave = () => {
    if (editName.trim() === '') {
      toast({
        title: "Erreur",
        description: "Le nom du projet ne peut pas être vide",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (editName.trim() === currentName) {
      setIsEditing(false);
      return;
    }

    onNameChange(projectId, editName.trim());
    setIsEditing(false);
    
    toast({
      title: "Nom Modifié",
      description: `Le projet a été renommé en "${editName.trim()}"`,
      duration: 3000,
    });
  };

  const handleCancel = () => {
    setEditName(currentName);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center space-x-2 min-w-0 flex-1">
        <Input
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="text-blue-800 font-medium border-blue-300 focus:border-blue-500 h-8"
          autoFocus
        />
        <Button
          size="sm"
          onClick={handleSave}
          className="bg-emerald-500 hover:bg-emerald-600 text-white h-8 w-8 p-0"
        >
          <Check className="w-3 h-3" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleCancel}
          className="border-red-300 text-red-600 hover:bg-red-50 h-8 w-8 p-0"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 min-w-0 flex-1">
      <span className="text-blue-800 font-medium flex-1 truncate">{currentName}</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setIsEditing(true)}
        className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 h-8 w-8 p-0 flex-shrink-0"
      >
        <Edit3 className="w-3 h-3" />
      </Button>
    </div>
  );
};

export default EditProjectName;
