import { Hono } from "hono";

import { x } from "@repo/constants";

import "bun";

import { env } from "./env.js";

const app = new Hono();

const x2 = 2;
const welcomeStrings = [
  "Hello Hono!",
  "To learn more about Hono on Vercel, visit https://vercel.com/docs/frameworks/backend/hono",
  x,
  ...Object.values(env),
];

app.get("/", (c) => {
  const l = 2;
  return c.text(welcomeStrings.join("\n\n"));
});

export default app;
