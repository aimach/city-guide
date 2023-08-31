import { Request, Response } from 'express';
import dataSource from '../dataSource';
import { Poi } from '../entities/Poi';
import { Not } from 'typeorm';
import { IController } from './user-controller';
import fs from 'fs';
import { unlink } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { User, UserRole } from '../entities/User';
import { City } from '../entities/City';

export const PoiController: IController = {
   // GET ALL POI

   getPoi: async (req: Request, res: Response): Promise<void> => {
      try {
         let searchQueries = {};

         // if query in url, add finding options
         if (req.query) {
            const city = req.query.city as string;
            const category = req.query.category as string;
            if (city && category) {
               searchQueries = {
                  category: { name: category },
                  city: { name: city },
               };
            } else if (category) {
               searchQueries = { category: { name: category } };
            } else if (city) {
               searchQueries = { city: { name: city } };
            }
         }

         // get all poi
         let allPoi = await dataSource.getRepository(Poi).find({
            relations: {
               category: true,
               city: true,
               user: true,
            },
            where: searchQueries,
         });

         res.status(200).send(allPoi);
      } catch (err) {
         res.status(400).send({
            error: 'Error while reading points of interest',
         });
      }
   },

   // GET ONE POI BY ID

   getOnePoi: async (req: Request, res: Response): Promise<void> => {
      try {
         const { id } = req.params;
         const poiToRead = await dataSource
            .getRepository(Poi)
            .findOneBy({ id });
         if (poiToRead === null) {
            res.status(404).send({ error: 'Point of interest not found' });
         } else {
            res.status(200).send(poiToRead);
         }
      } catch (err) {
         res.status(400).send({
            error: 'Error while reading point of interest',
         });
      }
   },

   // CREATE POI

   createPoi: async (req: Request, res: Response): Promise<void> => {
      try {
         const {
            description,
            address,
            is_accepted,
            name,
            image,
            category,
            city,
            user,
            coordinates,
         } = req.body;

         // Check if user connected is admin city or admin
         const { userId } = req.params;

         const cityOfPoi = await dataSource.getRepository(City).findOne({
            where: { id: city },
            relations: {
               userAdminCity: true,
            },
         });

         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (
            cityOfPoi?.userAdminCity.id !== userId ||
            currentUser?.role !== UserRole.ADMIN
         ) {
            res.status(403).send({
               error: 'You are not authorized to create a point of interest',
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check if input with string are alpha and not empty

         const checkIfStringAndNotEmpty = async (
            value: string
         ): Promise<void> => {
            if (
               validator.isEmpty(value, { ignore_whitespace: true }) ||
               typeof value !== 'string'
            ) {
               res.status(400).send({
                  error: `Field must contains only characters`,
               });
               await unlink(`./public/poi/${req.file?.filename}`);

               return;
            }
         };

         const inputString: string[] = [description, name, address];
         inputString.forEach((value) => checkIfStringAndNotEmpty(value));

         // check name

         if (
            !validator.matches(
               name,
               /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
            )
         ) {
            res.status(400).send({
               error: `Field must contains only characters (min: 2, max: 100)`,
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check address

         if (
            !validator.matches(
               address,
               /^(([\u00c0-\u01ffa-zA-Z\d])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s)+((\d{5})*\s)([\u00c0-\u01ffa-zA-Z])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s*$/
            )
         ) {
            res.status(400).send({
               error: `Incorrect format of address`,
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check if foreign key are uuid type

         const checkIfUUID = async (value: string): Promise<void> => {
            if (!validator.isUUID(value)) {
               res.status(400).send({
                  error: 'Incorrect format of foreign key (must be uuid)',
               });
               await unlink(`./public/poi/${req.file?.filename}`);

               return;
            }
         };
         const foreignKeys: string[] = [category, city, user];
         foreignKeys.forEach((value) => {
            if (value) checkIfUUID(value);
         });

         // check if is_accepted is boolean

         if (!validator.isBoolean(is_accepted)) {
            res.status(400).send({ error: 'is_accepted must be a boolean' });
            await unlink(`./public/poi/${req.file?.filename}`);
            return;
         }

         // check if image is an object

         if (image && typeof image !== 'object') {
            res.status(400).send({
               error: `Field image must contains a file`,
            });
            await unlink(`./public/poi/${req.file?.filename}`);
            return;
         }

         // check coordinates format
         if (coordinates.length > 2) {
            res.status(400).send({
               error: 'Incorrect format of coordinates (must be [lat, long])',
            });
            await unlink(`./public/poi/${req.file?.filename}`);
            return;
         }

         // check if coords doesn't already exist in db
         const coordsAlreadyExist = await dataSource.getRepository(Poi).count({
            where: {
               coordinates: {
                  type: 'Point',
                  coordinates: [coordinates[0], coordinates[1]],
               },
            },
         });
         if (coordsAlreadyExist > 0) {
            res.status(409).send({ error: 'Point of interest already exists' });
            await unlink(`./public/poi/${req.file?.filename}`);
            return;
         }

         // format coordinates
         req.body.coordinates = {
            type: 'Point',
            coordinates: [coordinates[0], coordinates[1]],
         };

         // rename file image
         if (req.file) {
            const originalname = req.file.originalname;
            const filename = req.file.filename;
            const newName = `${uuidv4()}-${originalname}`;
            fs.rename(
               `./public/poi/${filename}`,
               `./public/poi/${newName}`,
               (err) => {
                  if (err) throw err;
               }
            );
            req.body.image = `/public/poi/${newName}`;
         } else {
            res.status(400).send({ error: 'An image is required' });
            return;
         }

         await dataSource.getRepository(Poi).save(req.body);
         res.status(201).send('Created point of interest');
      } catch (err) {
         res.status(400).send({ error: 'Something went wrong' });
         await unlink(`./public/poi/${req.file?.filename}`);
      }
   },

   // UPDATE POI BY ID

   updatePoi: async (req: Request, res: Response): Promise<void> => {
      try {
         const {
            description,
            address,
            is_accepted,
            name,
            category,
            city,
            user,
            coordinates,
         } = req.body;

         const { id } = req.params;

         // check if input with string are alpha and not empty

         const checkIfStringAndNotEmpty = async (
            value: string
         ): Promise<void> => {
            if (
               validator.isEmpty(value, { ignore_whitespace: true }) ||
               typeof value !== 'string'
            ) {
               res.status(400).send({
                  error: `Field must contains only characters`,
               });
               await unlink(`./public/poi/${req.file?.filename}`);

               return;
            }
         };

         const inputString: string[] = [description, name, address];
         inputString.forEach((value) => {
            if (value) checkIfStringAndNotEmpty(value);
         });

         // check coordinates format
         if (coordinates.length > 2) {
            res.status(400).send({
               error: 'Incorrect format of coordinates (must be [lat, long])',
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check name
         if (
            name &&
            !validator.matches(
               name,
               /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð '-]{2,100}$/
            )
         ) {
            res.status(400).send({
               error: `Field must contains only characters (min: 2, max: 100)`,
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check address

         if (
            address &&
            !validator.matches(
               address,
               /^(([\u00c0-\u01ffa-zA-Z\d])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s)+((\d{5})*\s)([\u00c0-\u01ffa-zA-Z])+(?:['-\s][\u00c0-\u01ffa-zA-Z]+)*\s*$/
            )
         ) {
            res.status(400).send({
               error: `Incorrect format of address`,
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check if foreign key are uuid type

         const checkIfUUID = async (value: string): Promise<void> => {
            if (!validator.isUUID(value)) {
               res.status(400).send({
                  error: 'Incorrect format of foreign key (must be uuid)',
               });
               await unlink(`./public/poi/${req.file?.filename}`);

               return;
            }
         };

         const foreignKeys: string[] = [category, city, user];
         foreignKeys.forEach((value) => {
            if (value) checkIfUUID(value);
         });

         // check if is_accepted is boolean

         if (is_accepted && typeof is_accepted !== 'boolean') {
            res.status(400).send({ error: 'is_accepted must be a boolean' });
            await unlink(`./public/poi/${req.file?.filename}`);
            return;
         }

         // check if POI exists in db
         const poiToUpdate = await dataSource
            .getRepository(Poi)
            .findOneBy({ id });
         if (poiToUpdate === null) {
            res.status(404).send({ error: 'Point of interest not found' });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check if user is admin
         const { userId } = req.params;

         const cityOfPoi = await dataSource.getRepository(City).findOne({
            where: { id: city },
            relations: {
               userAdminCity: true,
            },
         });

         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (
            cityOfPoi?.userAdminCity.id !== userId ||
            currentUser?.role !== UserRole.ADMIN
         ) {
            res.status(403).send({
               error: 'You are not authorized to create a point of interest',
            });
            await unlink(`./public/poi/${req.file?.filename}`);

            return;
         }

         // check if body.coords already exists in db
         if (coordinates !== undefined) {
            const coordsAlreadyExist = await dataSource
               .getRepository(Poi)
               .count({
                  where: {
                     coordinates: {
                        type: 'Point',
                        coordinates: [coordinates[0], coordinates[1]],
                     },
                     id: Not(id),
                  },
               });
            if (coordsAlreadyExist > 0) {
               res.status(404).send({
                  error: 'Point of interest already exist',
               });
               await unlink(`./public/poi/${req.file?.filename}`);

               return;
            }

            // format coordinates
            req.body.coordinates = {
               type: 'Point',
               coordinates: [coordinates[0], coordinates[1]],
            };
         }

         // rename the new file and delete the older one
         if (req.file) {
            // rename
            const originalname = req.file.originalname;
            const filename = req.file.filename;
            const newName = `${uuidv4()}-${originalname}`;
            fs.rename(
               `./public/poi/${filename}`,
               `./public/poi/${newName}`,
               (err) => {
                  if (err) throw err;
               }
            );
            req.body.image = `/public/poi/${newName}`;
            // delete
            if (poiToUpdate.image !== null) {
               await unlink('.' + poiToUpdate.image);
            }
         } else {
            res.status(400).send({ error: 'An image is required' });
            return;
         }

         await dataSource.getRepository(Poi).update(id, req.body);
         res.status(200).send('Updated point of interest');
      } catch (err) {
         res.status(400).send({
            error: 'Error while updating point of interest',
         });
         await unlink(`./public/poi/${req.file?.filename}`);
      }
   },

   // DELETE POI

   deletePoi: async (req: Request, res: Response): Promise<void> => {
      try {
         const { id } = req.params;

         // check if POI exists in db
         const poiToDelete = await dataSource
            .getRepository(Poi)
            .findOneBy({ id });
         if (poiToDelete === null) {
            res.status(404).send({ error: 'Point of interest not found' });
            return;
         }

         // check if user is admin
         const { userId } = req.params;

         const cityOfPoi = await dataSource
            .getRepository(City)
            .findOne({ where: { id: poiToDelete.city.id } });

         const currentUser = await dataSource
            .getRepository(User)
            .findOne({ where: { id: userId } });

         if (
            cityOfPoi?.userAdminCity.id !== userId ||
            currentUser?.role !== UserRole.ADMIN
         ) {
            res.status(403).send({
               error: 'You are not authorized to delete a point of interest',
            });
         }

         await dataSource.getRepository(Poi).delete(id);

         // delete image in public directory
         if (poiToDelete.image !== null) {
            await unlink('.' + poiToDelete.image);
         }

         res.status(200).send('Deleted point of interest');
      } catch (err: any) {
         res.status(400).send({ error: err.message });
      }
   },
};
