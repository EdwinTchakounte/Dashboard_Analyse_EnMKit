import { useState, useEffect } from 'react';
import { Task, Phase } from '../types';
import { initialTasks } from '../data/tasks';

const TASKS_STORAGE_KEY = 'task_tracker_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      try {
        const tasksData = JSON.parse(savedTasks);
        setTasks(tasksData);
      } catch (error) {
        console.error('Erreur lors du chargement des tâches:', error);
        setTasks(initialTasks);
        localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialTasks));
      }
    } else {
      setTasks(initialTasks);
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialTasks));
    }
    setIsLoading(false);
  }, []);

  const updateTask = (taskNumber: number, updates: Partial<Task>) => {
    setTasks(prevTasks => {
      const updatedTasks =  prevTasks.map(task => 
        task.numero === taskNumber ? { ...task, ...updates } : task
      );
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
      return updatedTasks;
    });
  };

  const getTasksByPhase = (phase: Phase) => {
    return tasks.filter(task => task.phase === phase);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.statut === 'terminée').length;
    const inProgress = tasks.filter(task => task.statut === 'en cours').length;
    const todo = tasks.filter(task => task.statut === 'à faire').length;
    
    return { total, completed, inProgress, todo };
  };

  const getPhaseStats = (phase: Phase) => {
    const phaseTasks = getTasksByPhase(phase);
    const total = phaseTasks.length;
    const completed = phaseTasks.filter(task => task.statut === 'terminée').length;
    const inProgress = phaseTasks.filter(task => task.statut === 'en cours').length;
    const todo = phaseTasks.filter(task => task.statut === 'à faire').length;
    
    return { total, completed, inProgress, todo };
  };

  return {
    tasks,
    isLoading,
    updateTask,
    getTasksByPhase,
    getTaskStats,
    getPhaseStats
  };
};