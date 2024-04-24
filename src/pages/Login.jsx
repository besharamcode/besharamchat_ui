/* eslint-disable react/prop-types */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import linesvg from "@/assets/small-line.svg";
import { noAuthCreateData } from "@/lib/ApiFunctions";

const formSchema = z.object({
  username: z
    .string()
    .min(4)
    .max(20)
    // eslint-disable-next-line no-useless-escape
    .regex(/^[a-z0-9_\.]+$/, {
      message: "Please enter valid username!",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Login = ({ toast }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    const response = await noAuthCreateData("auth/login", values);
    if (response.success) {
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      navigate("/home");
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="grid place-items-center min-h-screen mx-4">
      <div className="border shadow-lg min-w-[23%]">
        <span className="absolute top-[7vw] left-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
        <span className="absolute bottom-[7vw] right-[5vw] select-none text-5xl blur-2xl h-10 w-10 bg-foreground rounded-full"></span>
        <div className="sm:px-10 px-8 pt-12 pb-5">
          <h1 className="text-center mb-5 capitalize font-bold text-2xl w-5/6 mx-auto font-jost">
            Besharam Chat
          </h1>
          <h2
            className="mb-4 text-lg w-fit mx-auto font-medium first:mt-0 text-center bg-no-repeat bg-left-bottom"
            style={{ backgroundImage: `url(${linesvg})` }}
          >
            Login
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="text" placeholder="Username" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link
                className="w-full text-sm font-medium text-start mt-1 ml-1"
                to="/forgotpassword"
              >
                Forgotten password ?
              </Link>
              <div className="mt-4">
                <Button className="w-full mt-4" type="submit">
                  Submit
                </Button>
              </div>

              <Button
                className="text-sm font-medium space-y-3 w-full"
                variant="link"
              >
                <Link className="w-full " to="/signup">
                  Don&apos;t have account ?
                </Link>
              </Button>
            </form>
          </Form>
        </div>
        <p className="text-[11px] text-muted-foreground w-3/4 mx-auto text-center mb-3">
          By clicking &quot;Submit&quot;, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default Login;
