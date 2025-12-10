export const env = {
  message: Bun.env.MESSAGE,
  message2: process.env.MESSAGE,
} as const;
