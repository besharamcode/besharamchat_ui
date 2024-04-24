import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const handleImageInput = (event) => {
    if (event.target.value) {
      event.target.setAttribute(
        "data-title",
        event.target.value.replace(/^.*[\\\/]/, "")
      );
    } else {
      event.target.setAttribute("data-title", "No file chosen");
    }
  };
  return (
    <div className="grid place-items-center mt-10">
      <Card className="">
        <CardHeader>
          <CardTitle className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-full size-24 bg-muted">
            <img src="" alt="" />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Button variant="outline" size="icon" className="p-0">
                <Input
                  id="picture"
                  type="file"
                  className="image-with-icon"
                  onChange={(e) => handleImageInput(e)}
                />
                <CameraIcon className="size-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
