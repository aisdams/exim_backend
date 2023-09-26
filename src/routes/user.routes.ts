import express from 'express';
import { getMeHandler } from '../../src/modules/user/user.controlller';
// import { deserializeUser } from '../../middleware/deserializeUser';
import { requireUser } from '../../src/middleware/requireUser';

const router = express.Router();

router.use(requireUser);

router.get('/me', getMeHandler);

export default router;
