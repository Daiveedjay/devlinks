import { Button } from "@/components/ui/button";
import PhonePreview from "./phone-preview";
import GetStarted from "@/components/icons/get-started";

export default function HomeMain() {
  // Example data - in a real app, this would come from your database
  const mockProfile = {
    image: "/placeholder.jpg",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  const mockLinks = [
    {
      id: "1",
      title: "My Portfolio",
      url: "https://example.com",
      platform: "portfolio",
    },
    {
      id: "2",
      title: "My GitHub",
      url: "https://github.com",
      platform: "github",
    },
    {
      id: "3",
      title: "My LinkedIn",
      url: "https://linkedin.com",
      platform: "linkedin",
    },
    // {
    //   id: "4",
    //   title: "My LinkedIn",
    //   url: "https://linkedin.com",
    //   platform: "linkedin",
    // },
    // {
    //   id: "5",
    //   title: "My LinkedIn",
    //   url: "https://linkedin.com",
    //   platform: "linkedin",
    // },
  ];

  return (
    <div className=" bg-gray-background overflow-y-auto flex-1 gap-4 flex">
      <div className=" flex-1/3 bg-white  ">
        <div className="h-full flex justify-center items-center  ">
          <div className="flex items-center justify-center rounded-lg ">
            <PhonePreview profile={mockProfile} links={mockLinks} />
          </div>
        </div>
      </div>
      <div className=" flex-2/3 bg-white overflow-y-auto  flex flex-col p-8  ">
        <div className=" mb-6">
          <h2 className="medium__header mb-2">Customize your links</h2>
          <p className="medium__text mb-10">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
          <Button variant="outline" className="w-full p-6">
            Add new link
          </Button>
        </div>
        <div className=" flex-1 justify-center py-20 gap-6 flex items-center flex-col  ">
          <div>
            <GetStarted />
          </div>
          <div className=" flex flex-col justify-center items-center text-center w-3/5 ">
            <h3 className="medium__header mb-6">Let&apos;s get you started</h3>
            <p className="medium__text">
              Use the “Add new link” button to get started. Once you have more
              than one link, you can reorder and edit them. We&apos;`re here to
              help you share your profiles with everyone!
            </p>
          </div>
        </div>
        <div className=" border-t-2 p-6 flex justify-end">
          <Button size="lg" variant="default">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
