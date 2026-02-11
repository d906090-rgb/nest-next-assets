/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface CreateTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

interface QueryTaskResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
    model: string;
    state: 'waiting' | 'success' | 'fail';
    resultJson: string;
    failCode: string | null;
    failMsg: string | null;
  };
}

export const createImageTask = async (prompt: string, aspectRatio: string): Promise<string> => {
  const response = await fetch('/api/image/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      aspectRatio,
    }),
  });

  const data: CreateTaskResponse = await response.json();
  
  if (!response.ok) {
    throw new Error(data.msg || `API Error: ${response.status}`);
  }

  if (data.code !== 200) {
    throw new Error(data.msg || 'Error creating task');
  }

  return data.data.taskId;
};

export const pollTaskStatus = async (taskId: string): Promise<string | null> => {
  const maxAttempts = 30;
  const interval = 2000;

  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`/api/image/status/${taskId}`);

    const data: QueryTaskResponse = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || `API Error: ${response.status}`);
    }
    
    if (data.data.state === 'success') {
      const result = JSON.parse(data.data.resultJson);
      return result.resultUrls?.[0] || null;
    }

    if (data.data.state === 'fail') {
      throw new Error(data.data.failMsg || 'Task failed');
    }

    // Still waiting
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error('Generation timeout exceeded');
};
