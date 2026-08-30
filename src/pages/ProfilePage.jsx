import React, { useState } from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useLearning } from '../context/LearningContext';
import { User, Mail, Award, Clock, BookOpen, Bell, Save, Sparkles, Check } from 'lucide-react';

export const ProfilePage = () => {
  const { student, setStudent } = useLearning();

  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [level, setLevel] = useState(student.level);
  const [targetHours, setTargetHours] = useState(student.targetWeeklyHours);
  const [notifications, setNotifications] = useState(student.notifications);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setStudent(prev => ({
      ...prev,
      name,
      email,
      level,
      targetWeeklyHours: targetHours,
      notifications
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Student Profile & Settings" subtitle="Manage your personal preferences, learning goals, and notifications" />

        <main className="p-6 lg:p-8 max-w-4xl w-full mx-auto space-y-8">
          
          {/* Profile Card Header */}
          <div className="p-8 rounded-3xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center gap-6 relative shadow-2xl">
            
            <img
              src={student.avatar}
              alt={student.name}
              className="w-24 h-24 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-xl"
            />

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-extrabold text-white tracking-tight">{student.name}</h1>
                <Badge variant="cyan" size="sm">{student.level}</Badge>
              </div>
              
              <p className="text-xs text-slate-400 font-medium">{student.email}</p>
              
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span className="text-xs text-slate-300 font-semibold bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
                  🔥 7 Day Streak
                </span>
                <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-3 py-1 rounded-xl border border-cyan-500/20">
                  78% Progress
                </span>
              </div>
            </div>

          </div>

          {/* Form Settings */}
          <form onSubmit={handleSave} className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-xl">
            
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" /> General Preferences
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Learning Proficiency Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Beginner Learner">Beginner Learner</option>
                  <option value="Intermediate Learner">Intermediate Learner</option>
                  <option value="Advanced Master">Advanced Master</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Weekly Study Hours</label>
                <input
                  type="number"
                  value={targetHours}
                  onChange={(e) => setTargetHours(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>

            </div>

            {/* Notification Toggles */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-400" /> Notifications & AI Alerts
              </h3>

              <div className="space-y-3">
                {[
                  { key: 'dailyReminder', label: 'Daily Practice Reminders', desc: 'Receive gentle AI notifications to keep your study streak active.' },
                  { key: 'aiSuggestions', label: 'Real-time AI Subject Recommendations', desc: 'Get smart prompts when new weak areas are detected in quizzes.' },
                  { key: 'weeklyReport', label: 'Weekly Performance Digest', desc: 'Receive an automated weekly analysis of your topic mastery.' }
                ].map(item => (
                  <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{item.label}</h4>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>

                    <input
                      type="checkbox"
                      checked={notifications[item.key]}
                      onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                      className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-cyan-500/40 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex items-center justify-between">
              {saved ? (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Preferences saved successfully!
                </span>
              ) : <span />}

              <Button
                type="submit"
                variant="gradient"
                size="md"
                icon={Save}
                className="px-6 py-2.5"
              >
                Save Settings
              </Button>
            </div>

          </form>

        </main>
      </div>

    </div>
  );
};
