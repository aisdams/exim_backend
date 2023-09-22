import express from 'express';
import {
  createPortHandler,
  getPortHandler,
  getPortsHandler,
  updatePortHandler,
  deletePortHandler,
  deletePortsHandler,
} from '../../src/modules/port/port.controller';
import {
  createPortSchema,
  updatePortSchema,
} from '../modules/port/port.schema';
import { validate } from '../middleware/validate';
import multer from 'multer';
const router = express.Router();
const upload = multer();

router.get('/', getPortsHandler);
router.get('/:port_code', getPortHandler);
router.post('/', validate(createPortSchema), createPortHandler);
router.put(
  '/:port_code',

  validate(updatePortSchema),
  updatePortHandler
);
router.delete(
  '/:port_code',

  deletePortHandler
);
router.delete('/', deletePortsHandler);

export default router;
