import { NewUser, UserSignIn } from "../schemas"
import { Request, Response } from "express";
import { userService } from "../services"
import httpStatus from "http-status";
import { ApplicationError } from "protocols";
// import { v4 as uuidV4 } from "uuid"

export async function postSignUp(req: Request, res: Response) {
  const user = req.body as NewUser;
  try {
    const newUser = await userService.signUpNewUser(user);

    return res.sendStatus(201);
  } catch (err: any) {
    console.log(err);
    if(err.name === "ConflictUserError"){
      return res.status(httpStatus.CONFLICT).send(err);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

}

export async function postSignIn(req: Request, res: Response) {
  const user = req.body as UserSignIn;
  try {
    const userSession = await userService.signInUser(user);
    
    res.send(userSession);
  } catch (err: any) {
    if(err.name === "UserCreditialsError"){
      return res.status(httpStatus.UNAUTHORIZED).send(err);
    }
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}