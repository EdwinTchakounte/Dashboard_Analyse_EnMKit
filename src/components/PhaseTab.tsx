import React from 'react';
import { Phase } from '../types';

interface PhaseTabProps {
  phase: Phase;
  isActive: boolean;
  onClick: () => void;
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  };
}

export const PhaseTab: React.FC<PhaseTabProps> = ({ phase, isActive, onClick, stats }) => {
  const getPhaseRange = (phase: Phase) => {
    switch (phase) {
      case 'Inception':
        return '1-40';
      case 'Élaboration':
        return '41-90';
      case 'Construction':
        return '91-170';
      case 'Transition':
        return '171-200';
    }
  };

  const getCompletionPercentage = () => {
    return stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  };

  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-4 text-left rounded-lg border-2 transition-all duration-200 ${
        isActive
          ? 'border-blue-500 bg-blue-50 text-blue-900'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className={`font-semibold text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
          {phase}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full ${
          isActive ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
        }`}>
          Tâches {getPhaseRange(phase)}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progression</span>
          <span className={`text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}>
            {getCompletionPercentage()}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              isActive ? 'bg-blue-500' : 'bg-green-500'
            }`}
            style={{ width: `${getCompletionPercentage()}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">
            {stats.completed}/{stats.total} terminées
          </span>
          <span className="text-yellow-600">
            {stats.inProgress} en cours
          </span>
        </div>
      </div>
    </button>
  );
};