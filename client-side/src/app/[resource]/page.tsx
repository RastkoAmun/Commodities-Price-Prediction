import React from "react";
import ClientResource from "@/app/[resource]/ResourceClient";

const Resource = async ({ params }: { params: Promise<{ resource: string }> }) => {
  const resource = (await params).resource;

  return (
    <ClientResource resource={resource}/>
  );
};

export default Resource;
