export interface WorkoutPreferences {
  customPrompt: string;
  programTypes: string[];
  duration: number; // in minutes
}

export interface WorkoutPlan {
  title: string;
  details: string; // This would be the Gemini generated content
  // Could be structured further, e.g., exercises: { name: string, sets: number, reps: string }[]
}

export interface HistoryItem {
  id: string;
  timestamp: Date;
  preferences: WorkoutPreferences;
  plan: WorkoutPlan;
}
