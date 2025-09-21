"use client";

import { SimpleSearchForm } from "@/components/custom-ui/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import ChatBody from "./_components/ChatBody";
import {io} from 'socket.io-client';

interface ChatUIProps {
  activeTab: string;
}

interface GroupChatTypes {
  name: string;
  text: string;
  timeAgo: number;
}

// Connect to backend
const socket = io(process.env.NEXT_PUBLIC_BACKEND_SERVER)

const groupChatData: GroupChatTypes[] = [
  {
    name: "Bob Marley",
    text: "Emily: Okk Im in.",
    timeAgo: 37,
  },
  {
    name: "Alice Smith",
    text: "Emily: Okk Im in.",
    timeAgo: 37,
  },
  {
    name: "John Doe",
    text: "Emily: Okk Im in.",
    timeAgo: 37,
  },
  {
    name: "Jane Williams",
    text: "Emily: Okk Im in.",
    timeAgo: 37,
  },
];

const ChatUI = ({ activeTab }: ChatUIProps) => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Listen for the chat message
    socket.on("chatMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage") // Cleanup
    }
  }, []);

  // Handle Send Message
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const message = (e.target as HTMLFormElement).message.value;

    console.log("Message: ", message);
  };

  // Handle Notification
  const handleSendNotification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Message sent!");
  };

  return (
    <div className="flex gap-6 h-screen">
      {/* Sidebar */}
      <aside className="w-full h-full max-w-sm bg-white rounded-xl overflow-y-auto">
        <div className="p-4">
          <SimpleSearchForm
            onSearch={(value: string) => setSearchTerm(value)}
          />
        </div>
        {/* Chat list */}
        <div className="space-y-2 p-4">
          {groupChatData.map((chat, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src="/images/user1.jpg"
                  alt="avatar"
                  width={80}
                  height={80}
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-base">
                  <p className="text-lg font-semibold text-black-primary text-nowrap">
                    {chat.name}
                  </p>
                  <p className="text-black-normal">{chat.text}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-black-normal">
                {chat.timeAgo}min ago
              </span>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat window */}
      <ChatBody handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatUI;
