import React from "react";
import GetStarted from "../icons/get-started";

export default function NoLinks() {
  return (
    <div className="  flex-1 justify-center py-20 gap-6 flex items-center flex-col  ">
      {" "}
      <div>
        <GetStarted />
      </div>
      <div className=" flex flex-col justify-center items-center text-center w-3/5 ">
        <h3 className="medium__header mb-6">Let&apos;s get you started</h3>
        <p className="medium__text">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;`re here to help you
          share your profiles with everyone!
        </p>
      </div>
    </div>
  );
}
