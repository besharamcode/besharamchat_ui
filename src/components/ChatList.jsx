import { authFetchData } from "@/lib/ApiFunctions";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { setChat } from "@/redux/slices/chat";
import { useDispatch } from "react-redux";

const ChatList = () => {
  const [chats, setChats] = useState(null);
  const dispatch = useDispatch();

  const fetchChats = async () => {
    const response = await authFetchData("chat/fetchchats");
    if (response.success) {
      setChats(response.data.chats);
    }
  };

  const handleOpenChat = (e) => {
    if (e.target.dataset.id) {
      const chat = chats.find((chat) => chat.chatId === e.target.dataset.id);
      dispatch(setChat(chat));
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div
      id="chat-list"
      className="w-[30rem] border-r-2 pt-1 pb-3 px-2 bg-muted rounded-lg overflow-y-scroll no-scrollbar"
      onClick={(e) => handleOpenChat(e)}
    >
      {chats !== null
        ? chats.map((chat, i) => {
            return (
              <div
                className="flex items-center py-2 m-2 mt-3 relative hover:bg-primary-foreground px-4 rounded-lg z-10"
                key={i}
                data-id={chat.chatId}
              >
                <div data-id={chat.chatId}>
                  <Avatar>
                    <AvatarImage
                      className="size-12 rounded-full"
                      src={chat.avatar}
                    />
                    <AvatarFallback className="">
                      {chat.fullname.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div data-id={chat.chatId} className="ml-4">
                  <p className="font-jost font-semibold">
                    {chat.fullname}
                  </p>
                  <p className={`text-sm font-jost text-gray-700`}>
                    {chat.lastMessage && chat.lastMessage?.message.length > 40
                      ? chat.lastMessage?.message.slice(0, 40)
                      : chat.lastMessage?.message}
                  </p>
                </div>
                {/* {!chat.seen ? (
                  <p className="absolute top-2 right-4 size-5 grid place-items-center bg-primary text-xs text-primary-foreground rounded-full">
                    {chat.count}
                  </p>
                ) : null} */}
                <small className="text-xs absolute bottom-4 right-4 text-muted-foreground font-medium leading-none">
                  {/* {chat.lastMessageTime} */}
                </small>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ChatList;
