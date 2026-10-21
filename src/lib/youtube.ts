/** Converte um link de incorporação do YouTube (…/embed/ID) no link da página do vídeo. */
export const youtubeWatchUrl = (embedUrl: string) => {
  const id = embedUrl.split("/embed/")[1]?.split(/[?&#]/)[0] ?? "";
  return id ? `https://www.youtube.com/watch?v=${id}` : embedUrl;
};
