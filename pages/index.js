import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const response = await fetch('/api/send-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });

        const data = await response.json();

        if (data.success) {
          setFeedback({ text: 'message sent successfully!', type: 'success' });
          setMessage('');
        } else {
          throw new Error('failed to send message');
        }
      } catch (error) {
        console.error('error sending message:', error);
        setFeedback({ text: 'failed to send message. please try again.', type: 'error' });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.messageBox}>
        <h1>anomessg</h1>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="type your anonymous message here..."
        />
        <button onClick={sendMessage} disabled={!message.trim() || message.length > 200}>
          Send Message
        </button>
      </div>

      {feedback.text && (
        <div className={`${styles.feedback} ${feedback.type === 'success' ? styles.success : styles.error}`}>
          {feedback.text}
        </div>
      )}

      <div className={styles.floatingIcons}>
        {[...Array(15)].map((_, i) => (
          <span key={i} className={styles.icon}>🦋</span>
        ))}
      </div>

      <footer className={styles.footer}>
        created by{' '}
        <a href="https://x.com/_kiyosh1" target="_blank" rel="noopener noreferrer">
          _kiyosh1
        </a>{' '}
        for fun lol, it's open source btw{' '}
        <a href="https://github.com/kiyosh11/anomessgs" target="_blank" rel="noopener noreferrer">
          anomessg
        </a>
      </footer>
    </div>
  );
            }
