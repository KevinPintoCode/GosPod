import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const GenerateThumbnail = () => {
  const [isAiThumbnail, setisAiThumbnail] = useState(false);
  return (
    <>
      <div className="generate_thumbnail">
        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": isAiThumbnail })}
        >
          Use AI to generate a thumbnail.
        </Button>
        <Button
          type="button"
          variant="plain"
          className={cn("", { "bg-black-6": !isAiThumbnail })}
        >
          Upload your thumbnail.
        </Button>
      </div>
    </>
  );
};

export default GenerateThumbnail;
