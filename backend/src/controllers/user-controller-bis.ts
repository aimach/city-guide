import { Request, Response } from 'express';
import { User } from '../entities/User';
import dataSource from '../dataSource';
import { hash } from 'bcrypt';
import validator from 'validator';
// REGISTER

interface IController {
   [key: string]: (arg0: Request, arg1: Response) => {};
}

export const AuthController: IController = {
   register: async (req: Request, res: Response) => {
      const { username, email, password } = req.body;

      const checkIfEmpty = (value: string) => {
         if (validator.isEmpty(value, { ignore_whitespace: true })) {
            return res
               .status(401)
               .send({ error: `Please fill the empty field` });
         }
      };

      try {
         let userToCreate = new User();
         userToCreate = { ...userToCreate, email, password, username };

         // Check if one of fields is empty
         const inputs: string[] = Object.values(req.body);
         inputs.forEach((value) => checkIfEmpty(value));

         const existingEmail = await dataSource
            .getRepository(User)
            .findOneBy({ email });

         // Check if email alrealy exists

         if (existingEmail) {
            return res.status(409).send({ error: 'Email already exists' });
         }

         // Check if username is already taken

         const existingUsername = await dataSource
            .getRepository(User)
            .findOneBy({ username });
         if (existingUsername) {
            return res.status(409).send({
               error: 'This username is taken, please choose another one',
            });
         }

         if (validator.isEmail(email) === false) {
            return res.status(401).send({ error: 'Incorrect email format' });
         }

         if (
            validator.isStrongPassword(password, {
               minLength: 8,
               minNumbers: 1,
               minUppercase: 1,
               minSymbols: 1,
            }) === false
         ) {
            return res.status(401).send({
               error: 'Password must contain 8 characters, 1 digit, 1 uppercase and 1 symbol',
            });
         }
         const hashedPassword = await hash(password, 10);
         const newUser = { ...userToCreate, password: hashedPassword };
         await dataSource.getRepository(User).save(newUser);
         return res.status(201).send('Utilisateur créé');
      } catch (error) {
         console.log(error);
      }
   },
};
/* export const register = async (req: Request, res: Response) => {
   const { username, email, password } = req.body;
   let userToCreate = new User();
   userToCreate = { ...userToCreate, email, password, username };
   const existingUser = await dataSource
      .getRepository(User)
      .findOneBy({ email });

   if (existingUser) {
      return res.status(409).send({ error: 'Email already exists' });
   }
   const errors = await validate(userToCreate);
   if (errors.length > 0) {
      console.log(errors);
   }
};
 */
