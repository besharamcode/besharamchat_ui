/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { authCreateData, authFetchData } from "@/lib/ApiFunctions";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const SearchBox = ({ toast }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filterdUsers, setFilterdUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await authFetchData("auth/someusers");
    if (response.success) {
      setUsers(response.data.users);
    } else
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearchUser = async (searchValue) => {
    const response = await authFetchData(
      `auth/searchuser?username=${searchValue}`
    );
    if (response.success) {
      setFilterdUsers(response.data.users);
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  const handleSendRequest = async (friendId) => {
    const response = await authCreateData("request/send", { friendId });
    if (response.message) {
      toast({
        description: response.message,
      });
      setUsers(users.filter((user) => user._id !== friendId));
      setFilterdUsers(users.filter((user) => user._id !== friendId));
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  const handleCancleRequest = async (recieverId) => {
    const response = await authCreateData("request/cancle", { recieverId });
    if (response.message) {
      toast({
        description: response.message,
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let debounce;
    if (search.length > 0) {
      debounce = setTimeout(() => {
        handleSearchUser(search);
      }, 1000);
    }

    return () => clearTimeout(debounce);
  }, [search]);

  return (
    <>
      <div
        className="z-50 md:w-1/2 sm:w-3/4 w-11/12  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-md p-4 hidden pop-box"
        id="search-box"
      >
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight font-jost text-center mb-2">
          Create new friends
        </h3>
        <div>
          <Input
            placeholder="Username..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <span className="border-b"></span>

        <div className="h-[50vh] mt-4 overflow-y-auto no-scrollbar">
          {filterdUsers.length > 0
            ? filterdUsers.length > 0 &&
              filterdUsers.map((user, i) => {
                return (
                  <div
                    className="flex items-center justify-between m-2 relative hover:bg-primary-foreground py-4 px-4 rounded-lg"
                    key={i}
                  >
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          className="size-12 rounded-full"
                          src={user.avatar}
                        />
                        <AvatarFallback className="bg-muted">
                          {user.fullname.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="leading-2 font-jost [&:not(:first-child)]:mt-6 font-semibold">
                          {user.fullname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.username}
                        </p>
                      </div>
                    </div>
                    {!user.isSent ? (
                      <Button onClick={() => handleSendRequest(user._id)}>
                        Follow
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleCancleRequest(user._id)}
                      >
                        Requested
                      </Button>
                    )}
                  </div>
                );
              })
            : users.length > 0 &&
              users.map((user, i) => {
                return (
                  <div
                    className="flex items-center justify-between m-2 relative hover:bg-primary-foreground py-4 px-4 rounded-lg"
                    key={i}
                  >
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage
                          className="size-12 rounded-full"
                          src={user.avatar}
                        />
                        <AvatarFallback className="bg-muted">
                          {user.fullname.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="leading-2 font-jost [&:not(:first-child)]:mt-6 font-semibold">
                          {user.fullname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.username}
                        </p>
                      </div>
                    </div>
                    {!user.isSent ? (
                      <Button onClick={() => handleSendRequest(user._id)}>
                        Follow
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        onClick={() => handleCancleRequest(user._id)}
                      >
                        Requested
                      </Button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default SearchBox;
