const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;

export default function toImageUrl(url) {
  return new URL(url, IMG_URL).href;
}