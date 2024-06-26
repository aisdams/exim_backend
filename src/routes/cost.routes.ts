import express from 'express';
import {
  createCostHandler,
  getCostHandler,
  getCostsHandler,
  updateCostHandler,
  deleteCostHandler,
  deleteCostsHandler,
  createCostForQuotationHandler,
} from '../../src/modules/cost/cost.controller';
import {
  createCostQuoSchema,
  createCostSchema,
  updateCostSchema,
} from '../modules/cost/cost.schema';
import { validate } from '../middleware/validate';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/', getCostsHandler);
router.get('/:item_cost', getCostHandler);
router.post('/', validate(createCostSchema), createCostHandler);
router.post(
  '/:quo_no',
  validate(createCostQuoSchema),
  createCostForQuotationHandler
);
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
