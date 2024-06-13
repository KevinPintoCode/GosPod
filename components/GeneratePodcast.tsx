import { GeneratePodcastProps } from "@/types";

import React, { useState } from "react";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

import { v4 as uuidv4 } from "uuid";

import { useUploadFiles } from "@xixixao/uploadstuff/react";

const { toast } = useToast();

const useGeneratePodcast = ({
  setAudio,
  voicePrompt,
  voiceType,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  //CONVEX APIs
  //Uploadstuff library with API coming from Convex
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  //UseUploadFiles, coming from uploadstuff to send data to DB
  const { startUpload } = useUploadFiles(generateUploadUrl);
  //Convex docs to make an API action - this is coming from openai.ts in Convex folder
  const getPodcastAudio = useAction(api.openai.generateAudioAction);
  //!!! we create the API by using useMutation OR useAction(api.{app/location}.theFunctionName)
  const getAudioUrl = useMutation(api.podcast.getUrl);

  //Logic for Podcast Generation with custom hook
  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      toast({
        title: "Please provide a voice type.",
      });
      return setIsGenerating(false);
    }
    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });
      //This is for reading mp3 audios
      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${uuidv4()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);
      const storageId = (uploaded[0].response as any).storageId;

      setAudioStorageId(storageId);

      const audioUrl = await getAudioUrl({ storageId });
      setAudio(audioUrl!);
      setIsGenerating(false);
      toast({
        title: "Your Podcast has been generated!",
      });
    } catch {
      toast({
        title: "Error generating Podcast",
        variant: "destructive",
      });
      setIsGenerating(false);
    }
  };

  return {
    isGenerating: isGenerating,
    generatePodcast: generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div className="flex flex-col gap-2.5 ">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate your Podcast.
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate Audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        ></Textarea>
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Generating Podcast...
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate with AI"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
