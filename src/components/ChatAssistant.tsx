import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X } from 'lucide-react';

const KNOWLEDGE_BASE = [
  {
    keywords: ['bristletech', 'bristle tech', 'who runs'],
    answer: "BristleTech (Hyderabad) is an execution-focused digital marketing and tech company that operates Launchpad. We build real skills through real-world projects and AI-powered strategies."
  },
  {
    keywords: ['what is launchpad', 'one line'],
    answer: "Launchpad is a 90-day leadership accelerator, startup builder, and proof-based talent marketplace. It converts students into Industry-ready leaders or Startup founders through execution, not just theory."
  },
  {
    keywords: ['training', 'placement', 'course'],
    answer: "No. Launchpad is NOT a training, theory, or placement coaching course. It is a real execution ecosystem built by BristleTech focusing on leadership and proof of capability."
  },
  {
    keywords: ['problem', 'solve', 'clarity', 'confidence'],
    answer: "Launchpad solves lack of career clarity, no real project experience, lack of mentorship, no proof of skills, and low confidence."
  },
  {
    keywords: ['how long', 'duration', '90 days'],
    answer: "Launchpad is a structured 90-day program. In 90 days, you move from no clarity to proven execution and a real project portfolio."
  },
  {
    keywords: ['bat exam', 'first phase', 'days 1-5'],
    answer: "Days 1–5 are the BAT Exam phase, testing thinking ability, AI tool usage, and communication. Based on performance, you are assigned to the right path."
  },
  {
    keywords: ['career path', 'corporate', 'c-level'],
    answer: "The Career Path is for those wanting to become future leaders or C-level executives inside companies. It includes Phase 1 (Days 6–40) tasks and Phase 2 (Days 41–90) leadership roles."
  },
  {
    keywords: ['roles', 'domains', 'career path roles'],
    answer: "Roles include Associate, Senior, Lead, Manager, Director. Domains cover Technology, Finance, Marketing & Sales, Operations, and Product."
  },
  {
    keywords: ['career path phase 1', 'first-five'],
    answer: "Phase 1 (Days 6–40) involves executing real tasks, using AI tools, leading small teams, and receiving daily feedback."
  },
  {
    keywords: ['career path phase 2', 'c-path'],
    answer: "Phase 2 (Days 41–90) involves leading real projects, managing teams, closing commercial deals, and presenting to investors."
  },
  {
    keywords: ['day 90 career', 'career outcome'],
    answer: "By Day 90, you become Job-ready with high skills, or enter the 'Open Project Bucket' for hiring into leadership roles."
  },
  {
    keywords: ['entrepreneur path', 'startup', 'build'],
    answer: "The Entrepreneur Path is for building real startups. It has 3 phases: R&D (Validation), MVP Build (Days 36–65), and Market Launch (Days 66–90)."
  },
  {
    keywords: ['entrepreneur phase 1', 'r&d', 'validate'],
    answer: "Phase 1 (Days 6–35) is R&D: validating customer problems, customer interviews, competitor studies, and business model design."
  },
  {
    keywords: ['entrepreneur phase 2', 'mvp build'],
    answer: "Phase 2 (Days 36–65) is MVP Build: building a startup team, developing an MVP, launching a beta, and collecting user feedback."
  },
  {
    keywords: ['entrepreneur phase 3', 'market launch'],
    answer: "Phase 3 (Days 66–90) is Market Launch: acquiring users, tracking revenue, improving unit economics, and preparing data rooms for investors."
  },
  {
    keywords: ['day 90 entrepreneur', 'startup outcome'],
    answer: "By Day 90, the startup enters the 'Open Project Bucket' and starts investor conversations for funding."
  },
  {
    keywords: ['open project bucket', 'marketplace'],
    answer: "The Open Project Bucket is a transparent opportunity marketplace for projects with proven execution, team validation, and financial clarity."
  },
  {
    keywords: ['choose', 'which path', 'risk'],
    answer: "Choose Career Path for structured growth and leadership inside companies. Choose Entrepreneur Path if you want to build a startup, like risk, and want ownership."
  },
  {
    keywords: ['difference', 'unique', 'different'],
    answer: "Launchpad is unique for its real projects (not simulations), AI-first workflows, daily accountability, gamified tracking, and direct investor/company access."
  },
  {
    keywords: ['who can join', 'mba', 'btech', 'fresher', 'student'],
    answer: "Launchpad is for MBA/BTech/MTech students, freshers, career switchers, and aspiring founders—even if you don't have an idea yet!"
  },
  {
    keywords: ['hackathon details', 'zero to one hackathon'],
    answer: "The Zero to One Hackathon is a one-day entry point where you solve real industry problems and build concepts to present to mentors."
  },
  {
    keywords: ['funding', '₹10 Lakhs'],
    answer: "Yes! Eligible startup teams can receive startup funding up to ₹10 Lakhs based on evaluation and performance during the Entrepreneur Path."
  },
  {
    keywords: ['register', 'apply', 'whatsapp'],
    answer: "You can register through the website or hackathon links! Join our WhatsApp group for updates, and our team will guide you through the next steps."
  },
  {
    keywords: ['philosophy', 'one life', 'one story'],
    answer: "Our philosophy is 'One Life. One Story.' We believe skills beat marks, execution builds confidence, and AI + humans define the future."
  },
  {
    keywords: ['end goal', 'outcome'],
    answer: "By Day 90, you are either a Startup Founder with an MVP or a Job-ready high-skill professional with a clear career next step."
  },
  {
    keywords: ['location', 'address', 'hyderabad'],
    answer: "BristleTech is located in Kothaguda, Hyderabad, Telangana. Visit us to see our execution workspace!"
  }
];

