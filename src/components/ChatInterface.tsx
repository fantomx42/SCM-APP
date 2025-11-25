'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: string;
    role: 'user' | 'system' | 'assistant';
    content: string;
    timestamp: Date;
};

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'system',
            content: 'System initialized. SCM v3.1 monitoring active.',
            timestamp: new Date(),
        },
        {
            id: '2',
            role: 'assistant',
            content: 'Welcome to Symbolic Lab. How can I assist you with the simulation today?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput('');

        // Simulate response
        setTimeout(() => {
            const response: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Processing command: "${input}". Adjusting symbolic parameters...`,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, response]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[600px] bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
                <h3 className="font-semibold text-zinc-200">System Interface</h3>
                <p className="text-xs text-zinc-500">Direct communication link</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-br-none'
                                    : msg.role === 'system'
                                        ? 'bg-zinc-800/50 text-zinc-400 font-mono text-xs border border-zinc-700/50'
                                        : 'bg-zinc-800 text-zinc-200 rounded-bl-none'
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Enter command..."
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 placeholder:text-zinc-600"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
