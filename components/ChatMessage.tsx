'use client';

import { ChatMessage } from '@/types/chat';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface ChatMessageProps {
    message: ChatMessage;
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
                <div
                    className={`px-4 py-3 rounded-2xl ${isUser
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                        }`}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
                <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mt-1`}>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                    </span>
                </div>
            </div>
            <div className={`flex items-end ${isUser ? 'order-1 mr-2' : 'order-2 ml-2'}`}>
                <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${isUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                >
                    {isUser ? 'U' : 'AI'}
                </div>
            </div>
        </div>
    );
}
