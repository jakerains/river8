"use client";

import { useState, useEffect, useRef } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function ChatApp() {
  const [messages, setMessages] = useState<Array<Schema["Chat"]["type"]>>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function listMessages() {
    client.models.Chat.observeQuery().subscribe({
      next: (data) => setMessages([...data.items].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )),
    });
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Save user message
    await client.models.Chat.create({
      message: inputText,
      isUser: true,
      timestamp: new Date().toISOString(),
    });

    // Get AI response
    const response = await client.queries.generateResponse({
      prompt: inputText,
    });

    // Save AI response
    await client.models.Chat.create({
      message: response,
      isUser: false,
      timestamp: new Date().toISOString(),
    });

    setInputText("");
  }

  return (
    <main className="chat-container">
      <div className="messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message ${msg.isUser ? "user" : "assistant"}`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
