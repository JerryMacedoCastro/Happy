import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import { Request, Response } from 'express';

export default {
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);
    try {
      const orphanage = await orphanagesRepository.findOneOrFail(id);
      return response.json(orphanage);
    } catch (error) {
      response
        .status(404)
        .json({ error: error.message, message: 'orphanage not found' });
    }
  },
  async index(_request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find();

    return response.json(orphanages);
  },
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    const requestImages = request.files as Express.Multer.File[];
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });
    try {
      await orphanagesRepository.save(orphanage);
    } catch (error) {
      return response.send({ message: error.message });
    }

    return response.status(201).json(orphanage);
  },
};
