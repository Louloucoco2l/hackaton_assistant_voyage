import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import '../styles/App.css';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Bonjour ! Je suis votre assistant de voyage. Dites-moi où vous voulez aller, quand, et avec quel budget.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    setDestination,
    setDateDepart,
    setDateRetour,
    setVoyageurs
  } = useTravel();

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: 'Tu es un assistant de voyage. Pose des questions si besoin et réponds de manière claire et utile.' },
            ...newMessages.map((msg) => ({ role: msg.role, content: msg.text }))
          ]
        })
      });

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      console.error('Erreur de communication :', err);
      setMessages([...newMessages, { role: 'assistant', text: 'Désolé, une erreur est survenue côté serveur.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='chat' className="card shadow-sm">
      <div className="card-body">
        <h4 className="mb-3">Assistant de voyage</h4>
        <div className="chat-box mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.role === 'user' ? 'text-end' : 'text-start'}`}
            >
              <span className={`badge ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'} chat-badge`}>
               {msg.text}
              </span>

            </div>
          ))}
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Décrivez votre voyage..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;