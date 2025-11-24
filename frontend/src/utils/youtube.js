/**
 * Converts various YouTube URL formats to embed format
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID (already correct)
 * - https://youtube.com/watch?v=VIDEO_ID
 * - Also handles URLs with additional parameters
 */
export const convertToYouTubeEmbed = (url) => {
  if (!url) return null;

  // Trim whitespace
  url = url.trim();

  // If already an embed URL, return as is (but clean up any extra params)
  if (url.includes('youtube.com/embed/')) {
    const embedMatch = url.match(/youtube\.com\/embed\/([^&\n?#]+)/);
    if (embedMatch) {
      return `https://www.youtube.com/embed/${embedMatch[1]}`;
    }
    return url;
  }

  // Extract video ID from various YouTube URL formats
  let videoId = null;

  // Format: https://www.youtube.com/watch?v=VIDEO_ID or https://youtube.com/watch?v=VIDEO_ID
  // Also handles: https://www.youtube.com/watch?v=VIDEO_ID&t=123s
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // If we found a video ID, convert to embed format
  if (videoId) {
    // Check if there's a timestamp parameter (t=)
    const timeMatch = url.match(/[?&]t=(\d+)/);
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    if (timeMatch) {
      return `${embedUrl}?start=${timeMatch[1]}`;
    }
    return embedUrl;
  }

  // If it's not a YouTube URL, return as is (might be Vimeo or other video platform)
  // But check if it looks like a valid URL
  try {
    new URL(url);
    return url;
  } catch (e) {
    // Invalid URL, return null
    return null;
  }
};

/**
 * Extracts video ID from YouTube URL (for display purposes)
 */
export const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return watchMatch ? watchMatch[1] : null;
};

