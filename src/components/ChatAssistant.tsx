import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X } from 'lucide-react';

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your Launchpad AI assistant. Ready to help you choose your path?"
    },
    {
      type: 'bot',
      text: "💡 I can help with questions about Entrepreneur and Career paths, program details, and more!"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { type: 'user', text: message }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "Thanks for your question! Our team will get back to you with detailed information about Launchpad."
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Chat Button - matches website gradient theme */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full p-3 sm:p-4 transition-all hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #B1122C 0%, #FF3A4A 50%, #00A9FF 100%)',
            boxShadow: '0 0 24px rgba(177, 18, 44, 0.45), 0 0 24px rgba(0, 169, 255, 0.3)'
          }}
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[calc(100vw-2rem)] sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: 'rgba(10, 14, 26, 0.97)',
            border: '1px solid rgba(177, 18, 44, 0.25)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,58,74,0.1)'
          }}
        >
          {/* Header - website gradient */}
          <div
            className="p-4 flex justify-between items-center"
            style={{
              background: 'linear-gradient(135deg, #7F0B1E 0%, #B1122C 40%, #1a3a5c 100%)',
              borderBottom: '1px solid rgba(255, 58, 74, 0.2)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2" style={{ background: 'rgba(255,255,255,0.15)' }}>
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Launchpad AI</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto"
            style={{ background: 'rgba(10, 14, 26, 0.98)' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                    ? 'rounded-br-sm'
                    : 'rounded-bl-sm'
                    }`}
                  style={{
                    background: msg.type === 'user'
                      ? 'linear-gradient(135deg, #B1122C, #FF3A4A)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: msg.type === 'user' ? 'white' : '#CBD5E1',
                    border: msg.type === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-4"
            style={{
              background: 'rgba(10, 14, 26, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)'
            }}
          >
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 text-white placeholder:text-slate-500"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              />
              {/* Send button - gradient */}
              <Button
                onClick={handleSend}
                style={{
                  background: 'linear-gradient(135deg, #B1122C, #FF3A4A)',
                  color: 'white',
                  border: 'none'
                }}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
