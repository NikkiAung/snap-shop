"use client";

import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import React from "react";

const tags = [
  {
    id: 1,
    name: "iPhone",
    tag: "iphone",
  },
  {
    id: 2,
    name: "iPad",
    tag: "ipad",
  },
  {
    id: 3,
    name: "Macbook",
    tag: "macbook",
  },
  {
    id: 4,
    name: "Airpod",
    tag: "airpod",
  },
  {
    id: 5,
    name: "Apple Watch",
    tag: "apple watch",
  },
];
const TagFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const tagParams = params.get("tag") || "iphone";

  const handleTagClick = (tag: string) => {
    if (tag === tagParams) {
      router.push(`?tag=${tagParams}`);
    } else {
      router.push(`?tag=${tag}`);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-center text-sm font-medium mb-2">
      {tags.map((t) => (
        <p
          key={t.id}
          className={cn(
            "cursor-pointer border-2 rounded-md px-2 py-1 border-black",
            tagParams === t.tag && "bg-black text-white"
          )}
          onClick={() => handleTagClick(t.tag)}
        >
          {t.name}
        </p>
      ))}
    </div>
  );
};

export default TagFilter;
