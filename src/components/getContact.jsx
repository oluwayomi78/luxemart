import React, { useEffect, useState } from "react";

const GetMessage = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                setLoading(true);
                setError(null);

                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                const token = userInfo?.token;

                const res = await fetch("https://e-commerce-backend-7gua.onrender.com/api/contact/", {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { Authorization: `Bearer ${token}` }),
                    },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.message || "Failed to fetch messages");
                }

                const data = await res.json();
                setMessages(data);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <div className="text-center py-10">Loading messages...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
                    Contact Messages
                </h2>

                {messages.length === 0 ? (
                    <p className="text-center text-gray-500">No messages found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Subject</th>
                                    <th className="px-4 py-2 text-left text-sm font-semibold">Message</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {messages.map((msg) => (
                                    <tr key={msg._id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 text-sm text-gray-800">{msg.name}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{msg.email}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{msg.subject}</td>
                                        <td className="px-4 py-2 text-sm text-gray-700">{msg.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetMessage;
