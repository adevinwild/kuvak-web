import { useEffect, useState } from "react";
import useImageSize from "./use-image-size";

const getNearestAspectRatio = (aspectRatio: number): string => {
  const ratios = ["1/1", "4/3", "3/2", "16/9", "2/3", "3/4", "9/16"];
  const sortedRatios = ratios.sort((a, b) => {
    return Math.abs(eval(a) - aspectRatio) - Math.abs(eval(b) - aspectRatio);
  });

  return sortedRatios[0];
};

/**
 * Based on the file width/height it will return the nearest aspect ratio
 * for the image css
 */
export default function useFileAspectRatio(file: File | null) {
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { size, error: sizeError } = useImageSize(file);

  useEffect(() => {
    if (sizeError) {
      setError(sizeError);
      return;
    }

    if (!size) return;

    const aspectRatio = size.width / size.height;
    setAspectRatio(getNearestAspectRatio(aspectRatio));
  }, [size, sizeError]);

  return {
    aspectRatio,
    error,
  };
}
