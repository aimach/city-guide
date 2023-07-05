import { Request, Response } from 'express';
import { User } from '../entities/User';
import { validate } from 'class-validator';
import dataSource from '../dataSource';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

// REGISTER

export const register = async (req: Request, res: Response) => {
   const { username, email, password } = req.body;
   console.log(username);
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

// CONNEXION
export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;
   //    const getUser = User.findOne({email:req.body.email});

   // recuperation de l'email et du mot de passe de l'utilisateur
   const getUserByEmail = await dataSource
      .getRepository(User)
      .findOneBy({ email });
   const getUserPassword = await dataSource
      .getRepository(User)
      .findOneBy({ password });

   // verificaiton si je n'ai pas d'email
   //    if (getUserByEmail === null) {
   //       return res.status(404).send({ error: 'Invalid credentials' });
   //    }
   if (!getUserByEmail) {
      //   console.log("you don't have an account");
      return res
         .status(404)
         .send({ error: 'Email is not found, user is not register yet' });
   } else {
      console.log('Please enter your password');
      //   getUserPassword
   }
   const user = getUserByEmail;
   const validPassword = bcrypt.compareSync(password, user.password);

   //verification si je n'ai pas le bon mot de passe
   if (!validPassword) {
      return res.status(400).send('Wrond password');
   } else {
      // const token
      const token = sign({ userId: getUserByEmail.id }, 'ma_cle_prive');
      //   return token;
      return res.status(200).send('You are well connected !');
   }
   //   if (!getUserPassword) {
   //       const user = getUserByEmail;
   //       const validPassword = bcrypt.compareSync(password, user.password);
   //   }
};
