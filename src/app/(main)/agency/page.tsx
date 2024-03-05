import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const authUser = await currentUser();
  if (!authUser) {
    return redirect("/sign-in");
  }
  return <div>Agency</div>;
};

export default Page;
