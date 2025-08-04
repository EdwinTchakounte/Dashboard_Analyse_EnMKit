import React from 'react';
import { CheckCircle, Clock, Circle, BarChart3 } from 'lucide-react';

interface StatsPanelProps {
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  };
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">Statistiques Globales</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
          <p className="text-xs text-blue-700">tâches</p>
        </div>
        
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-900">Terminées</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
          <p className="text-xs text-green-700">{completionPercentage}% du total</p>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Clock className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">En cours</span>
          </div>
          <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          <p className="text-xs text-yellow-700">en développement</p>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Circle className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">À faire</span>
          </div>
          <p className="text-2xl font-bold text-gray-600">{stats.todo}</p>
          <p className="text-xs text-gray-700">restantes</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progression générale</span>
          <span className="text-sm text-gray-600">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};