import { useSelector } from "react-redux";

const useChat = () => {
  const { chat } = useSelector((state) => state.chat);

  const getChat = () => {
    return chat;
  };
  return { getChat };
};

export default useChat;
