/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { authFetchData, authUpdateData } from "@/lib/ApiFunctions";

const Notification = ({ toast }) => {
  const { socket } = useSelector((store) => store.socket);
  const [request, setRequest] = useState([]);

  const getRequests = async () => {
    const response = await authFetchData("request/getrequests");
    if (response.success) {
      setRequest(response.data.request);
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  const handleAcceptRequest = async (requestId, action) => {
    const response = await authUpdateData("request/acceptOrRejectRequest", {
      requestId,
      action,
    });
    if (response.success) {
      setRequest(request.filter((request) => request._id !== requestId));
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  const handleRejectRequest = async (requestId, action) => {
    const response = await authUpdateData("request/acceptOrRejectRequest", {
      requestId,
      action,
    });
    if (response.success) {
      setRequest(request.filter((request) => request._id !== requestId));
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (request && request.length > 0) {
      document.getElementById("notification-count").classList.remove("hidden");
    }
  }, [request]);

  useEffect(() => {
    getRequests();
    if (socket.length > 0)
      socket.on("request", (data) => {
        setRequest(() => {
          return [data, ...request];
        });
      });
  }, [socket]);

  return (
    <div
      className="z-50 md:w-1/2 sm:w-3/4 w-11/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary shadow-md p-4 hidden pop-box"
      id="notification-box"
    >
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight font-jost text-center mb-2">
        Notifications
      </h3>
      <hr />
      <div className="h-[50vh] mt-4 overflow-y-auto">
        {request && request.length > 0 ? (
          request.map((request, i) => {
            return (
              <div
                className="flex items-center justify-between m-2 relative hover:bg-primary-foreground py-4 px-4 rounded-lg"
                key={i}
              >
                <div className="flex items-center">
                  <Avatar>
                    <AvatarImage
                      className="size-12 rounded-full"
                      src={request.avatar}
                    />
                    <AvatarFallback className="bg-muted">
                      {request?.fullname?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="leading-2 font-jost [&:not(:first-child)]:mt-6 font-semibold">
                      {request.fullname}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request.username}
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    className="mr-3"
                    onClick={() => handleAcceptRequest(request._id, "accept")}
                  >
                    Accept
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => handleRejectRequest(request._id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            );
          })
        ) : (
          <small className="text-sm font-medium text-muted-foreground leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Notifications found
          </small>
        )}
      </div>
    </div>
  );
};

export default Notification;
