"use client";

import React, { useEffect } from 'react';

// Extend the global Window interface to include experimental modelContext
declare global {
  interface Navigator {
    modelContext?: {
      provideContext: (config: any) => void;
    };
  }
}

export default function WebMCPProvider() {
  useEffect(() => {
    // Only run if WebMCP is supported in the agent's browser
    if (typeof navigator !== 'undefined' && navigator.modelContext && navigator.modelContext.provideContext) {
      try {
        navigator.modelContext.provideContext({
          tools: [
            {
              name: "aioconvert_process",
              description: "Navigate the user to the conversion section to begin processing a file.",
              inputSchema: {
                type: "object",
                properties: {
                  action: {
                    type: "string",
                    description: "The action to perform, e.g. 'start_conversion'"
                  }
                },
                required: ["action"]
              },
              execute: async (args: any) => {
                if (args.action === 'start_conversion') {
                  const element = document.getElementById('convert');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                    return "Navigated to the conversion workspace successfully. Instruct the user to drop their files there.";
                  }
                  return "Failed to find conversion workspace.";
                }
                return "Unknown action.";
              }
            }
          ]
        });
        console.log("WebMCP capabilities registered successfully.");
      } catch (err) {
        console.error("Failed to register WebMCP context:", err);
      }
    }
  }, []);

  return null; // This is a headless component
}
