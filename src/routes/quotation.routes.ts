import express from 'express';
import {
  createQuotationHandler,
  getQuotationHandler,
  getQuotationsHandler,
  updateQuotationHandler,
  deleteQuotationHandler,
  deleteQuotationsHandler,
} from '../../src/modules/quotation/quotation.controller';
import {
  createQuotationSchema,
  updateQuotationSchema,
} from '../modules/quotation/quotation.shecma';
import { validate } from '../middleware/validate';
//import { deserializeUser } from "../../middleware/deserializeUser";
// import { requireUser } from '../../../middleware/requireUser';
import multer from 'multer';
// import { verifyJwt } from '../../../middleware/verify-jwt.middleware';

const router = express.Router();
const upload = multer();

// router.use(deserializeUser, requireUser);

// router.get('/', verifyJwt, getInboundsHandler);
router.get('/:quo_no', getQuotationHandler);
router.post('/', validate(createQuotationSchema), createQuotationHandler);
router.put('/:quo_no', validate(updateQuotationSchema), updateQuotationHandler);
router.delete('/', deleteQuotationsHandler);
router.delete('/:quo_no', deleteQuotationHandler);

export default router;
