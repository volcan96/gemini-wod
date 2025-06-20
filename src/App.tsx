import React, { useState, useEffect } from 'react';
import { Dumbbell, Sparkles, ServerCrash } from 'lucide-react';
import WorkoutForm from './components/WorkoutForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import HistoryPanel from './components/HistoryPanel';
import { WorkoutPreferences, WorkoutPlan, HistoryItem } from './types';
import { fetchWorkoutPlan } from './services/workoutService';

const App: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('workoutHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(history));
  }, [history]);

  const handleGenerateWorkout = async (preferences: WorkoutPreferences) => {
    setIsLoading(true);
    setError(null);
    setCurrentPlan(null);
    try {
      const plan = await fetchWorkoutPlan(preferences);
      setCurrentPlan(plan);
      const newHistoryItem: HistoryItem = {
        id: new Date().toISOString(),
        timestamp: new Date(),
        preferences,
        plan,
      };
      setHistory(prevHistory => [...prevHistory, newHistoryItem]);
    } catch (err) {
      console.error("Failed to generate workout:", err);
      setError("Oops! Something went wrong while generating your workout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all workout history?")) {
      setHistory([]);
      localStorage.removeItem('workoutHistory');
    }
  };

  const handleViewHistoryItem = (item: HistoryItem) => {
    setCurrentPlan(item.plan);
    // Optionally, could also repopulate the form with item.preferences
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100 p-4 sm:p-8 font-sans">
      <header className="text-center mb-10">
        <div className="inline-flex items-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          <Dumbbell size={48} className="mr-3 text-purple-400" />
          <h1 className="text-4xl sm:text-5xl font-bold">
            Gemini Workout Generator
          </h1>
        </div>
        <p className="mt-3 text-lg text-slate-400 flex items-center justify-center">
          Powered by AI <Sparkles size={20} className="ml-2 text-yellow-400" />
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <WorkoutForm onSubmit={handleGenerateWorkout} isLoading={isLoading} />
          <HistoryPanel
            history={history}
            onClearHistory={handleClearHistory}
            onViewHistoryItem={handleViewHistoryItem}
          />
        </div>

        <main className="lg:col-span-2">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-300 border border-red-500/50 rounded-lg flex items-center">
              <ServerCrash size={24} className="mr-3 text-red-400" />
              <div>
                <h3 className="font-semibold">Error</h3>
                <p>{error}</p>
              </div>
            </div>
          )}
          <WorkoutDisplay plan={currentPlan} />
        </main>
      </div>

      <footer className="text-center mt-12 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Personalized Workouts Inc. All rights reserved.</p>
        <p className="mt-1">
          This is a demo application. Workout plans are AI-generated and should be reviewed by a professional.
        </p>
      </footer>
    </div>
  );
};

export default App;
