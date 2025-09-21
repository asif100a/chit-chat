'use client'

import ChatTabs from '@/components/communication/ChatTabs'
import ChatUI from '@/components/communication/ChatUI'
import React, { useState } from 'react'

interface Tab {
   name: string
   icon: string
}

const tabs: Tab[] = [
   { name: 'Group Discussion', icon: '/icons/chat.svg' },
   { name: 'One-way Notification', icon: '/icons/ring-bell.svg' },
]

export default function Home() {
   const [activeTab, setActiveTab] = useState<string>(tabs[0]?.name)

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
   )
}
