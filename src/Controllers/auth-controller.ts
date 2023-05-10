import { NewUser } from "../Schemas"
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
    if(err.name === "ConflictUserError"){
      return res.status(httpStatus.CONFLICT).send(err);
    }
    res.sendStatus(500)
  }

}


// export async function postSignIn(req, res) {
//     const user = req.user
//     try {
//         const sessionExist = await sessionsCollection.findOne({ userId: user._id })
//         if (sessionExist) {
//             return res.send({ token: sessionExist.token , user:user.name})
//         }
//         const createToken = uuidV4()
//         await sessionsCollection.insertOne({ token: createToken, userId: user._id })
//         res.send({token: createToken, user:user.name})
//     } catch (err) {
//         console.log(err)
//         res.sendStatus(500)
//     }

// }