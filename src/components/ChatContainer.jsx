/* eslint-disable no-unused-vars */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ArrowTopRightIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useChat from "@/hooks/useChat";
import { authCreateData, authFetchData } from "@/lib/ApiFunctions";
import { useSelector } from "react-redux";
import { toast } from "./ui/use-toast";
import useSocket from "@/hooks/useSocket";

const ChatContainer = () => {
  const { getChat } = useChat();
  const { socket } = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useSelector((store) => store.user);
  const chat = getChat();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const response = await authCreateData(`chat/sendmessage/${user._id}`, {
      message,
      chatId: chat.chatId,
    });
    if (response.success) {
      setMessages([...messages, { message:response.data.message, sender: true }, ]);
      document.getElementById("message").value = "";
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  const getmessages = useCallback(async () => {
    if (chat && chat.chatId) {
      const response = await authFetchData(
        `chat/getmessages/${chat?.chatId}?page=1&limit=20`
      );
      if (response.success) {
        setMessages(response.data.messages);
      }
    }
  }, [chat]);

  useEffect(() => {
    getmessages();
  }, [page, getmessages]);

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    getmessages();
  }, [chat, getmessages]);

  return (
    <div
      id="chat-container"
      className="pt-1 pb-3 px-2 rounded-lg overflow-hidden h-full relative"
    >
      {chat ? (
        <div className="bg-muted size-full rounded-lg relative overflow-y-scroll no-scrollbar">
          <div className="p-4 sticky top-0 border-b-2 flex justify-between bg-muted">
            <div className="flex">
              <Avatar className="">
                <AvatarImage
                  className="size-10 rounded-full"
                  src={chat.avatar}
                />
                <AvatarFallback className="bg-muted">
                  {chat.fullname.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <p className="leading-5 font-jost [&:not(:first-child)]:mt-6 font-semibold">
                  {chat.fullname}
                </p>
                <p className="text-sm leading-0 text-muted-foreground">
                  {chat.username}
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <DotsVerticalIcon className="siz-5" />
            </Button>
          </div>
          <div className="size-full overflow-scroll no-scrollbar">
            {messages.length > 0 &&
              messages.map((message, i) => {
                return (
                  <div
                    key={i}
                    className={`flex w-full mt-3  ${
                      message.sender ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`text-sm ${
                        message.sender
                          ? "bg-primary-foreground text-secondary-foreground mr-3"
                          : "bg-primary text-primary-foreground ml-3"
                      } py-2 px-3 rounded-full`}
                    >
                      {message.message}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="p-2 border sticky w-full bottom-0 bg-secondary">
            <form onSubmit={(e) => handleSendMessage(e)} className="flex">
              <Input
                type="text"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                id="message"
              />

              <Button type="submit" className="rounded-full size-9 p-0 mx-3">
                <ArrowTopRightIcon className="size-5" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <small className="text-sm font-medium text-muted-foreground leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          Please select a user for Chat
        </small>
      )}
    </div>
  );
};

export default ChatContainer;
