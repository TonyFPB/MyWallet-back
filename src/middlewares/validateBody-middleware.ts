import { Response, NextFunction, Request } from "express"
import { ObjectSchema } from "joi"

export function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userInfo = req.body;
    const validation = schema.validate(userInfo, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map(d => d.message);
      return res.status(400).send({ message: errors });
    }
    req.body = validation.value;
    next();
  };
}