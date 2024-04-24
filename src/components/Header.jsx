/* eslint-disable react/prop-types */
import {
  BellIcon,
  HamburgerMenuIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Header = ({ toggleSearchBox, toggleNotificationBox }) => {
  const {user} = useSelector((store) => store.user);
  return (
    <header
      id="header"
      className="flex justify-between items-center  sm:px-4 md:px-8 px-3 py-4 font-mono backdrop-blur-sm  border-b border-b-gray-50 bg-primary text-primary-foreground"
    >
      <div className="logo">
        <p className="font-jost text-2xl font-semibold tracking-tighter cursor-pointer select-none">
          Besharam Chat
        </p>
      </div>
      <nav>
        <ul className="flex justify-center items-center gap-3">
          <li className="size-8  flex justify-center items-center">
            <Button onClick={toggleSearchBox}>
              <PlusIcon className="size-6" />
            </Button>
          </li>
          <li className="size-8 flex justify-center items-center mr-2">
            <PersonIcon className="size-6" />
          </li>
          <li className="size-8 flex justify-center items-center mr-2 relative">
            <Button onClick={toggleNotificationBox}>
              <BellIcon className="size-6" />
              <span
                id="notification-count"
                className="size-3 bg-destructive absolute top-[4px] left-[1px] rounded-full hidden"
              ></span>
            </Button>
          </li>
          <li className="flex justify-center items-center">
            <Link to="/profile" className="">
              <Avatar className="size-8">
                <AvatarImage src={user?.avtar} />
                <AvatarFallback>{user.fullname.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>
          </li>
        </ul>
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <HamburgerMenuIcon className="siz-5" />
        </Button>
      </nav>
    </header>
  );
};

export default Header;
