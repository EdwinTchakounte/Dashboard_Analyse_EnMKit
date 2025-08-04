import React, { useState, useMemo } from 'react';
import { Task, Phase, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';
import { PhaseTab } from './PhaseTab';
import { StatsPanel } from './StatsPanel';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (taskNumber: number, updates: Partial<Task>) => void;
  canEdit: boolean;
  getPhaseStats: (phase: Phase) => { total: number; completed: number; inProgress: number; todo: number };
  getTaskStats: () => { total: number; completed: number; inProgress: number; todo: number };
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate, 
  canEdit, 
  getPhaseStats,
  getTaskStats 
}) => {
  const [activePhase, setActivePhase] = useState<Phase>('Inception');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActor, setSelectedActor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | ''>('');
  const [selectedNote, setSelectedNote] = useState('');

  const phases: Phase[] = ['Inception', 'Élaboration', 'Construction', 'Transition'];

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => task.phase === activePhase)
      .filter(task => {
        // Search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            task.titre.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower)
          );
        }
        return true;
      })
      .filter(task => {
        // Actor filter
        if (selectedActor) {
          return task.acteur === selectedActor;
        }
        return true;
      })
      .filter(task => {
        // Status filter
        if (selectedStatus) {
          return task.statut === selectedStatus;
        }
        return true;
      })
      .filter(task => {
        // Note filter
        if (selectedNote) {
          const minNote = parseFloat(selectedNote);
          if (selectedNote === '10') {
            return task.note === 10;
          }
          return task.note !== null && task.note >= minNote;
        }
        return true;
      })
      .sort((a, b) => a.numero - b.numero);
  }, [tasks, activePhase, searchTerm, selectedActor, selectedStatus, selectedNote]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedActor('');
    setSelectedStatus('');
    setSelectedNote('');
  };

  const hasActiveFilters = searchTerm || selectedActor || selectedStatus || selectedNote;

  const globalStats = getTaskStats();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <StatsPanel stats={globalStats} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {phases.map(phase => (
          <PhaseTab
            key={phase}
            phase={phase}
            isActive={activePhase === phase}
            onClick={() => setActivePhase(phase)}
            stats={getPhaseStats(phase)}
          />
        ))}
      </div>

      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedActor={selectedActor}
        onActorChange={setSelectedActor}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedNote={selectedNote}
        onNoteChange={setSelectedNote}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Phase {activePhase}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''} 
              {hasActiveFilters && ` (sur ${tasks.filter(t => t.phase === activePhase).length} au total)`}
            </p>
          </div>
          {!canEdit && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Mode lecture :</span> Vous pouvez uniquement ajouter des commentaires
              </p>
            </div>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune tâche trouvée</h3>
            <p className="text-gray-600">
              {hasActiveFilters 
                ? 'Essayez de modifier vos critères de recherche.'
                : 'Il n\'y a pas encore de tâches dans cette phase.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.numero}
                task={task}
                onUpdate={(updates) => onTaskUpdate(task.numero, updates)}
                canEdit={canEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};