"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState([]);

  // Sync tasks from localStorage for the navbar stats
  useEffect(() => {
    const syncTasks = () => {
      const saved = localStorage.getItem("taskify-tasks");
      if (saved) {
        try {
          setTasks(JSON.parse(saved));
        } catch (e) {}
      }
    };
    syncTasks();
    window.addEventListener("storage", syncTasks);
    return () => window.removeEventListener("storage", syncTasks);
  }, []);

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <AppContext.Provider 
      value={{ 
        searchQuery, 
        setSearchQuery,
        activeCount,
        completedCount,
        totalCount: tasks.length
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
