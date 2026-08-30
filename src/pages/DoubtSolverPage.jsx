import React, { useState, useRef, useEffect } from 'react';
import { Sidebar } from '../components/common/Sidebar';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { apiService } from '../services/api';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Loader2, 
  Copy, 
  Check, 
  Code, 
  HelpCircle,
  BookOpen
} from 'lucide-react';

export const DoubtSolverPage = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: "Hello Alex! I am LearnMate AI, your friendly educational tutor 🤖. What concept, topic, or question would you like help understanding today?",
      example: "",
      practiceQuestion: "",
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestedQuestions = [
    "Explain recursion in simple terms",
    "What is the difference between list and tuple?",
    "Explain inheritance with an example",
    "What is normalization in DBMS?"
  ];

  const handleSuggestedClick = (q) => {
    setInputText(q);
  };

  const handleSend = async (customQuery) => {
    const textToSend = customQuery || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await apiService.solveDoubt(textToSend, 'Python', 'General');
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: response.answer,
        example: response.example,
        practiceQuestion: response.practiceQuestion,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "An unexpected error occurred while communicating with the AI service. Please check your server status.",
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Header title="AI Doubt Solver 🤖" subtitle="Real Gemini AI-powered 24/7 educational tutor" />

        <main className="flex-1 p-4 lg:p-6 max-w-5xl w-full mx-auto flex flex-col min-h-0">
          
          {/* Main Chat Panel */}
          <div className="flex-1 rounded-3xl glass-panel border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
            
            {/* Header bar inside chat */}
            <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-md">
                  <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    LearnMate AI Tutor
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </h3>
                  <span className="text-[10px] text-slate-400">Powered by FastAPI + Gemini AI</span>
                </div>
              </div>

              <span className="text-[11px] bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Gemini Live
              </span>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {messages.map((msg) => {
                const isAI = msg.sender === 'ai';

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAI && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shrink-0 shadow-md">
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                          <Bot className="w-5 h-5 text-cyan-400" />
                        </div>
                      </div>
                    )}

                    <div className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-3 ${
                      isAI
                        ? 'bg-slate-900 border border-slate-800 text-slate-200 shadow-md'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-semibold shadow-lg shadow-cyan-500/15'
                    }`}>
                      
                      {/* Main Answer text */}
                      <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                      {/* Code / Example Block if provided */}
                      {msg.example && (
                        <div className="mt-3 bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-cyan-300 overflow-x-auto relative">
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400 font-sans">
                            <span className="flex items-center gap-1"><Code className="w-3.5 h-3.5 text-cyan-400" /> Example / Code</span>
                            <button
                              onClick={() => handleCopy(msg.example, `ex-${msg.id}`)}
                              className="hover:text-cyan-400 flex items-center gap-1"
                            >
                              {copiedId === `ex-${msg.id}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `ex-${msg.id}` ? 'Copied' : 'Copy'}</span>
                            </button>
                          </div>
                          <pre>{msg.example}</pre>
                        </div>
                      )}

                      {/* Practice Question Box if provided */}
                      {msg.practiceQuestion && (
                        <div className="mt-3 p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-200">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 mb-1">
                            <HelpCircle className="w-4 h-4 text-purple-400" /> Practice Challenge
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">{msg.practiceQuestion}</p>
                        </div>
                      )}

                      {/* Timestamp & Copy footer */}
                      {isAI && (
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                          <span>{msg.timestamp}</span>
                          <button
                            onClick={() => handleCopy(msg.text, msg.id)}
                            className="hover:text-cyan-400 flex items-center gap-1"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy Answer'}</span>
                          </button>
                        </div>
                      )}

                    </div>

                    {!isAI && (
                      <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">
                        AJ
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Thinking loading indicator */}
              {isTyping && (
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                  <span className="font-medium text-cyan-400">LearnMate AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Buttons */}
            <div className="px-6 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Suggested Questions:</span>
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedClick(q)}
                  className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-cyan-300 hover:text-white transition-colors whitespace-nowrap shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask any educational question (e.g. Explain recursion in Python)..."
                  disabled={isTyping}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50"
                />
                <Button
                  type="submit"
                  variant="gradient"
                  size="md"
                  icon={isTyping ? Loader2 : Send}
                  disabled={!inputText.trim() || isTyping}
                  className="rounded-2xl px-5 py-3"
                >
                  {isTyping ? 'Thinking...' : 'Send'}
                </Button>
              </form>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
