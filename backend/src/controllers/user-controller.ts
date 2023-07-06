import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import { User } from '../entities/User';
import dataSource from '../dataSource';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { hash } from 'bcrypt';
import validator from 'validator';

dotenv.config();

const TOKEN = process.env.TOKEN;

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
         const token = sign(
            { userId: newUser.id, role: newUser.role },
            TOKEN as string,
            {
               expiresIn: '1h',
            }
         );
         // envoi token dans le cookie
         res.cookie('token', token, { httpOnly: true });
         return res.status(201).send(token);
      } catch (error) {
         console.log(error);
      }
   },

   // LOGIN

   login: async (req: Request, res: Response) => {
      const { email, password } = req.body;

      // recuperation de l'email de l'utilisateur
      const getUserByEmail = await dataSource
         .getRepository(User)
         .findOneBy({ email });

      // verificaiton si je n'ai pas d'email
      if (getUserByEmail === null) {
         return res.status(404).send({ error: 'Invalid credentials' });
      }

      const user = getUserByEmail;
      const validPassword = await bcrypt.compare(password, user.password);

      //verification si je n'ai pas le bon mot de passe
      if (!validPassword) {
         return res.status(400).send({ error: 'Invalid credentials' });
      } else {
         const token = sign(
            { userId: getUserByEmail.id, role: getUserByEmail.role },
            TOKEN as string,
            {
               expiresIn: '1h',
            }
         );
         res.cookie('token', token, { httpOnly: true });
         return res.status(200).send(token);
      }
   },
};

// Voir cookie-parser pour middleware
