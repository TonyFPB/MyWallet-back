import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { NewUser, UserSignIn } from "../schemas";
import { sessionRepository, userRepository } from "../repositories";
import { conflictUserError, userCreditialsError } from "../errors";

async function signUpNewUser(user: NewUser) {
  const userExists = await userRepository.findUserByEmail(user.email);
  if (userExists) throw conflictUserError();

  const passwordHash = bcrypt.hashSync(user.password, 10);

  const newUser = await userRepository.createNewUser(user.name, user.email, passwordHash);
}

async function createSession(name: string, userId: string) {
  const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET as string, {expiresIn: 86400});

  const session = await sessionRepository.create(userId, token);

  return { user: name, token };
}

async function verifySession(sessionId: string,name: string, userId: string, token: string) {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string);
    
    return { user: name, token };
  } catch (err) {
    await sessionRepository.deleteSession(sessionId);
    
    return createSession(name, userId);
  }

}

async function signInUser(user: UserSignIn) {
  const userExists = await userRepository.findUserByEmail(user.email);

  if (!userExists || !bcrypt.compareSync(user.password, userExists.password)) throw userCreditialsError();
  const { name, id: userId } = userExists;

  const sessionUser = await sessionRepository.findSession(userId);

  if (sessionUser) {
    const { id: sessionId ,token } = sessionUser;

    const userToken = await verifySession(sessionId, name, userId, token);

    return userToken;
  }else{
    return createSession(name, userId);
  }
}
const userService = {
  signUpNewUser,
  signInUser
};


export { userService };
