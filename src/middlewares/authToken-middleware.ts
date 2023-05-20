import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

import { sessionRepository } from "../repositories";
import { unauthorizedError } from "../errors";

export async function authToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return generateUnauthorizedResponse(res);
  }
  const [auth, token] = authHeader.split(" ");
  if (auth !== "Bearer" || !token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

    const session = await sessionRepository.findSessionByToken(token);
    if (!session) return generateUnauthorizedResponse(res);

    req.userId =  userId;

    return next();
  } catch (err) {
    return generateUnauthorizedResponse(res);
  };
}

function generateUnauthorizedResponse(res: Response) {
  return res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
  userId?: string
};
