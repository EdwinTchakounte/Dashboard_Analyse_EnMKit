import React from 'react';
import { LogOut, User } from 'lucide-react';
import { AuthUser } from '../types';

interface HeaderProps {
  user: AuthUser;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {  
  const getRoleBadgeColor = (role: string) => {
    return role === 'chef_projet' 
      ? 'bg-indigo-100 text-indigo-800 border-indigo-200' 
      : 'bg-green-100 text-green-800 border-green-200';
  };

  const getRoleLabel = (role: string) => {
    return role === 'chef_projet' ? 'Chef de Projet' : 'Développeur';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">
              Suivi des Tâches
            </h1>
            <span className="text-sm text-gray-500">|</span>
            <span className="text-sm text-gray-600">
              Méthode UP - 200 Tâches
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {user.nom}
                </span>
              </div>
              <span 
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(user.role)}`}
              >
                {getRoleLabel(user.role)}
              </span>
              <span className="text-xs text-gray-500">
                ({user.code})
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};