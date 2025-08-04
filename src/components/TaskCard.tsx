import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';
import { Edit3, MessageSquare, Star, User, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
  canEdit: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, canEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState({
    statut: task.statut,
    acteur: task.acteur,
    note: task.note?.toString() || '',
    commentaire: task.commentaire
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'terminée':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en cours':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'à faire':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'terminée':
        return '✓';
      case 'en cours':
        return '⏳';
      case 'à faire':
        return '○';
    }
  };

  const handleSave = (field: string, value: string) => {
    let updateValue: any = value;
    
    if (field === 'note') {
      const noteValue = parseFloat(value);
      updateValue = isNaN(noteValue) ? null : Math.min(Math.max(noteValue, 0), 10);
    }
    
    onUpdate({ [field]: updateValue });
    setEditingField(null);
  };

  const startEdit = (field: string) => {
    if (!canEdit && field !== 'commentaire') return;
    setEditingField(field);
  };

  const cancelEdit = () => {
    setTempValues({
      statut: task.statut,
      acteur: task.acteur,
      note: task.note?.toString() || '',
      commentaire: task.commentaire
    });
    setEditingField(null);
  };

  const renderField = (field: keyof typeof tempValues, label: string, type: 'select' | 'input' | 'textarea' = 'input') => {
    const isCurrentlyEditing = editingField === field;
    const canEditField = canEdit || field === 'commentaire';

    if (isCurrentlyEditing) {
      if (type === 'select' && field === 'statut') {
        return (
          <div className="flex items-center space-x-2">
            <select
              value={tempValues[field]}
              onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(field, tempValues[field]);
                if (e.key === 'Escape') cancelEdit();
              }}
              autoFocus
            >
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminée">Terminée</option>
            </select>
            <button
              onClick={() => handleSave(field, tempValues[field])}
              className="text-green-600 hover:text-green-700 text-xs font-medium"
            >
              ✓
            </button>
            <button
              onClick={cancelEdit}
              className="text-gray-500 hover:text-gray-700 text-xs font-medium"
            >
              ✕
            </button>
          </div>
        );
      } else if (type === 'select' && field === 'acteur') {
        return (
          <div className="flex items-center space-x-2">
            <select
              value={tempValues[field]}
              onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(field, tempValues[field]);
                if (e.key === 'Escape') cancelEdit();
              }}
              autoFocus
            >
              <option value="CP001">CP001 - Edwin T.</option>
              <option value="DEV001">DEV001 - Jean D.</option>
              <option value="DEV002">DEV002 - Amina S.</option>
            </select>
            <button
              onClick={() => handleSave(field, tempValues[field])}
              className="text-green-600 hover:text-green-700 text-xs font-medium"
            >
              ✓
            </button>
            <button
              onClick={cancelEdit}
              className="text-gray-500 hover:text-gray-700 text-xs font-medium"
            >
              ✕
            </button>
          </div>
        );
      } else if (type === 'textarea') {
        return (
          <div className="space-y-2">
            <textarea
              value={tempValues[field]}
              onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
              className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={3}
              placeholder="Ajouter un commentaire..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) handleSave(field, tempValues[field]);
                if (e.key === 'Escape') cancelEdit();
              }}
              autoFocus
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Ctrl+Entrée pour sauvegarder</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave(field, tempValues[field])}
                  className="text-green-600 hover:text-green-700 text-xs font-medium"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700 text-xs font-medium"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex items-center space-x-2">
            <input
              type={field === 'note' ? 'number' : 'text'}
              value={tempValues[field]}
              onChange={(e) => setTempValues(prev => ({ ...prev, [field]: e.target.value }))}
              className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min={field === 'note' ? '0' : undefined}
              max={field === 'note' ? '10' : undefined}
              step={field === 'note' ? '0.1' : undefined}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave(field, tempValues[field]);
                if (e.key === 'Escape') cancelEdit();
              }}
              autoFocus
            />
            <button
              onClick={() => handleSave(field, tempValues[field])}
              className="text-green-600 hover:text-green-700 text-xs font-medium"
            >
              ✓
            </button>
            <button
              onClick={cancelEdit}
              className="text-gray-500 hover:text-gray-700 text-xs font-medium"
            >
              ✕
            </button>
          </div>
        );
      }
    }

    // Display mode
    if (field === 'statut') {
      return (
        <div className="flex items-center space-x-2">
          <span 
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.statut)}`}
          >
            <span className="mr-1">{getStatusIcon(task.statut)}</span>
            {task.statut}
          </span>
          {canEditField && (
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          )}
        </div>
      );
    } else if (field === 'acteur') {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 text-gray-400" />
            <span className="text-sm text-gray-700">{task.acteur}</span>
          </div>
          {canEditField && (
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          )}
        </div>
      );
    } else if (field === 'note') {
      return (
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400" />
            <span className="text-sm text-gray-700">
              {task.note !== null ? `${task.note}/10` : 'Non notée'}
            </span>
          </div>
          {canEditField && (
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          )}
        </div>
      );
    } else if (field === 'commentaire') {
      return (
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-3 w-3 text-gray-400" />
              <span className="text-xs font-medium text-gray-500">Commentaire</span>
            </div>
            <button
              onClick={() => startEdit(field)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
          {task.commentaire ? (
            <p className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1 min-h-[2rem]">
              {task.commentaire}
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic">Aucun commentaire</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
            {task.numero}
          </span>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {task.titre}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <Clock className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">{task.phase}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
        {task.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {renderField('statut', 'Statut', 'select')}
            {renderField('acteur', 'Assigné à', 'select')}
          </div>
          {renderField('note', 'Note', 'input')}
        </div>
        
        {renderField('commentaire', 'Commentaire', 'textarea')}
      </div>
    </div>
  );
};