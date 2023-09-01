import { Request, Response } from 'express';
import dataSource from '../dataSource';
import { City } from '../entities/City';
import { Not } from 'typeorm';
import { IController } from './user-controller';
import fs from 'fs';
import { unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { User, UserRole } from '../entities/User';

export const CityController: IController = {
   // GET ALL CITIES

   getCities: async (req: Request, res: Response): Promise<void> => {
      try {
         const allCities = await dataSource.getRepository(City).find({
            relations: {
               userAdminCity: true,
               poi: true,
            },
            select: {
               userAdminCity: {
                  id: true,
                  username: true,
                  email: true,
                  city: true,
                  image: true,
                  createdPoi: true,
               },
            },
         });
         res.status(200).send(allCities);
      } catch (err) {
         console.log(err);
         res.status(400).send({ error: 'Error while reading cities' });
      }
   },

   // GET ONE CITY BY ID

   getOneCity: async (req: Request, res: Response): Promise<void> => {
      try {
         const { id } = req.params;
         const cityToRead = await dataSource.getRepository(City).findOne({
            where: { id },
            relations: {
               userAdminCity: true,
               poi: {
                  category: true,
               },
            },
            select: {
               poi: true,
               userAdminCity: {
                  id: true,
                  username: true,
                  email: true,
                  city: true,
                  image: true,
                  createdPoi: true,
               },
            },
         });
         if (cityToRead === null) {
            res.status(404).send({ error: 'City not found' });
         } else {
            res.status(200).send(cityToRead);
         }
      } catch (err) {
         res.status(400).send({ error: 'Error while reading city' });
      }
   },

   // CREATE CITY

   createCity: async (req: Request, res: Response): Promise<void> => {
      try {
         const { name, image, coordinates, userAdminCityId } = req.body;
         const { userId } = req.params;

         // Check if current user is admin
         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (currentUser?.role !== UserRole.ADMIN) {
            res.status(403).send({
               error: 'You are not authorized to create a city',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if name is alpha or not empty
         // isAlpha check if string because only letters
         if (
            !validator.matches(
               name,
               /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
            ) ||
            validator.isEmpty(name, { ignore_whitespace: true })
         ) {
            res.status(400).send({
               error: `Field must contains only characters (min: 2, max: 100)`,
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if coordinates are type [number, number]

         if (coordinates.length > 2) {
            res.status(400).send({
               error: 'Incorrect format of coordinates (must be [lat, long])',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if userAdminCity is UUID type
         if (userAdminCityId && !validator.isUUID(userAdminCityId)) {
            res.status(400).send({
               error: 'Incorrect format of admin city id (must be uuid)',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if name doesn't already exist in db
         const nameAlreadyExist = await dataSource
            .getRepository(City)
            .count({ where: { name } });

         // check if coords doesn't already exist in db
         const coordsAlreadyExist = await dataSource.getRepository(City).count({
            where: {
               coordinates: {
                  type: 'Point',
                  coordinates: [coordinates[0], coordinates[1]],
               },
            },
         });

         // if one or another exists, send 409
         if (nameAlreadyExist > 0 || coordsAlreadyExist > 0) {
            res.status(409).send({ error: 'City already exists' });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // rename file image
         if (req.file) {
            const originalname = req.file.originalname;
            const filename = req.file.filename;
            const newName = `${uuidv4()}-${originalname}`;
            fs.rename(
               `./public/city/${filename}`,
               `./public/city/${newName}`,
               (err) => {
                  if (err) throw err;
               }
            );
            req.body.image = `/public/city/${newName}`;
         } else {
            res.status(400).send({ error: 'An image is required' });
            return;
         }

         // format coordinates
         req.body.coordinates = {
            type: 'Point',
            coordinates: [coordinates[0], coordinates[1]],
         };

         await dataSource.getRepository(City).save(req.body);
         res.status(201).send('Created city');
      } catch (error: any) {
         // check if error is 'Key ("userAdminCityId")=(id) already exists'
         if (error.code === '23505') {
            res.status(409).send({
               error: 'User is already administrator in another city',
            });
            await unlink(`./public/city/${req.file?.filename}`);
         } else {
            res.status(400).send({ error: error.message });
            await unlink(`./public/city/${req.file?.filename}`);
         }
      }
   },

   // UPDATE CITY BY ID

   updateCity: async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;

      const { name, image, coordinates, userAdminCity } = req.body;
      const { userId } = req.params;

      try {
         // Check if current user is admin

         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (currentUser?.role !== UserRole.ADMIN) {
            res.status(403).send({
               error: 'You are not authorized to update a city',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if name is alpha or not empty

         if (
            name &&
            (!validator.matches(
               name,
               /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
            ) ||
               validator.isEmpty(name, { ignore_whitespace: true }))
         ) {
            res.status(400).send({
               error: `Field must contains only characters`,
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if image is alpha or not empty

         if (image && validator.isEmpty(image)) {
            res.status(400).send({
               error: `Field must contains only characters`,
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if coordinates are type [number, number]

         if (
            coordinates &&
            (coordinates.length > 2 ||
               coordinates.find((cd: number) => typeof cd !== 'number'))
         ) {
            res.status(400).send({
               error: 'Incorrect format of coordinates (must be [lat, long])',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if userAdminCity is UUID type

         if (userAdminCity && !validator.isUUID(userAdminCity)) {
            res.status(400).send({
               error: 'Incorrect format of admin city id (must be uuid)',
            });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if city exists by id
         const cityToUpdate = await dataSource
            .getRepository(City)
            .findOneBy({ id });

         if (cityToUpdate === null) {
            res.status(404).send({ error: 'City not found' });
            await unlink(`./public/city/${req.file?.filename}`);
            return;
         }

         // check if body.name already exists in db

         let nameAlreadyExist = null;
         let coordsAlreadyExist = null;
         if (name !== undefined) {
            nameAlreadyExist = await dataSource
               .getRepository(City)
               // check every tuples except the one updating
               .count({ where: { name, id: Not(id) } });
            if (nameAlreadyExist > 0) {
               res.status(409).send({ error: 'City already exists' });
               await unlink(`./public/city/${req.file?.filename}`);
               return;
            }
         }

         // check if body.coordinates already exists in db
         if (coordinates !== undefined) {
            coordsAlreadyExist = await dataSource.getRepository(City).count({
               where: {
                  coordinates: {
                     type: 'Point',
                     coordinates: [coordinates[0], coordinates[1]],
                  },
                  id: Not(id),
               },
            });
            if (coordsAlreadyExist > 0) {
               res.status(409).send({ error: 'City already exists' });
               await unlink(`./public/city/${req.file?.filename}`);
               return;
            }
            // format coordinates
            req.body.coordinates = {
               type: 'Point',
               coordinates: [coordinates[0], coordinates[1]],
            };
         }

         // if file, rename the new file and delete the old one
         if (req.file) {
            // rename the new file
            const originalname = req.file.originalname;
            const filename = req.file.filename;
            const newName = `${uuidv4()}-${originalname}`;
            fs.rename(
               `./public/city/${filename}`,
               `./public/city/${newName}`,
               (err) => {
                  if (err) throw err;
               }
            );
            req.body.image = `/public/city/${newName}`;

            // delete the older file
            if (cityToUpdate.image !== null) {
               await unlink('.' + cityToUpdate.image);
            }
         }

         await dataSource.getRepository(City).update(id, req.body);
         res.status(200).send('Updated city');
      } catch (error: any) {
         // check if error is 'Key ("userAdminCityId")=(id) already exists'
         if (error.code === '23505') {
            res.status(409).send({
               error: 'User is already administrator in another city',
            });
            await unlink(`./public/city/${req.file?.filename}`);
         } else {
            res.status(400).send({ error: error.message });
            await unlink(`./public/city/${req.file?.filename}`);
         }
      }
   },

   // DELETE CITY

   deleteCity: async (req: Request, res: Response): Promise<void> => {
      try {
         const { id, userId } = req.params;

         // Check if current user is admin
         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (currentUser?.role !== UserRole.ADMIN) {
            res.status(403).send({
               error: 'You are not authorized to delete a city',
            });

            return;
         }
         // check if city exists in db
         const cityToDelete = await dataSource
            .getRepository(City)
            .findOneBy({ id });
         if (cityToDelete === null) {
            res.status(404).send({ error: 'City not found' });
            return;
         }

         await dataSource.getRepository(City).delete(id);
         // delete image in public directory
         if (cityToDelete.image !== null) {
            await unlink('.' + cityToDelete.image);

            res.status(200).send('Deleted city');
         }
      } catch (err) {
         res.status(400).send({ error: 'Error while deleting city' });
      }
   },
};
