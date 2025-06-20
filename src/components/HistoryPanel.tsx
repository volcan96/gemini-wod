import React from 'react';
import { History, Trash2, Eye } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onViewHistoryItem: (item: HistoryItem) => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClearHistory, onViewHistoryItem }) => {
  if (history.length === 0) {
    return (
      <div className="p-4 bg-gray-50 shadow-lg rounded-lg text-center text-gray-500">
        <History size={32} className="mx-auto mb-2 text-gray-400" />
        <p>No workout history yet.</p>
        <p className="text-xs">Generated workouts will appear here.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center">
          <History size={20} className="mr-2 text-indigo-600" /> Workout History
        </h3>
        <button
          onClick={onClearHistory}
          title="Clear History"
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md transition duration-150"
        >
          <Trash2 size={18} />
        </button>
      </div>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {history.slice().reverse().map(item => ( // Show newest first
          <li key={item.id} className="p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-150">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-indigo-600">{item.plan.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleString()} - {item.preferences.duration} min
                </p>
                <p className="text-xs text-gray-500">
                  Types: {item.preferences.programTypes.join(', ') || 'Custom'}
                </p>
              </div>
              <button
                onClick={() => onViewHistoryItem(item)}
                title="View Details"
                className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition duration-150"
              >
                <Eye size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPanel;
