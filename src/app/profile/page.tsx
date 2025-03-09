import HomeLayout from "@/components/home/home-layout";
import { ImageUploader } from "./profile-ui/image-uploader";
import ProfileForm from "./profile-ui/profile-form";

export default function ProfilePage() {
  return (
    <HomeLayout>
      <div>
        <h2 className="medium__header mb-2">Profile Details</h2>
        <p className="medium__text ">
          Add your details to create a personal touch to your profile.
        </p>
        <div className=" flex p-8 items-center bg-gray-background mt-16 mb-8 rounded-[12px]  ">
          <p className="medium__text flex-1/3">Profile Picture</p>
          <div className=" flex-2/3 flex items-center  ">
            <ImageUploader />
            <p className="p-8 small__text">
              Image must be below 5mb. Preferably use PNG or JPG format.
            </p>
          </div>
        </div>

        <ProfileForm />
      </div>
    </HomeLayout>
  );
}
