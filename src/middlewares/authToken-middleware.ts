import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { sessionRepository } from "../repositories";

export default async function authToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.sendStatus(401);
  }
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await sessionRepository.findSession(token);
    if (!session) {
      return res.sendStatus(401);
    }
    req.userId = session.userId;
  } catch (err) {
    res.sendStatus(500);
  }
  next();
}

export type AuthenticatedRequest = Request & UserId;

type UserId = {
  userId: String
}