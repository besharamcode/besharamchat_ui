/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { authFetchData } from "@/lib/ApiFunctions";
import SearchUser from "./SearchUser";

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
        className="z-50 sm:w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-md p-4 hidden pop-box"
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
          <SearchUser
            toast={toast}
            users={filterdUsers.length > 0 ? filterdUsers : users}
          />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
