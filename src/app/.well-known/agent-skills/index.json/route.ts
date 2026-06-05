import { NextResponse } from 'next/server';

export async function GET() {
  const agentSkills = {
    "$schema": "https://agentskills.io/schema/v0.2.0/index.json",
    "skills": [
      {
        "name": "aioconvert",
        "type": "webmcp",
        "description": "Convert files to various formats (images, videos, audio, documents, archives) directly through the browser context.",
        "url": "https://aioconvert.com",
        "digest": "sha256-dummy-digest-since-webmcp-is-dynamic"
      }
    ]
  };

  return NextResponse.json(agentSkills, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
