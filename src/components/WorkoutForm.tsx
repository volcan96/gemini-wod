import React, { useState } from 'react';
import { Clock, ListChecks, Send } from 'lucide-react';
import { WorkoutPreferences } from '../types';

interface WorkoutFormProps {
  onSubmit: (preferences: WorkoutPreferences) => void;
  isLoading: boolean;
}

const programOptions = ['Tabata', 'HIIT', 'CrossFit', 'StrongLifts', 'Cardio', 'Strength'];

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, isLoading }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [duration, setDuration] = useState(30);

  const handleProgramChange = (program: string) => {
    setSelectedPrograms(prev =>
      prev.includes(program) ? prev.filter(p => p !== program) : [...prev, program]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      customPrompt,
      programTypes: selectedPrograms,
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white shadow-xl rounded-lg">
      <div>
        <label htmlFor="customPrompt" className="block text-sm font-medium text-gray-700 mb-1">
          Custom Instructions (e.g., focus on legs, no jumping)
        </label>
        <textarea
          id="customPrompt"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          placeholder="Any specific requests for Gemini?"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Workout Program Types</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {programOptions.map(program => (
            <button
              type="button"
              key={program}
              onClick={() => handleProgramChange(program)}
              className={`p-3 border rounded-md text-sm transition-all duration-150 ease-in-out flex items-center justify-center space-x-2
                ${selectedPrograms.includes(program)
                  ? 'bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-300'
                }`}
            >
              <ListChecks size={16} />
              <span>{program}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
          <Clock size={16} className="inline mr-1" /> Duration (minutes)
        </label>
        <input
          type="number"
          id="duration"
          value={duration}
          onChange={(e) => setDuration(Math.max(10, parseInt(e.target.value, 10) || 10))} // Min 10 minutes
          min="10"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center p-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <Send size={20} className="mr-2" /> Generate Workout
          </>
        )}
      </button>
    </form>
  );
};

export default WorkoutForm;
