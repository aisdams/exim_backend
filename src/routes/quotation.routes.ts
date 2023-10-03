import express from 'express';
import {
  createQuotationHandler,
  getQuotationHandler,
  getQuotationsHandler,
  updateQuotationHandler,
  deleteQuotationHandler,
  deleteQuotationsHandler,
  copyQuotationDataHandler,
} from '../../src/modules/quotation/quotation.controller';
import {
  createQuotationSchema,
  updateQuotationSchema,
} from '../modules/quotation/quotation.shecma';
import { validate } from '../middleware/validate';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.get('/', getQuotationsHandler);
router.get('/:quo_no', getQuotationHandler);
router.post('/', validate(createQuotationSchema), createQuotationHandler);
router.post(
  '/:quo_no',
  validate(createQuotationSchema),
  copyQuotationDataHandler
);
router.put(
  '/:quo_no',

  validate(updateQuotationSchema),
  updateQuotationHandler
);
router.delete(
  '/:quo_no',

  deleteQuotationHandler
);
router.delete('/', deleteQuotationsHandler);

export default router;
