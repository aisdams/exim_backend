import express from 'express';
import {
  createCustomerHandler,
  getCustomerHandler,
  getCustomersHandler,
  updateCustomerHandler,
  deleteCustomerHandler,
  deleteCustomersHandler,
} from '../../src/modules/customer/customer.controller';
import {
  createCustomerSchema,
  updateCustomerSchema,
} from '../modules/customer/customer.schema';
import { validate } from '../middleware/validate';
//import { deserializeUser } from "../../middleware/deserializeUser";
// import { requireUser } from '../../../middleware/requireUser';
import multer from 'multer';
// import { verifyJwt } from '../../../middleware/verify-jwt.middleware';

const router = express.Router();
const upload = multer();

router.get('/', getCustomersHandler);
router.get('/:customer_code', getCustomerHandler);
router.post('/', validate(createCustomerSchema), createCustomerHandler);
router.put(
  '/:customer_code',

  validate(updateCustomerSchema),
  updateCustomerHandler
);
router.delete(
  '/:customer_code',

  deleteCustomerHandler
);
router.delete('/', deleteCustomersHandler);

export default router;
