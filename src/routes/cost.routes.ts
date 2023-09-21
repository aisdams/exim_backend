import express from 'express';
import {
  createCostHandler,
  getCostHandler,
  getCostsHandler,
  updateCostHandler,
  deleteCostHandler,
  deleteCostsHandler,
} from '../../src/modules/cost/cost.controller';
import {
  createCostSchema,
  updateCostSchema,
} from '../modules/cost/cost.schema';
import { validate } from '../middleware/validate';
//import { deserializeUser } from "../../middleware/deserializeUser";
// import { requireUser } from '../../../middleware/requireUser';
import multer from 'multer';
// import { verifyJwt } from '../../../middleware/verify-jwt.middleware';

const router = express.Router();
const upload = multer();

router.get('/', getCostsHandler);
router.get('/:item_cost', getCostHandler);
router.post('/', validate(createCostSchema), createCostHandler);
router.put(
  '/:item_cost',

  validate(updateCostSchema),
  updateCostHandler
);
router.delete(
  '/:item_cost',

  deleteCostHandler
);
router.delete('/', deleteCostsHandler);

export default router;
