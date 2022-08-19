export const slugify = (string: string) =>
  string.toLowerCase().replace(/\s+/g, "-").slice(0, 200);
