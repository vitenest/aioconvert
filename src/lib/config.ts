export type FileCategory = 'image' | 'video' | 'audio' | 'document' | 'archive';

export const CATEGORY_NAMES: Record<FileCategory, string> = {
  image: 'Image Converter',
  video: 'Video Converter',
  audio: 'Audio Converter',
  document: 'Document Converter',
  archive: 'Archive Converter',
};

export const FORMAT_MAPPINGS: Record<FileCategory, string[]> = {
  image: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'bmp', 'tiff', 'heif'],
  video: ['mp4', 'mkv', 'avi', 'mov', 'webm', 'wmv', 'flv'],
  audio: ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac'],
  document: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'csv', 'xlsx', 'json', 'xml'],
  archive: ['zip', 'tar', 'rar', '7z', 'gz'],
};

export const getCategoryFromSlug = (slug: string): FileCategory | null => {
  if (slug === 'image-converter') return 'image';
  if (slug === 'video-converter') return 'video';
  if (slug === 'audio-converter') return 'audio';
  if (slug === 'document-converter') return 'document';
  if (slug === 'archive-converter') return 'archive';
  return null;
};

export const getSlugFromCategory = (category: FileCategory): string => {
  return `${category}-converter`;
};
