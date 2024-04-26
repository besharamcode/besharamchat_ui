import { setChat, setChats } from "@/redux/slices/chat";
import { useDispatch, useSelector } from "react-redux";

const useChat = () => {
  const dispatch = useDispatch();

  const { chat, chats } = useSelector((state) => state.chat);

  const setChatsFunc = (chats) => {
    dispatch(setChats(chats));
  };

  const setChatFunc = (chat) => {
    dispatch(setChat(chat));
  };

  return { chat, setChatsFunc, setChatFunc, chats };
};

export default useChat;
