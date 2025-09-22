"use client";

import { TabTypes } from "@/app/page";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { io, Socket } from "socket.io-client";

export default function ChatUI({ activeTab }: { activeTab: TabTypes }) {
  const userId = activeTab.userId;
  const receiverId = activeTab.receiverId;

  // console.log("userId: ", userId);
  // console.log("receiverId: ", receiverId);
  // console.log('-----------------------------')

  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [chat, setChat] = useState<any[]>([]);
  // const fileRef = useRef<HTMLInputElement>(null);
  // console.log("Socket ---------> ", socket);
  console.log("chat ---------> ", chat);
  // console.log("message ---------> ", message);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file || !socket) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      socket?.emit("sendImage", {
        senderId: userId,
        receiverId,
        image: base64,
      });
      // Add locally to sender's view
      setChat((prev) => [
        ...prev,
        { senderId: userId, image: base64, time: Date.now() },
      ]);
    };
    reader.readAsDataURL(file);
    // Reset input
    e.target.value = "";
  };

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_SERVER as string, {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    // Register current user (Initial Registration)
    newSocket.emit("register", userId);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Re-register if userId changes(e.g., tab switch without remount)
  useEffect(() => {
    if (socket) {
      socket.emit("register", userId);
    }
  }, [userId, socket]);

  useEffect(() => {
    if (!socket) return;

    // Listen for the private message
    const handlePrivateMessage = (msg: any) => {
      setChat((prev) => [...prev, msg]);
    };
    socket?.on("privateMessage", handlePrivateMessage);

    // Listen for the private images
    const handleReceiveImage = (msg: any) => {
      setChat((prev) => [...prev, msg]);
    };
    socket.on("receiverImage", handleReceiveImage);

    return () => {
      socket?.off("privateMessage", handlePrivateMessage);
      socket?.off("receiverImage", handleReceiveImage);
    };
  }, [socket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    // if(message.trim() && socket) {
    //   socket?.emit("chatMessage", message)
    //   setMessage("")
    // }
    if (message.trim() && socket) {
      const msgData = { senderId: userId, text: message, time: Date.now() };

      socket?.emit("privateMessage", {
        senderId: userId,
        receiverId,
        text: message,
      });
      // Add locally to sender's view
      setChat((prev) => [...prev, msgData]);
      setMessage("");
    }
  };

  return (
    <div>
      <h2></h2>
      <div style={{ height: "200px", overflowY: "auto" }}>
        {chat.map((msg, i) => (
          // <p key={i}>
          //   <strong>{msg.id.slice(0, 4)}:</strong> {msg.text}
          // </p>
          <div
            key={i}
            className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
          >
            {msg.image ? (
              <Image
                src={msg.image}
                alt="Sent image"
                width={200}
                height={200}
              />
            ) : (
              <p>
                <strong>{msg.senderId}:</strong> {msg.text}
              </p>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center gap-6">
        {/* <button
          onClick={fileRef.current && fileRef.current.click()}
          className="cursor-pointer"
        >
        </button> */}
        <label
          htmlFor="upload-file"
          className="cursor-pointer p-2 border rounded"
        >
          <FaUpload />
          <input
            // ref={fileRef}
            id="upload-file"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border w-full max-w-xl h-10 px-3 rounded-lg"
          placeholder="Type..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
