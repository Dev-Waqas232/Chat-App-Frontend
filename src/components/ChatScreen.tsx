import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";

interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  online: boolean;
  unreadCount?: number;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: "sent" | "delivered" | "read";
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2:30 PM",
    avatar: "AJ",
    online: true,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "Bob Smith",
    lastMessage: "Thanks for the help yesterday",
    timestamp: "1:45 PM",
    avatar: "BS",
    online: false,
  },
  {
    id: "3",
    name: "Carol Davis",
    lastMessage: "See you tomorrow!",
    timestamp: "12:20 PM",
    avatar: "CD",
    online: true,
    unreadCount: 1,
  },
  {
    id: "4",
    name: "David Wilson",
    lastMessage: "The project looks great",
    timestamp: "11:30 AM",
    avatar: "DW",
    online: false,
  },
  {
    id: "5",
    name: "Emma Brown",
    lastMessage: "Can we schedule a meeting?",
    timestamp: "Yesterday",
    avatar: "EB",
    online: true,
  },
];

const mockMessages: { [key: string]: Message[] } = {
  "1": [
    {
      id: "1",
      text: "Hey! How are you doing?",
      timestamp: "2:25 PM",
      isOwn: false,
      status: "read",
    },
    {
      id: "2",
      text: "I'm doing great! Just working on some projects. How about you?",
      timestamp: "2:27 PM",
      isOwn: true,
      status: "read",
    },
    {
      id: "3",
      text: "That sounds awesome! I'd love to hear more about what you're working on.",
      timestamp: "2:30 PM",
      isOwn: false,
      status: "delivered",
    },
  ],
  "2": [
    {
      id: "1",
      text: "Thanks for the help yesterday",
      timestamp: "1:45 PM",
      isOwn: false,
      status: "read",
    },
    {
      id: "2",
      text: "No problem at all! Happy to help anytime.",
      timestamp: "1:47 PM",
      isOwn: true,
      status: "read",
    },
  ],
};

export default function ChatScreen() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedContact) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-primary-100">
      {/* Contacts Sidebar */}
      <div className="w-1/3 bg-primary-200 border-r border-secondary-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-secondary-200">
          <h1 className="text-xl font-bold text-secondary-100 mb-4 font-primary">
            Messages
          </h1>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-primary-100 text-secondary-100 placeholder-secondary-200 rounded-lg border border-primary-100 focus:outline-none focus:ring-2 focus:ring-secondary-200 font-primary"
            />
            <div className="absolute right-3 top-2.5">
              <svg
                className="w-5 h-5 text-secondary-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-primary-100 cursor-pointer transition-colors hover:bg-primary-100 ${
                selectedContact?.id === contact.id ? "bg-primary-100" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-secondary-200 rounded-full flex items-center justify-center text-primary-100 font-bold font-primary">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary-200"></div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-secondary-100 font-medium truncate font-primary">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-secondary-200 font-secondary">
                      {contact.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-secondary-200 text-sm truncate font-primary">
                      {contact.lastMessage}
                    </p>
                    {contact.unreadCount && (
                      <span className="bg-secondary-100 text-primary-100 text-xs rounded-full px-2 py-1 font-bold font-secondary">
                        {contact.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-primary-200 border-b border-primary-100">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-secondary-200 rounded-full flex items-center justify-center text-primary-100 font-bold font-primary">
                    {selectedContact.avatar}
                  </div>
                  {selectedContact.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary-200"></div>
                  )}
                </div>
                <div>
                  <h2 className="text-secondary-100 font-medium font-primary">
                    {selectedContact.name}
                  </h2>
                  <p className="text-secondary-200 text-sm font-primary">
                    {selectedContact.online ? "Online" : "Last seen recently"}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages[selectedContact.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn
                        ? "bg-secondary-100 text-primary-100"
                        : "bg-primary-200 text-secondary-100"
                    }`}
                  >
                    <p className="font-primary">{message.text}</p>
                    <div
                      className={`flex items-center justify-end mt-1 space-x-1`}
                    >
                      <span
                        className={`text-xs font-secondary ${
                          message.isOwn
                            ? "text-primary-200"
                            : "text-secondary-200"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                      {message.isOwn && (
                        <div className="flex space-x-1">
                          {message.status === "sent" && (
                            <svg
                              className="w-3 h-3 text-primary-200"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {message.status === "delivered" && (
                            <svg
                              className="w-3 h-3 text-primary-200"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                          {message.status === "read" && (
                            <div className="flex -space-x-1">
                              <svg
                                className="w-3 h-3 text-secondary-200"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <svg
                                className="w-3 h-3 text-secondary-200"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-primary-200 border-t border-primary-100">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="w-full px-4 py-3 bg-primary-100 text-secondary-100 placeholder-secondary-200 rounded-md border border-primary-100 focus:outline-none ring-2 ring-primary-100 focus:ring-2 focus:ring-secondary-200 resize-none font-primary"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-8 py-4 bg-secondary-100 text-primary-100 rounded-lg hover:bg-secondary-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-primary font-medium"
                >
                  <LuSendHorizontal size={22} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No Chat Selected */
          <div className="flex-1 flex items-center justify-center bg-primary-100">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-secondary-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-secondary-100 font-medium mb-2 font-primary">
                Welcome to Messages
              </h3>
              <p className="text-secondary-200 font-primary">
                Select a contact to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
