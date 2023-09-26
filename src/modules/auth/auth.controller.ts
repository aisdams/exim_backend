import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { createUser } from '../../modules/user/user.service';
import { Prisma } from '@prisma/client';
import config from 'config';
import AppError from '../../utils/app-error';
import prisma from '../../utils/prisma';
// import Email from '../utils/email';
import jwt from 'jsonwebtoken';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

if (process.env.NODE_ENV === 'production') cookiesOptions.secure = true;

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

// export const refreshAccessTokenHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const refresh_token = req.cookies.refresh_token;

//     const message = "Could not refresh access token";

//     if (!refresh_token) {
//       return next(new AppError(403, message));
//     }

//     // Validate refresh token
//     const decoded = verifyJwt<{ sub: string }>(
//       refresh_token,
//       "refreshTokenPublicKey"
//     );

//     if (!decoded) {
//       return next(new AppError(403, message));
//     }

//     // Check if user has a valid session
//     const session = await redisClient.get(decoded.sub);

//     if (!session) {
//       return next(new AppError(403, message));
//     }

//     // Check if user still exist
//     const user = await findUniqueUser({
//       user_code: JSON.parse(session).user_code,
//     });

//     if (!user) {
//       return next(new AppError(403, message));
//     }

//     // Sign new access token
//     const access_token = signJwt(
//       { sub: user.user_code },
//       "accessTokenPrivateKey",
//       {
//         expiresIn: `${config.get<number>("accessTokenExpiresIn")}m`,
//       }
//     );

//     // 4. Add Cookies
//     res.cookie("access_token", access_token, accessTokenCookieOptions);
//     res.cookie("logged_in", true, {
//       ...accessTokenCookieOptions,
//       httpOnly: false,
//     });

//     // 5. Send response
//     res.status(200).json({
//       status: "success",
//       access_token,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// function logout(res: Response) {
//   res.cookie("access_token", "", { maxAge: 1 });
//   res.cookie("refresh_token", "", { maxAge: 1 });
//   res.cookie("logged_in", "", { maxAge: 1 });
// }

// export const logoutUserHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     await redisClient.del(res.locals.user.id);
//     logout(res);

//     res.status(200).json({
//       status: "success",
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isUserExists) {
      return res.status(500).json({
        status: 'error',
        message: 'User with that email is already exists!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'Registered successfully.',
      data: user,
    });
  } catch (err: any) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exist, please use another email address',
        });
      }
    }
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    const expireInSeconds = 86400; //! 1 day

    const accessToken = jwt.sign(
      {
        id: user.user_code,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: expireInSeconds,
      }
    );

    //! set cookie
    // const date = expiresInSeconds(expireInSeconds);
    // res.cookie('WMS_TOKEN', accessToken, {
    //   httpOnly: true,
    //   expires: date,
    //   // sameSite: "none",
    //   secure: process.env.NODE_ENV === 'development' ? false : true,
    //   domain:
    //     process.env.NODE_ENV === 'development' ? 'localhost' : '.neelo.id',
    // });

    const accessTokenExpires = Date.now() + expireInSeconds;

    return res.status(200).json({
      message: 'Logged in successfully.',
      data: {
        email: user.email,
        name: user.name,
        role: user.role,
        accessToken,
        accessTokenExpires,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const me = (req: any, res: Response) => {
  return res.json(req.user);
};

export const newLogout = (req: any, res: Response) => {
  res.clearCookie('WMS_TOKEN', {
    secure: process.env.NODE_ENV === 'development' ? false : true,
    domain: process.env.NODE_ENV === 'development' ? 'localhost' : '.neelo.id',
  });

  return res.status(200).json({
    message: 'Logged out successfully.',
  });
};