const QUICK_ACTIONS = [
  { label: "🚀 Know Launchpad", value: "What is Launchpad?" },
  { label: "💡 Entrepreneur Path", value: "Tell me about Entrepreneur Path" },
  { label: "📈 Career Path", value: "Tell me about Career Path" },
  { label: "🏆 Hackathon", value: "Tell me about the Hackathon" },
  { label: "🏢 Who runs this?", value: "Who is BristleTech?" },
  { label: "📝 Register Now", value: "How can I register?" }
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your Launchpad AI assistant. Ready to help you choose your path?"
    }
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const findResponse = (userText: string) => {
    const text = userText.toLowerCase();
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => text.includes(k))) return item.answer;
    }
    return "Launchpad is an execution ecosystem by BristleTech. You can grow as a Leader (Career Path) or Founder (Entrepreneur Path). Would you like to know more about the Hackathon or these paths?";
  };

  const handleSend = (textOverride?: string) => {
    const finalMsg = textOverride || message;
    if (!finalMsg.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: finalMsg }]);
    if (!textOverride) setMessage('');

    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = findResponse(finalMsg);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: response
      }]);
    }, 600 + Math.random() * 800);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full p-3 sm:p-4 transition-all hover:scale-110 active:scale-95 group"
          style={{
            background: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 50%, #00A9FF 100%)',
            boxShadow: '0 8px 32px rgba(177, 18, 44, 0.45), 0 0 24px rgba(0, 169, 255, 0.3)'
          }}
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      )}

      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
          style={{
            height: '385px',
            width: '365px',
            maxHeight: '385px',
            maxWidth: '365px',
            background: 'rgba(10, 14, 26, 0.99)',
            border: '2px solid rgba(255, 58, 74, 0.4)',
            borderRadius: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 20px rgba(177, 18, 44, 0.15)'
          }}
        >
          {/* Header */}
          <div
            className="p-5 flex justify-between items-center"
            style={{
              background: 'linear-gradient(135deg, #9b1025 0%, #B1122C 50%, #d41432 100%)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-white/15 backdrop-blur-md">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-[12px] uppercase tracking-[0.15em]">Launchpad AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-medium text-white/70">Online now</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-1 p-5 space-y-4 overflow-y-auto custom-scrollbar"
            style={{
              background: 'radial-gradient(circle at top right, rgba(177, 18, 44, 0.05), transparent 70%), #0a0e1a'
            }}
          >
            <style>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
              }
            `}</style>

            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 shadow-lg text-[11px] leading-relaxed ${msg.type === 'user'
                    ? 'rounded-2xl rounded-tr-none bg-white/[0.08] text-white font-medium border border-white/20'
                    : 'rounded-2xl rounded-tl-none bg-gradient-to-br from-[#B1122C] to-[#FF3A4A] border border-white/10 text-white font-medium'
                    }`}
                  style={{
                    boxShadow: msg.type === 'user' ? '0 4px 15px rgba(255,255,255,0.05)' : '0 4px 20px rgba(177, 18, 44, 0.3)'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/[0.03] border border-white/[0.05] p-2.5 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                  <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-75"></span>
                  <span className="w-1 h-1 bg-white/40 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}

            {/* Quick Action Templates */}
            {messages[messages.length - 1]?.type === 'bot' && !isTyping && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {QUICK_ACTIONS.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(action.value)}
                    className="text-[10px] font-bold py-2 px-4 rounded-full border border-white/10 transition-all active:scale-95 whitespace-nowrap shadow-md"
                    style={{
                      background: 'rgba(177, 18, 44, 0.15)',
                      color: '#FFFFFF',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/40 border-t border-white/[0.05] backdrop-blur-2xl">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-white/[0.03] border-white/[0.1] text-white placeholder:text-slate-500 rounded-2xl h-10 text-[11px] focus:ring-1 focus:ring-[#B1122C]/50 transition-all px-4"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!message.trim() || isTyping}
                className="bg-gradient-to-br from-[#B1122C] to-[#FF3A4A] text-white rounded-2xl h-10 w-10 p-0 flex items-center justify-center shadow-lg shadow-[#B1122C]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
