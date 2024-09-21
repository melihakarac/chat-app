interface Message {
  text: string;
  sender: "user" | "bot";
}

const randomReplies = [
  "How can I help you?",
  "What do you need?",
  "I’m here to assist you.",
];

export const getBotReply = (): Promise<Message> => {
  return new Promise((resolve) => {
    const reply =
      randomReplies[Math.floor(Math.random() * randomReplies.length)];
    setTimeout(() => {
      resolve({ text: reply, sender: "bot" });
    }, 1000);
  });
};

export const loadChatHistory = (key: string): Message[] => {
  const savedMessages = localStorage.getItem(key);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

export const saveChatHistory = (key: string, messages: Message[]): void => {
  localStorage.setItem(key, JSON.stringify(messages));
};

export const addUserMessage = (
  messages: Message[],
  newMessage: string
): Message[] => {
  const userMessage: Message = { text: newMessage, sender: "user" };
  return [...messages, userMessage];
};

export const clearChatHistory = (key: string): void => {
  localStorage.removeItem(key);
};
