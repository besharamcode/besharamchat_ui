/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { authCreateData } from "@/lib/ApiFunctions";

const SearchUser = ({ users, toast }) => {
  const handleSendRequest = async (friendId) => {
    const response = await authCreateData("request/send", { friendId });
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

  return (
    <>
      {users
        ? users.map((user, i) => {
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
        : ""}
    </>
  );
};

export default SearchUser;
