/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { verifyAuthCreateData } from "@/lib/ApiFunctions";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Verify = ({ toast }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const verifyUser = async () => {
    if (token?.length > 10) {
      const response = await verifyAuthCreateData(
        `auth/verify?token=${token}`,
        { token }
      );
      if (response.success) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        toast({
          description: response.message,
        });
        navigate("/register");
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: response.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    verifyUser();
  }, [token]);

  if (email) {
    return (
      <>
        <div className="grid place-items-center min-h-screen mx-4">
          <div className="border shadow-lg min-w-[23%]">
            <span className="absolute top-[7vw] left-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
            <span className="absolute bottom-[7vw] right-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
            <div className="sm:px-10 px-8 pt-12 pb-5">
              <h1 className="text-center mb-5 capitalize font-bold text-2xl w-5/6 mx-auto font-jost">
                Besharam Chat
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
                We send a Confirmation mail on your registerd email <br />{" "}
                {email}!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  } else if (token) {
    return (
      <div className="grid place-items-center min-h-screen mx-4">
        <div className="border shadow-lg min-w-[23%]">
          <span className="absolute top-[7vw] left-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
          <span className="absolute bottom-[7vw] right-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
          <div className="sm:px-10 px-8 pt-12 pb-5 grid place-items-center">
            <h1 className="text-center mb-5 capitalize font-bold text-2xl w-5/6 mx-auto font-jost">
              Besharam Chat
            </h1>
            <div className="loader"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default Verify;
