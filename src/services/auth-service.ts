import { NewUser } from "../Schemas";
import { userRepository } from "../Repositories";
import { conflictUserError } from "../Errors";

import bcrypt from "bcrypt";



async function signUpNewUser(user: NewUser) {
  const userExists = await userRepository.findUserByEmail(user.email);
  if (userExists) throw conflictUserError();

  const passwordHash = bcrypt.hashSync(user.password, 10);

  const newUser = await userRepository.createNewUser(user.name, user.email, passwordHash);
}


const userService = {
  signUpNewUser
};

export { userService }
