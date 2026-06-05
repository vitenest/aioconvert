import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';
  
  if (acceptHeader.includes('text/markdown')) {
    const markdownContent = `
# AIOConvert

AIOConvert is the ultimate free online file converter. 
Seamlessly transform your documents, images, audio, video, and archives into any format with lightning speed and absolute privacy.

## Features
- **Image Converter**: jpg-to-png, png-to-webp, heif-to-jpg
- **Video Converter**: mp4-to-mp3, mkv-to-mp4, mov-to-mp4
- **Document Converter**: pdf-to-docx, docx-to-pdf
- **Archive Converter**: zip-to-rar, rar-to-zip
- **Free**: No signups, no limits.
- **Privacy**: Files are auto-deleted after 30 minutes.

## API Endpoints
- POST \`/api/upload\` - Upload a file to convert.
- GET \`/api/status/[jobId]\` - Check conversion status.
- GET \`/api/download/[jobId]\` - Download converted file.

For full API discovery, see the \`Link\` headers in the HTTP response.
    `.trim();

    return new NextResponse(markdownContent, {
      headers: {
        'Content-Type': 'text/markdown',
        'x-markdown-tokens': 'true',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
