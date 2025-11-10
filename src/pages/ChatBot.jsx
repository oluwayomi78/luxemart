import { useState, useRef, useEffect } from "react";

const ChatBot = () => {
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatRef = useRef(null);
    const chatEndRef = useRef(null);

    // Auto-scroll only if user is near the bottom
    useEffect(() => {
        const chatEl = chatRef.current;
        if (!chatEl) return;

        const isNearBottom =
            chatEl.scrollHeight - chatEl.scrollTop - chatEl.clientHeight < 100;

        if (isNearBottom && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory, isLoading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        setMessage("");

        setIsLoading(true);
        const userMessage = { role: "user", text: message };
        const updatedChatHistory = [...chatHistory, userMessage];
        setChatHistory(updatedChatHistory);

        try {
            const response = await fetch("https://e-commerce-backend-vert-six.vercel.app/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) throw new Error("Network response was not ok");
            const data = await response.json();

            const botMessage = { role: "model", text: data.reply };
            setChatHistory([...updatedChatHistory, botMessage]);
        } catch (error) {
            console.error("Error fetching data:", error);
            const errorMessage = {
                role: "model",
                text: "⚠️ Sorry, I ran into an error. Please try again.",
            };
            setChatHistory([...updatedChatHistory, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 bg-[black] text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition"
                >
                    💬
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 bg-gray-900 text-gray-100 rounded-2xl shadow-2xl flex flex-col border border-gray-700 overflow-hidden">
                    <div className="bg-gray-800 px-4 py-3 flex justify-between items-center font-semibold text-lg border-b border-gray-700">
                        💬 ChatBot Assistant
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div
                        ref={chatRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
                    >
                        {chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-[80%] break-words text-sm ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-700 text-gray-100 rounded-bl-none"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-400 text-sm italic">
                                    Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center border-t border-gray-700 bg-gray-800 p-3"
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-700 text-gray-100 placeholder-gray-400 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                        <button
                            type="submit"
                            className="ml-3 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 transition text-white font-semibold"
                        >
                            Send
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
