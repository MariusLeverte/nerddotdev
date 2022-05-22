import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { config } from "./config";

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(config).image(source);
