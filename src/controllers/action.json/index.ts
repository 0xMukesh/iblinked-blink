import { Request, Response } from "express";
import { ACTIONS_CORS_HEADERS, ActionsJson } from "@solana/actions";

export const actionsJsonHandler = async (_req: Request, res: Response) => {
  const payload: ActionsJson = {
    rules: [
      {
        pathPattern: "/*",
        apiPath: "/api/actions/*",
      },
      {
        pathPattern: "/api/actions/**",
        apiPath: "/api/actions/**",
      },
    ],
  };

  return res.status(200).header(ACTIONS_CORS_HEADERS).json(payload);
};
