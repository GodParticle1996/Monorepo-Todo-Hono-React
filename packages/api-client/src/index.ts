import { hc } from "hono/client";
import type { router } from "@tasks-app/api/routes";

const client = hc<router>("");
export type Client = typeof client;

export default (...args: Parameters<typeof hc>): Client =>
  hc<router>(...args);

export type ErrorSchema = {
  error: {
    issues: {
      code: string;
      path: (string | number)[];
      message?: string | undefined;
    }[];
    name: string;
  };
  success: boolean;
};
