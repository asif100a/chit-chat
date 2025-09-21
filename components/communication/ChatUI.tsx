"use client";

import { SimpleSearchForm } from "@/components/custom-ui/actions";
import Image from "next/image";
import { useState } from "react";
import ChatBody from "./_components/ChatBody";

interface ChatUIProps {
  activeTab: string;
}

interface GroupChatTypes {
  name: string;
  text: string;
  timeAgo: number;
}

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
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Handle Send Message
  const handleSendGroupMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("Message sent!");
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
                  src="/images/dashboard/student.png"
                  alt="avatar"
                  width={80}
                  height={80}
                  className="w-14 h-14 rounded-full"
                />
                <div className="text-base">
                  <p className="text-lg font-semibold text-black-primary text-nowrap">
                    {chat.group}
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
      <ChatBody handleSendMessage={handleSendGroupMessage} />
    </div>
  );
};

export default ChatUI;
