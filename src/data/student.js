export const INITIAL_STUDENT_PROFILE = {
  id: 'std-9821',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  level: 'Intermediate Learner',
  overallProgress: 78,
  learningStreakDays: 7,
  topicsCompleted: 24,
  quizAccuracyPercent: 82,
  targetWeeklyHours: 15,
  weeklyHoursLogged: 11.5,
  preferredSubjects: ['Python', 'DBMS', 'Data Structures'],
  weakAreas: [
    { subject: 'DBMS', topic: 'Normalization (1NF to BCNF)', score: 45, severity: 'High' },
    { subject: 'Java', topic: 'Exception Handling', score: 58, severity: 'Medium' },
    { subject: 'Python', topic: 'Recursion & Functions', score: 62, severity: 'Medium' }
  ],
  aiRecommendation: {
    title: 'Focus Area Suggested by LearnMate AI',
    subject: 'DBMS',
    topic: 'Normalization (1NF to BCNF)',
    reason: 'Based on your recent 45% quiz accuracy in relational theory, mastering 1NF through BCNF will boost your DBMS core score by ~20%.',
    estimatedTime: '25 mins',
    actionText: 'Start Recommended Topic'
  },
  weeklyActivity: [
    { day: 'Mon', hours: 2.5, quizzesTaken: 3 },
    { day: 'Tue', hours: 1.8, quizzesTaken: 2 },
    { day: 'Wed', hours: 3.2, quizzesTaken: 4 },
    { day: 'Thu', hours: 0.8, quizzesTaken: 1 },
    { day: 'Fri', hours: 2.0, quizzesTaken: 2 },
    { day: 'Sat', hours: 1.2, quizzesTaken: 1 },
    { day: 'Sun', hours: 0.0, quizzesTaken: 0 }
  ],
  notifications: {
    dailyReminder: true,
    aiSuggestions: true,
    weeklyReport: true
  }
};
