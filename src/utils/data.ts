export interface Message {
  text: string;
  sender: "user" | "bot";
}

/**
 * Load chat history from localStorage.
 * @param {string} key - The key used to store chat history (e.g., "chatHistory").
 * @returns {Message[]} The loaded chat messages.
 */
export const loadChatHistory = (key: string): Message[] => {
  const savedMessages = localStorage.getItem(key);
  return savedMessages ? JSON.parse(savedMessages) : [];
};

/**
 * Save chat history to localStorage.
 * @param {string} key - The key used to store chat history (e.g., "chatHistory").
 * @param {Message[]} messages - The messages to save.
 */
export const saveChatHistory = (key: string, messages: Message[]): void => {
  localStorage.setItem(key, JSON.stringify(messages));
};

/**
 * Clear chat history from localStorage.
 * @param {string} key - The key used to store chat history (e.g., "chatHistory").
 */
export const clearChatHistory = (key: string): void => {
  localStorage.removeItem(key);
};
