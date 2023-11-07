const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generatePortCode,
  createPort,
  getPort,
  getPorts,
  updatePort,
  deleteAllPort,
  deletePort,
} from './port.service';

//! Create Port
export const createPortHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const port_code = await generatePortCode(query);
    data.port_code = port_code;

    const port = await createPort(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data port',
      data: port,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get port
export const getPortHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const port = await getPort(req.params.port_code);

    if (!port) {
      return res.status(404).json({
        status: 'not found',
        message: 'Port with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data port',
      data: port,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get port
export const getPortsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const ports = await getPorts(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data ports',
      data: ports.data,
      pagination: ports.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update port
export const updatePortHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const port_code = req.params.port_code;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const port = await getPort(port_code);

    if (!port) {
      return res.status(404).json({
        status: 'not found',
        message: 'Port with that Code not found',
      });
    }

    const updatedPort = await updatePort(port_code, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data port',
      data: updatedPort,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete port by id
export const deletePortHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const port_code = req.params.port_code;

    const port = await getPort(port_code);

    if (!port) {
      return res.status(404).json({
        status: 'not found',
        message: 'Port with that Code not found',
      });
    }

    await deletePort(port_code);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data port',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete port
export const deletePortsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllPort();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data port',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
