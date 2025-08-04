import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import { Phase, TaskStatus } from '../types';

interface TaskFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedActor: string;
  onActorChange: (actor: string) => void;
  selectedStatus: TaskStatus | '';
  onStatusChange: (status: TaskStatus | '') => void;
  selectedNote: string;
  onNoteChange: (note: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedActor,
  onActorChange,
  selectedStatus,
  onStatusChange,
  selectedNote,
  onNoteChange,
  onClearFilters,
  hasActiveFilters
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="h-5 w-5 text-gray-400" />
        <h3 className="text-sm font-medium text-gray-900">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>Effacer</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Titre ou description..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigné à
          </label>
          <select
            value={selectedActor}
            onChange={(e) => onActorChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Tous les acteurs</option>
            <option value="CP001">CP001 - Edwin T.</option>
            <option value="DEV001">DEV001 - Jean D.</option>
            <option value="DEV002">DEV002 - Amina S.</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus | '')}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Tous les statuts</option>
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminée">Terminée</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note minimale
          </label>
          <select
            value={selectedNote}
            onChange={(e) => onNoteChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">Toutes les notes</option>
            <option value="0">≥ 0/10</option>
            <option value="2">≥ 2/10</option>
            <option value="4">≥ 4/10</option>
            <option value="6">≥ 6/10</option>
            <option value="8">≥ 8/10</option>
            <option value="10">= 10/10</option>
          </select>
        </div>
      </div>
    </div>
  );
};