import {
  SanityAsset,
  SanityImageObject,
  SanityImageSource,
  SanityReference,
} from "@sanity/image-url/lib/types/types";

/**
 *
 * @param height
 * @param ratio
 * @returns width
 */
export const getWidthByRatio = (height: number, ratio: number) =>
  height * ratio;

/**
 *
 * @param width
 * @param ratio
 * @returns height
 */
export const getHeightByRatio = (width: number, ratio: number) => width / ratio;

function getSanityRefId(image: SanityImageSource): string {
  if (typeof image === "string") {
    return image;
  }

  const obj = image as SanityImageObject;
  const ref = image as SanityReference;
  const img = image as SanityAsset;

  if (typeof image === "string") {
    return image;
  }

  if (obj.asset) {
    return obj.asset._ref || (obj.asset as SanityAsset)._id;
  }

  return ref._ref || img._id || "";
}

export function getSanityImageDimensions(source: SanityAsset) {
  const id = getSanityRefId(source);
  const { width: customWidth, height: customHeight } = source;

  const dimensions = id.split("-")[2];

  let [width, height] = dimensions
    .split("x")
    .map((num: string) => parseInt(num, 10));

  const aspectRatio = width / height;

  if (customWidth || customHeight) {
    width = customWidth || getWidthByRatio(customHeight ?? 0, aspectRatio);
    height = customHeight || getHeightByRatio(customWidth ?? 0, aspectRatio);
  }

  return { width, height, aspectRatio };
}
