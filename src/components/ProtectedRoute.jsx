/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { authFetchData } from "@/lib/ApiFunctions";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "@/redux/slices/socket";
import { setUser } from "@/redux/slices/user";
import Header from "./Header";
import { handleToggleNoticationBox, handleToggleSearchBox } from "@/lib/utils";

const ProtectedRoute = ({ children, toast }) => {
  const user = useSelector((store) => store.user.user);
  const socket = useSelector((store) => store.socket.socket);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const reverifyUser = async (email) => {
    try {
      const response = await authFetchData(`auth/verify?email=${email}`);
      if (response.success) {
        toast({
          description: response.message,
        });
        navigate("/verify");
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  };

  const isAuthenticate = async () => {
    try {
      const response = await authFetchData("auth/fetchuser");
      if (response.success) {
        const { data } = response;
        if (response.data.user) {
          if (!data.user.verified) {
            reverifyUser(data.user.email);
          } else {
            const socket = io("http://localhost:8000", {
              query: {
                userId: data.user._id,
              },
            });
            dispatch(setSocket(socket));
            dispatch(setUser(data.user));
            window.location.pathname === "/login" ? navigate("/home") : "";
          }
        } else {
          navigate("/login");
          toast({
            title: "Uh oh! Something went wrong.",
            description: response.message,
            variant: "destructive",
          });
        }
      } else {
        navigate("/login");
        toast({
          title: "Uh oh! Something went wrong.",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (accessToken) {
      isAuthenticate();
    } else {
      navigate("/login");
    }
    return () => {
      if (socket && socket.disconnect) {
        socket.disconnect();
      }
    };
  }, []);

  return user ? (
    <>
      {window.location.pathname === "/login" ? null : (
        <Header
          toggleSearchBox={handleToggleSearchBox}
          toggleNotificationBox={handleToggleNoticationBox}
        />
      )}{" "}
      {children}
    </>
  ) : null;
};

export default ProtectedRoute;
