import { NextResponse } from 'next/server';

export async function GET() {
  const mcpServerCard = {
    "serverInfo": {
      "name": "aioconvert",
      "version": "1.0.0"
    },
    "transport": {
      "type": "sse",
      "endpoint": "https://aioconvert.com/api/mcp/message"
    },
    "capabilities": {
      "tools": {
        "list": true
      }
    }
  };

  return NextResponse.json(mcpServerCard, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
