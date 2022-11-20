import { get } from "./index";

const FONTS = "fonts";

export async function getAllFonts() {
  return await get(FONTS);
}
