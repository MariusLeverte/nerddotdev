export const aspectRatio = (width: number, height: number) => width / height;

export const getAspectRatioWidth = (height: number, aspectRatio: number) =>
  height * aspectRatio;
export const getAspectRatioHeight = (width: number, aspectRatio: number) =>
  width / aspectRatio;
