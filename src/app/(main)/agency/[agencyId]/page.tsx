import React from "react";

const Page = ({ params }: { params: { agencyId: string } }) => {
  return <div className="relative h-full">{params.agencyId}</div>;
};

export default Page;
