import HomeLayout from "@/components/home/home-layout";

import ProfileForm from "../../components/profile/profile-form";
import ProfileImageUploader from "../../components/profile/image-uploader";

export default function ProfilePage() {
  return (
    <HomeLayout>
      <div>
        <h2 className="medium__header mb-2">Profile Details</h2>
        <p className="medium__text ">
          Add your details to create a personal touch to your profile.
        </p>
        {/* <div className=" items-start flex-col lg:flex-row flex p-8 gap-4 lg:gap-0 lg:items-center bg-gray-background mt-16 mb-8 rounded-[12px]  ">
          <p className="medium__text flex-1/3">Profile Picture</p>
          <div className=" flex-2/3 flex lg:items-center flex-col lg:flex-row gap-4">
            <ImageUploader />
            <p className="lg:p-8  small__text ">
              Image must be below 5mb. Preferably use PNG or JPG format.
            </p>
          </div>
        </div> */}
        <ProfileImageUploader />

        <ProfileForm />
      </div>
    </HomeLayout>
  );
}
