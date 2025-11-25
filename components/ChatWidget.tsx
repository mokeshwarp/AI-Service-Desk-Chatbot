// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FiSend, FiX, FiMessageCircle } from "react-icons/fi";
// import Lottie from "lottie-react";
// import botAnimation from "../animation/RobotSaludando.json"; // place your bot-avatar.json here

// type FAQ = { question: string; answer: string };
// type Message = { sender: "user" | "bot"; text: string };

// export default function ChatWidget() {
//   const [open, setOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState<"faqs" | "chat">("faqs");
//   const [faqs, setFaqs] = useState<FAQ[]>([]);
//   const [faqLoading, setFaqLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [history, setHistory] = useState<any[]>([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (open && activeTab === "faqs" && faqs.length === 0) {
//       setFaqLoading(true);
//       fetch("http://localhost:8000/faqs")
//         .then((res) => res.json())
//         .then((data) => {
//           setFaqs(data);
//           setFaqLoading(false);
//         })
//         .catch(() => setFaqLoading(false));
//     }
//   }, [open, activeTab, faqs.length]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   async function sendQuery(query: string) {
//     const userMsg = { sender: "user", text: query };
//     setMessages((prev) => [...prev, userMsg]);
//     setHistory((prev) => [...prev, { role: "user", content: query }]);

//     try {
//       const res = await fetch("http://localhost:8000/query", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query, conversation_history: history }),
//       });
//       const data = await res.json();
//       const botMsg = { sender: "bot", text: data.answer };
//       setMessages((prev) => [...prev, botMsg]);
//       setHistory((prev) => [...prev, { role: "assistant", content: data.answer }]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ An error occurred. Please try again." },
//       ]);
//     }
//   }

//   function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
//     setInput(e.target.value);
//   }

//   function sendMessage() {
//     if (input.trim()) {
//       sendQuery(input);
//       setInput("");
//     }
//   }

//   function handleFAQClick(faq: FAQ) {
//     setActiveTab("chat");
//     sendQuery(faq.question);
//   }

//   function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") sendMessage();
//   }

//   return (
//     <>
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-500 to-blue-800 text-white rounded-full w-16 h-16 shadow-xl flex items-center justify-center hover:shadow-2xl transition-transform hover:scale-110"
//           aria-label="Open Service Desk Chat"
//         >
//           <FiMessageCircle size={28} />
//         </button>
//       )}

//       {open && (
//         <div className="fixed bottom-8 right-8 w-[400px] h-[600px] z-50 bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden ring-4 ring-indigo-100">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-blue-800 text-white px-5 py-4 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <Lottie animationData={botAnimation} style={{ width: 36, height: 36 }} />
//               <h2 className="text-xl font-bold">Service Desk Agent</h2>
//             </div>
//             <button onClick={() => setOpen(false)} aria-label="Close chat">
//               <FiX size={24} />
//             </button>
//           </div>

//           {/* Tabs */}
//           <div className="flex bg-gray-100 border-b">
//             <button
//               onClick={() => setActiveTab("faqs")}
//               className={`flex-1 py-2 text-center font-bold ${
//                 activeTab === "faqs" ? "border-b-4 border-indigo-700 text-indigo-700" : "text-gray-500"
//               }`}
//             >
//               FAQs
//             </button>
//             <button
//               onClick={() => setActiveTab("chat")}
//               className={`flex-1 py-2 text-center font-bold ${
//                 activeTab === "chat" ? "border-b-4 border-indigo-700 text-indigo-700" : "text-gray-500"
//               }`}
//             >
//               Chat
//             </button>
//           </div>

//           {/* Content */}
//           <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//             {activeTab === "faqs" && (
//               <>
//                 {faqLoading ? (
//                   <p>Loading FAQs...</p>
//                 ) : (
//                   <ul className="space-y-4">
//                     {faqs.map((faq, i) => (
//                       <li
//                         key={i}
//                         className="cursor-pointer bg-white p-4 rounded-xl shadow hover:bg-indigo-50 transition"
//                         onClick={() => handleFAQClick(faq)}
//                       >
//                         <p className="font-semibold text-indigo-700">{faq.question}</p>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </>
//             )}

//             {activeTab === "chat" && (
//               <div className="space-y-3">
//                 {messages.map((msg, i) => {
//                   // Detect numbered steps pattern
//                   const stepRegex = /\d+\.\s+/g;
//                   const isStepMessage = stepRegex.test(msg.text);
// // import React from "react";

// // helper: convert **bold** to <strong>
// function renderBold(text) {
//   const parts = text.split(/(\*\*.*?\*\*)/g);

//   return parts.map((part, idx) => {
//     if (part.startsWith("**") && part.endsWith("**")) {
//       return <strong key={idx}>{part.slice(2, -2)}</strong>;
//     }
//     return <span key={idx}>{part}</span>;
//   });
// }

