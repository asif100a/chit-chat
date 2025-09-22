import Image from "next/image";
import { FaCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";

interface ChatBodyProps {
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  chat: any;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
}

export default function ChatBody({ handleSendMessage, chat, setMessage, message }: ChatBodyProps) {
  return (
    <main className="h-full flex-1 bg-white rounded-xl overflow-auto">
      <div className="h-full flex flex-col">
        {/* Chat header */}
        <div className="flex items-center space-x-4 p-4 bg-yellow-primary border-b">
          <Image
            src="/images/user2.webp"
            alt="avatar"
            width={80}
            height={80}
            className="w-14 h-14 rounded-full"
          />
          <div className="flex-1">
            <p className="font-semibold text-lg text-black-normal">
              Shahid Hasan
            </p>
            <p className="text-sm text-black-normal flex items-center">
              Active <FaCircle className="ml-1 text-green-500" size={8} />
            </p>
          </div>
        </div>

        <div className="flex-1 h-full flex flex-col justify-between">
          {/* Chat messages */}
          <div className="h-full flex-1 p-4 space-y-4">
            {/* Message group */}
            {chat
              ?.map((msg: any) => (
                <div
                  key={msg?.id}
                  className="flex flex-col space-y-2 overflow-y-auto"
                >
                  <div className="">
                    <strong>{msg?.id}</strong> {msg?.text}
                  </div>

                  {/* Received message */}
                  {/* <div className="flex items-start space-x-2">
                    <Image
                      src="/images/user2.webp"
                      alt="avatar"
                      width={60}
                      height={60}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="bg-gray-100 px-4 py-2 rounded-lg max-w-md text-black-normal">
                      Hi Jake, how are you? I saw on the app that we’ve crossed
                      paths several times this week
                    </div>
                  </div> */}

                  {/* Sent message */}
                  {/* <div className="flex items-end justify-end space-x-2">
                    <div className="bg-yellow-secondary px-4 py-2 rounded-lg max-w-md text-black-normal">
                      Hi Jake, how are you?
                    </div>
                    <Image
                      src="/images/user1.jpg"
                      alt="avatar"
                      width={60}
                      height={60}
                      className="w-8 h-8 rounded-full"
                    />
                  </div> */}
                </div>
              ))}
          </div>

          {/* Message input */}
          <div className="border-t px-4 py-6">
            <form
              onSubmit={handleSendMessage}
              className="w-full h-fit px-6 bg-gray-background rounded-lg border border-[#E6E6E6] focus:outline-none focus:ring-2 focus:ring-yellow-500 flex justify-center items-center relative"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-auto py-3  text-[#262626] placeholder:text-[#909090] focus:outline-none"
              />
              <button type="submit" className="cursor-pointer">
                <RiSendPlaneFill className="text-2xl text-yellow-500" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}