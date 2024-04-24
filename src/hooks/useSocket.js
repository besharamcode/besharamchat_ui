import { useSelector } from "react-redux";

const useSocket = () => {
  const { socket } = useSelector((state) => state.socket);
  return {
    socket,
  };
};
export default useSocket;
