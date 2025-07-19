const { StreamChat } = require('stream-chat');
const { generateUsername } = require('unique-username-generator');

export default async function handler(req, res) {
  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_API_SECRET;
  const client = StreamChat.getInstance(apiKey, secret);

  const userId = generateUsername();
  const token = client.createToken(userId);

  res.status(200).json({ userId, token });
}
