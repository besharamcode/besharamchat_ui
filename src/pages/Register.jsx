/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import linesvg from "@/assets/small-line.svg";
import { authCreateData } from "@/lib/ApiFunctions";
import { useEffect } from "react";

const formSchema = z.object({
  mobile: z
    .string()
    .regex(/^(?:\+?(\d{1,3}))?[\s-]?\(?(\d{3})\)?[\s-]?(\d{3})[\s-]?(\d{4})$/, {
      message: "Must be a valid international mobile number",
    }),
  gender: z.string({
    required_error: "Please select gender",
  }),
});

const Register = ({ toast, loading }) => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mobile: "",
      gender: "",
    },
  });

  async function onSubmit(values) {
    const response = await authCreateData("auth/register", values);
    if (response.success) {
      toast({
        description: response.message,
      });
      loading(false);
      navigate("/home");
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.message,
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/login");
  }, [localStorage.getItem("accessToken")]);

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
            Register Your Self
          </h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Mobile Number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="prefer not to say">
                            Prefer not to say
                          </SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div className="mt-4">
                <Button className="w-full mt-4" type="submit">
                  Submit
                </Button>
              </div>
              <Button
                className="text-sm font-medium space-y-3 w-full"
                variant="link"
              >
                <Link className="w-full " to="/login">
                  Already have account ?
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

export default Register;
