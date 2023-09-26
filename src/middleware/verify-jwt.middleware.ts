import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyJwt = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({
      message: 'Unauthorized!',
    });

  const verifiedUser = jwt.verify(
    token.split('Bearer ')[1],
    process.env.JWT_SECRET!,
  );
  if (!verifiedUser)
    return res.status(403).json({
      message: 'Token is invalid!',
    });

  req.user = verifiedUser;

  // // req.user = {
  // //   id: "f03462b9-ea01-4fd9-8008-2bc53c792e77",
  // //   email: "lucas@gmail.com",
  // //   name: "lucas",
  // //   role: "user",
  // //   iat: 1678351775,
  // //   exp: 1678438175,
  // // };

  next();
};
