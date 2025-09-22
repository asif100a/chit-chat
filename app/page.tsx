"use client";

import ChatTabs from "@/components/communication/ChatTabs";
import ChatUI from "@/components/communication/ChatUI";
import React, { useState } from "react";

export interface TabTypes {
  userId: string;
  name: string;
  receiverId: string;
  receiverName: string;
}

const tabs: TabTypes[] = [
  { userId: "user1", name: "Bob", receiverId: "user2", receiverName: "Alice" },
  { userId: "user2", name: "Alice", receiverId: "user1", receiverName: "Bob" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabTypes>(tabs[0]);

  return (
    <div className="container mx-auto py-10">
      {/* Chat UI */}
      <div className="space-y-6 bg-gray-100 p-6 rounded-2xl">
        <ChatTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <ChatUI activeTab={activeTab} />
      </div>
    </div>
  );
}
