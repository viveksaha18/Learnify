"use client";
import { useState, useRef, useEffect } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botMessage = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to connect to Gemini API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-3xl bg-gray-50 shadow-xl rounded-2xl p-4 sm:p-6 flex flex-col h-[80vh] sm:h-[85vh]">
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4 text-center">
          💬 Chatbot
        </h2>

        {/* Chat Box */}
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto border border-gray-200 rounded-xl p-3 sm:p-4 bg-white mb-4 scroll-smooth"
        >
          {messages.length === 0 ? (
            <p className="text-center text-gray-400 text-sm sm:text-base mt-10">
              Start a conversation 🤖
            </p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`my-2 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] sm:max-w-[70%] text-sm sm:text-base ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <p className="text-gray-500 text-sm italic mt-2">Gemini is thinking...</p>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border border-gray-300 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all"
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
