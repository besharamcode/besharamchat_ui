/* eslint-disable no-unused-vars */

import ChatContainer from "@/components/ChatContainer";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import Notification from "@/components/Notification";
import SearchBox from "@/components/SearchBox";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Home = ({ user, toast, loading }) => {
  useEffect(() => {
    const header = document.getElementById("header").offsetHeight;
    const main = document.getElementById("main");
    const ChatList = document.getElementById("chat-list").offsetWidth;
    document.getElementById("chat-container").style.width =
      main.offsetWidth - ChatList + "px";

    main.style.height = `${window.innerHeight - header}px`;
  }, []);

  return (
    <>
      <main id="main" className="flex min-h-full no-scrollbar">
        <Notification toast={toast}/>
        <SearchBox toast={toast} />
        <ChatList />
        <ChatContainer toast={toast} />
      </main>
    </>
  );
};

export default Home;
