import { Bot } from 'lucide-react'; // Icône robot
import '../styles/App.css';

export default function FloatingChatBot() {
  const handleClick = () => {
    const target = document.getElementById('chat-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="floating-chatbot-wrapper" onClick={handleClick}>
      <div className="bot-icon pulse">
       <a href="#chat" ><Bot size={26} color="#fff" /></a>
      </div>
      <div className="chatbot-bubble animate-in">
        <p className="mb-0">
          Assistance IA disponible<br />
          <strong>Commencer à discuter</strong>
        </p>
      </div>
    </div>
  );
}
