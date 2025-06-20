import React from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { WorkoutPlan } from '../types';
import { saveTextToFile } from '../utils/fileSaver';

interface WorkoutDisplayProps {
  plan: WorkoutPlan | null;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan }) => {
  const [copied, setCopied] = React.useState(false);

  if (!plan) {
    return (
      <div className="p-6 bg-white shadow-xl rounded-lg text-center text-gray-500">
        <p>Your personalized workout plan will appear here once generated.</p>
        <p className="mt-2 text-sm">Fill out the form and click "Generate Workout".</p>
      </div>
    );
  }

  const handleSave = () => {
    const filename = `${plan.title.toLowerCase().replace(/\s+/g, '_')}_workout.md`;
    // Basic Markdown formatting for Obsidian/text file
    const content = `# ${plan.title}\n\n${plan.details}`;
    saveTextToFile(content, filename);
  };

  const handleCopy = () => {
    const content = `# ${plan.title}\n\n${plan.details}`;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-indigo-700">{plan.title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            title="Copy to Clipboard"
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-100 rounded-md transition duration-150"
          >
            {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
          </button>
          <button
            onClick={handleSave}
            title="Save as Markdown"
            className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-100 rounded-md transition duration-150"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
      <div
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none workout-content"
        dangerouslySetInnerHTML={{ __html: plan.details.replace(/\n/g, '<br />') }} // Basic rendering, consider a markdown parser for richer display
      />
      <style jsx global>{`
        .workout-content h2 { font-size: 1.5em; margin-top: 1em; margin-bottom: 0.5em; color: #4f46e5; }
        .workout-content h3 { font-size: 1.25em; margin-top: 0.8em; margin-bottom: 0.4em; color: #6366f1; }
        .workout-content h4 { font-size: 1.1em; margin-top: 0.6em; margin-bottom: 0.3em; color: #818cf8; }
        .workout-content ul { list-style-type: disc; margin-left: 1.5em; }
        .workout-content strong { color: #3730a3; }
      `}</style>
    </div>
  );
};

export default WorkoutDisplay;
