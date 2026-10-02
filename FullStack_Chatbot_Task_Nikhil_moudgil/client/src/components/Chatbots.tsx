import React, { useState } from 'react';
import { ChatMessage } from '../types';

const PREDEFINED_QA: Record<string, string> = {
  "what services does dronetv provide?": "DroneTV provides Aerial Cinematography, Industrial Inspection, Mapping & Surveying, Event Live Streaming, and Agricultural Spraying.",
  "what courses/training are available?": "We offer DGCA-Certified Remote Pilot Training, Commercial Aerial Filming Masterclasses, and Drone Assembly & Maintenance Workshops.",
  "how can i contact dronetv?": "You can reach us at contact@dronetv.in, call +91 88043 49999, or fill out the enquiry form on this page!",
  "how can i register?": "You can register by selecting your preferred training program in our Courses section or submitting an enquiry form below.",
  "i am interested in a service.": "Awesome! Feel free to ask about our specific aerial services or complete the enquiry form to receive a customized quote.",
  "i am a student.": "Welcome! We offer specialized student discounts for DGCA certification and career guidance in drone technology.",
  "i want to speak with someone.": "Our support team is available! Please leave your contact details in the enquiry form or call us directly at +91 88043 49999."
};

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: '1',
  sender: 'bot',
  text: 'Hello! Welcome to DroneTV Support Assistant. How can I assist you today?',
  options: [
    'What services does DroneTV provide?',
    'What courses/training are available?',
    'How can I register?',
    'I am a student.',
    'I want to speak with someone.'
  ],
  timestamp: new Date()
};

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_BOT_MESSAGE]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date()
    };

    const normalizedQuery = query.toLowerCase();
    let botResponseText = PREDEFINED_QA[normalizedQuery];

    if (!botResponseText) {
      const matchedKey = Object.keys(PREDEFINED_QA).find(
        key => normalizedQuery.includes(key) || key.includes(normalizedQuery)
      );
      botResponseText = matchedKey 
        ? PREDEFINED_QA[matchedKey]
        : "I'm sorry, I didn't recognize that question. You can pick one of the options below or fill out our enquiry form to reach our support team.";
    }

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'bot',
      text: botResponseText,
      options: [
        'What services does DroneTV provide?',
        'What courses/training are available?',
        'How can I contact DroneTV?'
      ],
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleReset = () => {
    setMessages([
      {
        ...INITIAL_BOT_MESSAGE,
        id: Date.now().toString(),
        text: 'Conversation reset. How else can I help you?'
      }
    ]);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000, fontFamily: 'sans-serif' }}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            padding: '14px 22px',
            background: '#0284c7',
            color: '#ffffff',
            border: 'none',
            borderRadius: '50px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          💬 Chat with DroneTV AI
        </button>
      ) : (
        <div style={{
          width: '360px',
          height: '520px',
          background: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #cbd5e1'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontWeight: '600', fontSize: '15px' }}>DroneTV Support</div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Rule-Based AI Assistant</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                onClick={handleReset} 
                style={{ background: 'transparent', color: '#cbd5e1', border: 'none', cursor: 'pointer', fontSize: '12px' }}
                title="Reset Conversation"
              >
                🔄 Reset
              </button>
              <button 
                onClick={() => setIsOpen(false)} 
                style={{ background: 'transparent', color: '#ffffff', border: 'none', cursor: 'pointer', fontSize: '16px' }}
              >
                ✖
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div style={{
            flex: 1,
            padding: '14px',
            overflowY: 'auto',
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  lineHeight: '1.4',
                  background: msg.sender === 'user' ? '#0284c7' : '#e2e8f0',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a'
                }}>
                  {msg.text}
                </div>
                {msg.options && msg.sender === 'bot' && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(opt)}
                        style={{
                          fontSize: '11px',
                          background: '#ffffff',
                          border: '1px solid #0284c7',
                          color: '#0284c7',
                          padding: '5px 10px',
                          borderRadius: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Panel */}
          <div style={{ padding: '10px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '8px', background: '#ffffff' }}>
            <input 
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button 
              onClick={() => handleSend()}
              style={{
                padding: '8px 14px',
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};