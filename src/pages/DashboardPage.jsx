import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { StatCard } from '../components/dashboard/StatCard';
import { SubjectCard } from '../components/dashboard/SubjectCard';
import { AIRecommendationCard } from '../components/dashboard/AIRecommendationCard';
import { WeakAreasCard } from '../components/dashboard/WeakAreasCard';
import { ActivityChart } from '../components/dashboard/ActivityChart';
import { useLearning } from '../context/LearningContext';
import { TrendingUp, Flame, CheckCircle, Award } from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { student, subjects, prepareQuizSession } = useLearning();

  const handleContinueSubject = (subject) => {
    prepareQuizSession(subject.id, subject.currentTopic, 'Medium');
    navigate('/assessment/quiz');
  };

  const handleImproveWeakAreas = () => {
    // Navigate to assessment page pre-configured with weak topic
    prepareQuizSession('dbms', 'Normalization (1NF to BCNF)', 'Medium');
    navigate('/assessment');
  };

  const handleStartRecommendation = () => {
    prepareQuizSession('dbms', 'Normalization (1NF to BCNF)', 'Medium');
    navigate('/assessment/quiz');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <Header />

        {/* Content Container */}
        <main className="p-6 lg:p-8 space-y-8 max-w-7xl w-full mx-auto">
          
          {/* Progress Overview Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Overall Progress"
              value={`${student.overallProgress}%`}
              subtitle="Course curriculum completed"
              icon={TrendingUp}
              color="cyan"
              badgeText="+4% this week"
            />
            <StatCard
              title="Learning Streak"
              value={`${student.learningStreakDays} days`}
              subtitle="Daily practice streak 🔥"
              icon={Flame}
              color="amber"
              badgeText="Personal Best!"
            />
            <StatCard
              title="Topics Completed"
              value={student.topicsCompleted}
              subtitle="Mastered concepts"
              icon={CheckCircle}
              color="emerald"
            />
            <StatCard
              title="Quiz Accuracy"
              value={`${student.quizAccuracyPercent}%`}
              subtitle="Average assessment score"
              icon={Award}
              color="purple"
            />
          </div>

          {/* AI Recommendation Banner */}
          <AIRecommendationCard
            recommendation={student.aiRecommendation}
            onStart={handleStartRecommendation}
          />

          {/* Main Grid: Continue Learning + Side Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left 8 Cols: Continue Learning Subjects */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-white tracking-tight">Continue Learning</h2>
                  <p className="text-xs text-slate-400">Pick up right where you left off</p>
                </div>
                <button
                  onClick={() => navigate('/assessment')}
                  className="text-xs font-semibold text-cyan-400 hover:underline"
                >
                  View All Subjects →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {subjects.slice(0, 4).map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onContinue={handleContinueSubject}
                  />
                ))}
              </div>

            </div>

            {/* Right 4 Cols: Weak Areas & Weekly Activity */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Weak Areas Card */}
              <WeakAreasCard
                weakAreas={student.weakAreas}
                onImprove={handleImproveWeakAreas}
              />

              {/* Activity Chart */}
              <ActivityChart activityData={student.weeklyActivity} />

            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
