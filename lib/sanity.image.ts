import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

import { sanityClient } from "./sanity.client";

const builder: ImageUrlBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
 return builder.image(source);
}
