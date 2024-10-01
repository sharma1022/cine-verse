import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) => `${mediaType}/search?query=${query}&page=${page}`
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );
console.log(response);
      return { response };
    } catch (err) { return { err }; }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (err) { return { err }; }
  },
  getMediaIdFromTmdb: async(tmdbId) => {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=YOUR_TMDB_API_KEY`);
  const tmdbData = await tmdbResponse.json();
  const title = tmdbData.original_title;

  // Step 2: Search for the media in DTDD
  const dtddResponse = await fetch(`https://www.doesthedogdie.com/dddsearch?q=${encodeURIComponent(title)}`);
  const dtddData = await dtddResponse.json();

  // Extract media ID
  const mediaId = dtddData.results[0].id; // Assuming it returns results
  return mediaId;
  }
};

export default mediaApi;