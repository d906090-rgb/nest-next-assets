/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const sendMessageToOpenAI = async (message: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data.content || "Transmission interrupted.";
  } catch (error: any) {
    console.error("OpenAI Error:", error);
    
    if (error?.message?.includes('401')) {
      return "Authentication error. Please contact administrator.";
    }
    
    if (error?.message?.includes('429')) {
      return "Rate limit exceeded. Please try again later.";
    }
    
    return `Error: ${error?.message || 'Unknown error'}`;
  }
};
