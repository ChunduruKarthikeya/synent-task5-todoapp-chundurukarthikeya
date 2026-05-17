"use client";

import { useState, useEffect } from "react";
import { arrayMove } from "@dnd-kit/sortable";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskify-tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error("Failed to parse tasks from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("taskify-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = (title, dueDate = null, priority = "medium") => {
    if (!title.trim()) return;
    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      dueDate: dueDate ? dueDate.toISOString() : null,
      priority: priority,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const updateTaskDueDate = (id, dueDate) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, dueDate: dueDate ? dueDate.toISOString() : null } : task
      )
    );
  };

  const updateTaskPriority = (id, priority) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const reorderTasks = (activeId, overId) => {
    setTasks((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    tasks,
    filteredTasks,
    isLoaded,
    searchQuery,
    setSearchQuery,
    addTask,
    toggleTask,
    updateTaskDueDate,
    updateTaskPriority,
    deleteTask,
    clearCompleted,
    reorderTasks,
  };
}
