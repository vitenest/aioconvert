import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aioconvert.com';
  
  // Base routes
  const routes = [
    '',
    '/image-converter',
    '/video-converter',
    '/document-converter',
    '/archive-converter',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Popular conversions
  const popularConversions = [
    '/image-converter/jpg-to-png',
    '/image-converter/png-to-webp',
    '/image-converter/heif-to-jpg',
    '/video-converter/mp4-to-mp3',
    '/video-converter/mkv-to-mp4',
    '/video-converter/mov-to-mp4',
    '/document-converter/pdf-to-docx',
    '/document-converter/docx-to-pdf',
    '/archive-converter/zip-to-rar',
    '/archive-converter/rar-to-zip',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...routes, ...popularConversions];
}
