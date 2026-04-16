import { spawn } from 'child_process';

export type NanoCorpEmailAttachment = {
  filename: string;
  contentBase64: string;
  mimeType: string;
};

type NanoCorpToolResponse = {
  success?: boolean;
  error?: string | null;
  result?: {
    status?: string;
    [key: string]: unknown;
  };
};

export async function sendNanoCorpEmail(params: {
  to: string;
  subject: string;
  html: string;
  attachments?: NanoCorpEmailAttachment[];
}): Promise<void> {
  const payload = {
    to: params.to,
    subject: params.subject,
    body: params.html,
    ...(params.attachments && params.attachments.length > 0
      ? {
          attachments: params.attachments.map((attachment) => ({
            filename: attachment.filename,
            content_base64: attachment.contentBase64,
            mime_type: attachment.mimeType,
          })),
        }
      : {}),
  };

  await new Promise<void>((resolve, reject) => {
    const child = spawn('nanocorp', ['tool', 'exec', 'send_email'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stdout = '';
    let stderr = '';

    child.stdout?.on('data', (data: Uint8Array) => {
      stdout += data.toString();
    });

    child.stderr?.on('data', (data: Uint8Array) => {
      stderr += data.toString();
    });

    child.on('close', (code: number) => {
      if (code !== 0) {
        reject(new Error(`nanocorp exited with code ${code}: ${stderr}`));
        return;
      }

      try {
        const response = JSON.parse(stdout) as NanoCorpToolResponse;
        if (response.success === false) {
          reject(new Error(response.error ?? 'NanoCorp send_email failed'));
          return;
        }

        resolve();
      } catch (error) {
        reject(
          new Error(
            `Unable to parse NanoCorp response: ${
              error instanceof Error ? error.message : 'unknown error'
            }`
          )
        );
      }
    });

    child.on('error', reject);
    child.stdin.end(JSON.stringify(payload), 'utf8');
  });
}
