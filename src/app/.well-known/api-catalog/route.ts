import { NextResponse } from 'next/server';

export async function GET() {
  const catalog = {
    "linkset": [
      {
        "anchor": "https://aioconvert.com/api/upload",
        "service-desc": [
          {
            "href": "https://aioconvert.com/docs/openapi.yaml",
            "type": "application/vnd.oai.openapi"
          }
        ],
        "service-doc": [
          {
            "href": "https://aioconvert.com/docs",
            "type": "text/html"
          }
        ]
      },
      {
        "anchor": "https://aioconvert.com/api/status",
        "service-doc": [
          {
            "href": "https://aioconvert.com/docs",
            "type": "text/html"
          }
        ]
      },
      {
        "anchor": "https://aioconvert.com/api/download",
        "service-doc": [
          {
            "href": "https://aioconvert.com/docs",
            "type": "text/html"
          }
        ]
      }
    ]
  };

  return NextResponse.json(catalog, {
    headers: {
      'Content-Type': 'application/linkset+json'
    }
  });
}
