"use client";

import EmptyState from "@/components/EmptyState";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

const Discover = () => {
  const podcastData = useQuery(api.podcasts.getPodcastBySearch, { search: "" });

  return (
    <>
      <div className="flex flex-col gap-9 ">
        Searchbar
        <div className="flex flex-col gap-9">
          <h1 className="text-20 font-bold text-white-1">Discover</h1>
          {podcastData ? <></> : <EmptyState title="No results found" />}
        </div>
      </div>
    </>
  );
};

export default Discover;
