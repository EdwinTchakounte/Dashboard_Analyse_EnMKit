import React from 'react';
import { useAuth } from './hooks/useAuth';
import { useTasks } from './hooks/useTasks';
import { LoginForm } from './components/LoginForm';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';

function App() {
  const { user, isLoading: authLoading, login, logout, isAuthenticated, isProjectManager } = useAuth();
  const { tasks, isLoading: tasksLoading, updateTask, getPhaseStats, getTaskStats } = useTasks();

  if (authLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Chargement...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <LoginForm onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={logout} />
      <TaskList
        tasks={tasks}
        onTaskUpdate={updateTask}
        canEdit={isProjectManager}
        getPhaseStats={getPhaseStats}
        getTaskStats={getTaskStats}
      />
    </div>
  );
}

export default App;