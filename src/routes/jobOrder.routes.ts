import express from 'express';
import {
  createJobOrderHandler,
  getJobOrderHandler,
  getJobOrdersHandler,
  updateJobOrderHandler,
  deleteJobOrderHandler,
  deleteJobOrdersHandler,
} from '../../src/modules/job-order/job-order.controller';
import {
  createJobOrderSchema,
  updateJobOrderSchema,
} from '../modules/job-order/job-order.schema';
import { validate } from '../middleware/validate';
import multer from 'multer';
const router = express.Router();
const upload = multer();

router.get('/', getJobOrdersHandler);
router.get('/:jo_no', getJobOrderHandler);
router.post('/', validate(createJobOrderSchema), createJobOrderHandler);
router.put(
  '/:jo_no',

  validate(updateJobOrderSchema),
  updateJobOrderHandler
);
router.delete(
  '/:jo_no',

  deleteJobOrderHandler
);
router.delete('/', deleteJobOrdersHandler);

export default router;
