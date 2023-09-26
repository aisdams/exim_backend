import express from 'express';
import {
  login,
  // loginUserHandler,
  // logoutUserHandler,
  me,
  newLogout,
  // refreshAccessTokenHandler,
  register,
  // registerUserHandler,
} from '../../modules/auth/auth.controller';
// //import { deserializeUser } from "../../middleware/deserializeUser";
// import { requireUser } from "../../middleware/requireUser";
import { validate } from '../../middleware/validate';
import {
  loginSchema,
  // loginUserSchema,
  registerSchema,
  // registerUserSchema,
} from '../../modules/user/user.schema';
import { verifyJwt } from '../../middleware/verify-jwt.middleware';

const router = express.Router();

// router.post('/register', validate(registerUserSchema), registerUserHandler);
router.post('/register', validate(registerSchema), register);
// router.post("/login", validate(loginUserSchema), loginUserHandler);
router.post('/login', validate(loginSchema), login);
// router.get("/refresh", refreshAccessTokenHandler);
// router.get("/logout", deserializeUser, requireUser, logoutUserHandler);
router.post('/logout', verifyJwt, newLogout);
router.get('/me', verifyJwt, me);

export default router;