// if (msg.sender === "bot" && isStepMessage) {
//   // Split message by step numbering "1. ", "2. "
//   const parts = msg.text.split(/\n(?=\d+\.\s)/g);

//   const intro = parts.length > 1 ? parts[0].trim() : null;

//   // Keep numbering, but clean the text
//   const steps = parts.length > 1
//     ? parts.slice(1).map(p => p.trim())
//     : [];

//   return (
//     <div
//       key={i}
//       className="max-w-[75%] px-4 py-3 rounded-xl text-sm shadow bg-white text-indigo-900 border border-indigo-100"
//     >
//       {intro && (
//         <p className="font-medium mb-2">{renderBold(intro)}</p>
//       )}

//       <ol className="list-decimal list-inside space-y-2">
//         {steps.map((step, idx) => {
//           const cleanStep = step.replace(/^\d+\.\s*/, ""); // Remove leading "1. "
//           return (
//             <li key={idx} className="leading-relaxed">
//               {renderBold(cleanStep)}
//             </li>
//           );
//         })}
//       </ol>
//     </div>
//   );
// }

//                   // Default message rendering
//                   return (
//                     <div
//                       key={i}
//                       className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow ${
//                         msg.sender === "user"
//                           ? "bg-indigo-600 text-white ml-auto rounded-br-none"
//                           : "bg-white text-indigo-900 rounded-bl-none border border-indigo-100"
//                       }`}
//                     >
//                       {msg.text}
//                     </div>
//                   );
//                 })}
//                 <div ref={messagesEndRef} />
//               </div>
//             )}
//           </div>

//           {/* Input */}
//           <div className="p-3 bg-white border-t flex items-center gap-2">
//             <input
//               type="text"
//               value={input}
//               onChange={handleInput}
//               onKeyDown={handleKeyDown}
//               placeholder="Type your message..."
//               aria-label="Message input"
//               className="flex-1 px-3 py-2 rounded-lg border border-indigo-300 focus:ring-2 focus:ring-indigo-500 outline-none"
//               autoComplete="off"
//             />
//             <button
//               disabled={!input.trim()}
//               onClick={sendMessage}
//               className="bg-indigo-700 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-900 disabled:opacity-40"
//               aria-label="Send message"
//             >
//               <FiSend size={18} />
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }






























"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiSend, FiX, FiMessageCircle, FiZap, FiChevronRight } from "react-icons/fi";
import Lottie from "lottie-react";
import botAnimation from "../animation/RobotSaludando.json"; 
import { FaUser } from 'react-icons/fa'; 
import { FaRobot } from 'react-icons/fa';

type FAQ = {
  question: string;
  answer: string;
};

