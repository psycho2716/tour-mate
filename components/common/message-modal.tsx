"use client";

import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
}

interface MessageModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: string;
    otherUserId: string;
    otherUserName: string;
    otherUserAvatar?: string;
}

export function MessageModal({
    isOpen,
    onClose,
    userId,
    otherUserId,
    otherUserName,
    otherUserAvatar
}: MessageModalProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-expand textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
        }
    }, [newMessage]);

    // Mock function to simulate fetching messages
    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            // TODO: Replace with actual API call
            const mockMessages: Message[] = [
                {
                    id: "1",
                    senderId: otherUserId,
                    receiverId: userId,
                    content: "Hello! I'm looking forward to our tour tomorrow.",
                    timestamp: new Date().toISOString()
                },
                {
                    id: "2",
                    senderId: userId,
                    receiverId: otherUserId,
                    content: "Hi! Yes, I'm excited too. What time should we meet?",
                    timestamp: new Date().toISOString()
                }
            ];
            setMessages(mockMessages);
        } catch (error) {
            toast.error(
                `Failed to load messages: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            fetchMessages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            // TODO: Replace with actual API call
            const newMsg: Message = {
                id: Date.now().toString(),
                senderId: userId,
                receiverId: otherUserId,
                content: newMessage,
                timestamp: new Date().toISOString()
            };

            setMessages((prev) => [...prev, newMsg]);
            setNewMessage("");
            toast.success("Message sent successfully");
        } catch (error) {
            toast.error(
                `Failed to send message: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] flex flex-col">
                <DialogHeader className="flex-shrink-0 flex flex-row items-center gap-2 border-b border-border py-4">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={otherUserAvatar} alt={otherUserName} />
                        <AvatarFallback>{otherUserName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <DialogTitle className="text-xl font-semibold">
                            Chat with {otherUserName}
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground mt-1">
                            Send and receive messages about your tour
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <div className="flex-1 overflow-y-auto relative">
                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 w-full">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <p>Loading messages...</p>
                            </div>
                        ) : messages.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p>No messages yet. Start the conversation!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex w-full ${
                                        message.senderId === userId
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-lg p-3 break-words ${
                                            message.senderId === userId
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs opacity-70 mt-1">
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Message Input */}
                    <div className="sticky bottom-0 border-t p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="flex gap-2 items-center">
                            <div className="flex-1 relative">
                                <Textarea
                                    ref={textareaRef}
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    className="min-h-[40px] max-h-[100px] resize-none pr-10"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                />
                                <div className="absolute right-2 bottom-2 text-muted-foreground text-xs">
                                    {newMessage.length}/1000
                                </div>
                            </div>
                            <Button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                                className="h-10 w-10 p-0"
                                size="icon"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Send message</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
