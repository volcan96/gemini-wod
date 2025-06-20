import { WorkoutPreferences, WorkoutPlan } from '../types';

// Mock function to simulate fetching a workout plan from Gemini via Node-RED
export const fetchWorkoutPlan = async (preferences: WorkoutPreferences): Promise<WorkoutPlan> => {
  console.log('Simulating API call to Node-RED/Gemini with preferences:', preferences);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mocked response based on preferences
  let planDetails = `
## Personalized Workout Plan

**Duration:** ${preferences.duration} minutes
**Focus:** ${preferences.programTypes.join(', ') || 'General Fitness'}
${preferences.customPrompt ? `**User Notes:** ${preferences.customPrompt}\n` : ''}
---

### Warm-up (5 minutes)
*   Jumping Jacks: 2 minutes
*   Dynamic Stretches (arm circles, leg swings): 3 minutes

### Main Workout (${preferences.duration - 10} minutes)
`;

  if (preferences.programTypes.includes('Tabata')) {
    planDetails += `
#### Tabata Protocol (4 minutes per exercise, 2 exercises)
*   **Exercise 1: Burpees**
    *   20 seconds of work, 10 seconds of rest
    *   Repeat 8 times
*   **Exercise 2: Mountain Climbers**
    *   20 seconds of work, 10 seconds of rest
    *   Repeat 8 times
`;
  } else if (preferences.programTypes.includes('HIIT')) {
    planDetails += `
#### HIIT Circuit (Repeat 3 times)
*   High Knees: 45 seconds
*   Rest: 15 seconds
*   Push-ups: 45 seconds
*   Rest: 15 seconds
*   Squat Jumps: 45 seconds
*   Rest: 15 seconds
`;
  } else if (preferences.programTypes.includes('CrossFit')) {
    planDetails += `
#### CrossFit Style WOD (As Many Rounds As Possible - AMRAP)
*   5 Pull-ups (or Bodyweight Rows)
*   10 Push-ups
*   15 Air Squats
`;
  } else if (preferences.programTypes.includes('StrongLifts')) {
    planDetails += `
#### StrongLifts 5x5 (Example Day A)
*   Squats: 5 sets of 5 reps
*   Bench Press: 5 sets of 5 reps
*   Barbell Rows: 5 sets of 5 reps
*(Note: StrongLifts is a specific program, this is a simplified representation)*
`;
  } else {
    planDetails += `
#### General Fitness Circuit
*   Bodyweight Squats: 3 sets of 15 reps
*   Plank: 3 sets, hold for 30-60 seconds
*   Lunges: 3 sets of 10 reps per leg
`;
  }

  planDetails += `
---
### Cool-down (5 minutes)
*   Static Stretches (hold each for 30 seconds): Hamstrings, Quads, Chest, Back
`;

  return {
    title: `Your ${preferences.programTypes.join('/') || 'Custom'} Workout`,
    details: planDetails,
  };
};