type Message = {
  sender: "user" | "bot";
  text: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"faqs" | "chat">("faqs");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [history, setHistory] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && activeTab === "faqs" && faqs.length === 0) {
      setFaqLoading(true);
      fetch("https://4kjpg98q-8000.inc1.devtunnels.ms/faqs")
        .then((res) => res.json())
        .then((data) => {
          setFaqs(data);
          setFaqLoading(false);
        })
        .catch(() => setFaqLoading(false));
    }
  }, [open, activeTab, faqs.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendQuery(query: string) {
    const userMsg: Message = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setHistory((prev) => [...prev, { role: "user", content: query }]);
    setIsTyping(true);

    try {
      const res = await fetch("https://4kjpg98q-8000.inc1.devtunnels.ms/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, conversation_history: history }),
      });
      const data = await res.json();
      setIsTyping(false);
      const botMsg: Message = { sender: "bot", text: data.answer };
      setMessages((prev) => [...prev, botMsg]);
      setHistory((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ An error occurred. Please try again." },
      ]);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

function sendMessage() {
  if (input.trim()) {
    // If user is in FAQ tab, switch to chat tab
    if (activeTab === "faqs") {
      setActiveTab("chat"); // Switch to chat tab
    }

    sendQuery(input); // Send the query to the chatbot
    setInput(""); // Clear the input field
  }
}


  function handleFAQClick(faq: FAQ) {
    setActiveTab("chat");
    sendQuery(faq.question);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  function renderBold(text: string) {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx}>{part.slice(2, -2)}</strong>;
      }
      return <span key={idx}>{part}</span>;
    });
  }

  return (
    <>
      {/* {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center hover:shadow-indigo-500/50 transition-all hover:scale-110 group animate-pulse-slow"
          aria-label="Open Service Desk Chat"
        >
          <FiMessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></span>
        </button>
      )} */}
{!open && (
  <button
    onClick={() => setOpen(true)}
    className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white rounded-full w-16 h-16 shadow-2xl flex items-center justify-center hover:shadow-indigo-500/50 transition-all hover:scale-110 group animate-pulse-slow"
    aria-label="Open Service Desk Chat"
  >
    {/* Lottie Animation */}
    <Lottie animationData={botAnimation} loop={true} className="w-15 h-15 group-hover:scale-110 transition-transform" />
    
    {/* First green dot (with ping animation) */}
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-ping z-60"></span>
    
    {/* Second green dot (without ping animation) */}
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white z-50"></span>
  </button>
)}



      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 text-white p-5 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <FiZap className="w-5 h-5 text-yellow-300" />
              </div>
                      {/* <div className="flex items-center gap-2">
               <Lottie animationData={botAnimation} style={{ width: 50, height: 50 }} />
               
           </div> */}
              <div>
                <h3 className="font-bold text-lg">AI Service Desk</h3>
                <div className="flex items-center gap-1 text-xs text-indigo-100">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Online • Ready to help</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors relative z-10"
              aria-label="Close chat"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("faqs")}
              className={`flex-1 py-3 text-sm font-semibold transition-all relative ${
                activeTab === "faqs"
                  ? "text-indigo-600 bg-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Quick Answers
              {activeTab === "faqs" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("chat")}
              className={`flex-1 py-3 text-sm font-semibold transition-all relative ${
                activeTab === "chat"
                  ? "text-indigo-600 bg-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Chat
              {activeTab === "chat" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            {activeTab === "faqs" && (
              <>
                {faqLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                    <p className="text-sm font-medium">Loading FAQs...</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">Frequently asked questions</p>
                    </div>
                    {faqs.map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => handleFAQClick(faq)}
                        className="w-full text-left p-4 bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all shadow-sm hover:shadow-md group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-indigo-600 transition-colors">
                            {faq.question}
                          </p>
                          <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "chat" && (
              <div className="p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiMessageCircle className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Start a Conversation</h4>
                    <p className="text-sm text-gray-500">Ask me anything about our services</p>
                  </div>
                )}
                
                {messages.map((msg, i) => {
                  const stepRegex = /\d+\.\s+/g;
                  const isStepMessage = stepRegex.test(msg.text);

                  if (msg.sender === "bot" && isStepMessage) {
                    const parts = msg.text.split(/\n(?=\d+\.\s)/g);
                    const intro = parts.length > 1 ? parts[0].trim() : null;
                    const steps = parts.length > 1 ? parts.slice(1).map(p => p.trim()) : [];

                    return (
                      <div key={i} className="flex items-start gap-3 animate-fade-in">
<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
  <FaRobot className="w-5.5 h-5.5 text-white flex items-center" />  {/* Use the robot icon */}
</div>
                        <div className="flex-1 bg-white rounded-2xl rounded-tl-sm p-4 shadow-md border border-gray-100 max-w-[85%]">
                          {intro && (
                            <p className="text-sm text-gray-700 mb-3">{renderBold(intro)}</p>
                          )}
                          <div className="space-y-2">
                            {steps.map((step, idx) => {
                              const cleanStep = step.replace(/^\d+\.\s*/, "");
                              return (
                                <div key={idx} className="flex gap-2 items-start bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border-l-2 border-indigo-400">
                                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {idx + 1}
                                  </span>
                                  <p className="text-sm text-gray-700 flex-1">{renderBold(cleanStep)}</p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
<div key={i} className={`flex items-start gap-3 animate-fade-in ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
    msg.sender === "user" 
    ? "bg-gradient-to-br from-gray-600 to-gray-700" 
    : "bg-gradient-to-br from-indigo-500 to-purple-600"
  }`}>
    {msg.sender === "user" ? (
      <FaUser className="w-4 h-4 text-white" /> // User icon
    ) : (
      <FaRobot className="w-5.5 h-5.5 text-white flex items-center" />  // Replace AI's FiZap with FaRobot
    )}
  </div>
  <div className={`rounded-2xl p-4 shadow-md max-w-[85%] ${
    msg.sender === "user"
      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm"
      : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
  }`}>
    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
  </div>
</div>

                  );
                })}

                {isTyping && (
                  <div className="flex items-start gap-3 animate-fade-in">
<div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
  <FaRobot className="w-5.5 h-5.5 text-white flex items-center" />  {/* Use the robot icon */}
</div>
                    <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-md border border-gray-100">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-2 border border-gray-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <input
                type="text"
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type your query..."
                className="flex-1 bg-transparent px-3 py-2 outline-none text-sm text-gray-800 placeholder-gray-400"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all"
                aria-label="Send message"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
            {/* <p className="text-xs text-gray-400 text-center mt-2">Powered by AI • Always learning</p> */}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}