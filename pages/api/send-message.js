import axios from 'axios';

function createASCIIFrame(message) {
  const maxWidth = 50;
  const lines = [];
  let currentLine = '';
  const words = message.split(' ');

  for (const word of words) {
    if ((currentLine + word).length > maxWidth) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }
  lines.push(currentLine.trim());

  const maxLineLength = Math.max(...lines.map(line => line.length));
  const topBottom = '╔' + '═'.repeat(maxLineLength + 2) + '╗';
  const bottom = '╚' + '═'.repeat(maxLineLength + 2) + '╝';

  let asciiArt = `${topBottom}\n`;
  for (const line of lines) {
    asciiArt += `║ ${line.padEnd(maxLineLength)} ║\n`;
  }
  asciiArt += `${bottom}`;

  return asciiArt;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      return res.status(500).json({ success: false, error: 'Discord webhook URL is not configured' });
    }

    try {
      const asciiMessage = createASCIIFrame(message);
  
      await axios.post(webhookUrl, {
        content: `\`\`\`${asciiMessage}\`\`\`` 
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending message to Discord:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
