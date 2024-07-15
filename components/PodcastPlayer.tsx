"use client";

import { cn } from "@/lib/utils";
import { useAudio } from "@/providers/AudioProvider";
import React, { useState } from "react";

import { Progress } from "@/components/ui/progress";
import Image from "next/image";

const PodcastPlayer = () => {
  const { audio } = useAudio();

  const [currentTime, setCurrentTime] = useState(10);
  const [duration, setDuration] = useState(100);

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !audio?.audioUrl,
      })}
    >
      <h1 className="text-white-1 text-xl">{audio?.title}</h1>
      <Progress
        className="w-full"
        max={duration}
        value={(currentTime / duration) * 100}
      />
      <Image
        src={audio?.imageUrl!}
        alt="player"
        height={64}
        width={64}
        className="aspect-square rounded-xl"
      />
      <h1 className="text-white-1 text-xl">{audio?.author}</h1>
    </div>
  );
};

export default PodcastPlayer;
