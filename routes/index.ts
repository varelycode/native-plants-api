import express from 'express';
import { PostgresService } from '../services/PostgresService';

export const router = express.Router();
const db = new PostgresService();

router.get('/', (_req, res) => {
  res.send(
    'Make a request. \n e.g http://localhost:3000/plants/{name} or http://localhost:3000/plants/state/{state}'
  );
});

router.get('/plants/:name', async (req, res) => {
  const { name }: { name?: string } = req.params;
  const plants = await db.getPlantsByCommonName(name);
  res.send(plants);
});

router.get('/plants/state/:state', async (req, res) => {
  const { state }: { state?: string } = req.params;
  const plants = await db.getPlantsByState(state);
  res.send(plants);
});
