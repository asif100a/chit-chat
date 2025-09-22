import { TabTypes } from '@/app/page'
import Image from 'next/image'
import React from 'react'

interface TabsProps {
   tabs: TabTypes[]
   activeTab: TabTypes
   setActiveTab: React.Dispatch<React.SetStateAction<TabTypes>>
   className?: string
}

export default function ChatTabs({
   tabs,
   activeTab,
   setActiveTab,
   className,
}: TabsProps) {
   return (
      <div
         className={`w-fit overflow-hidden p-1.5 bg-white rounded-lg flex items-center gap-6 ${className}`}
      >
         {tabs.map((tab: TabTypes) => (
            <button
               key={tab.name}
               onClick={() => setActiveTab(tab)}
               className={`w-full text-nowrap focus:outline-none px-4 py-2 text-lg font-medium cursor-pointer ${
                  tab?.name === activeTab?.name
                     ? 'bg-fuchsia-700/70 text-white'
                     : 'bg-transparent hover:bg-[#e1e3e4]'
               } rounded-md inline-flex items-center gap-2`}
            >
               {/* <Image
                  src={tab?.icon}
                  alt={tab.name}
                  width={24}
                  height={24}
                  className="w-6 h-6"
               />{' '} */}
               <span>{tab.name}</span>
            </button>
         ))}
      </div>
   )
}
