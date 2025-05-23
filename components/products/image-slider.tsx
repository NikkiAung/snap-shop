"use client";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ImageSliderProps = {
  variants: VariantsWithImagesTags[];
};
const ImageSlider = ({ variants }: ImageSliderProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);
  const searchParams = useSearchParams();
  const currentVariantType = searchParams.get("type");

  const updateSlider = (index: number) => {
    api?.scrollTo(index);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("slidesInView", (e) => {
      setActiveIndex(e.slidesInView());
    });
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img) => (
              <CarouselItem key={img.image_url}>
                {img.image_url ? (
                  <Image
                    src={img.image_url}
                    alt={img.name}
                    width={800}
                    height={500}
                    priority
                  />
                ) : null}
              </CarouselItem>
            ))
        )}
      </CarouselContent>
      <div className="flex py-2 gap-4">
        {variants.map(
          (v) =>
            v.productType === currentVariantType &&
            v.variantImages.map((img, index) => (
              <div key={img.image_url}>
                {img.image_url ? (
                  <Image
                    onClick={() => updateSlider(index)}
                    className={cn(
                      "rounded-md border-2 border-slate-200 cursor-pointer transition-all",
                      index === activeIndex[0]
                        ? "opacity-100 border-slate-400"
                        : "opacity-50"
                    )}
                    src={img.image_url}
                    alt={img.name}
                    width={72}
                    height={42}
                    priority
                  />
                ) : null}
              </div>
            ))
        )}
      </div>
    </Carousel>
  );
};

export default ImageSlider;
