import express from 'express';
import {
  createJOCHandler,
  getJOCHandler,
  getJOCSHandler,
  updateJOCHandler,
  deleteJOCHandler,
  deleteJOCsHandler,
} from '../../src/modules/joc/joc.controller';
import { createJOCSchema, updateJOCSchema } from '../modules/joc/joc.schema';
import { validate } from '../middleware/validate';
import multer from 'multer';
const router = express.Router();
const upload = multer();

router.get('/', getJOCSHandler);
router.get('/:joc_no', getJOCHandler);
router.post('/', validate(createJOCSchema), createJOCHandler);
router.put(
  '/:joc_no',

  validate(updateJOCSchema),
  updateJOCHandler
);
router.delete(
  '/:joc_no',

  deleteJOCHandler
);
router.delete('/', deleteJOCsHandler);

export default router;
