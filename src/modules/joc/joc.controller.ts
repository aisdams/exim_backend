const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generateJOCCode,
  createJOC,
  getJOC,
  getJOCS,
  updateJOC,
  deleteAllJOC,
  deleteJOC,
} from './joc.service';

//! Create JOC
export const createJOCHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const joc_no = await generateJOCCode(query);
    data.joc_no = joc_no;

    const joc = await createJOC(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data JOC',
      data: joc,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get JOC
export const getJOCHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joc = await getJOC(req.params.joc_no);

    if (!joc) {
      return res.status(404).json({
        status: 'not found',
        message: 'JOC with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data JOC',
      data: joc,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get JOC
export const getJOCSHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const JOCs = await getJOCS(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data JOCs',
      data: JOCs.data,
      pagination: JOCs.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update JOC
export const updateJOCHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joc_no = req.params.joc_no;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const joc = await getJOC(joc_no);

    if (!joc) {
      return res.status(404).json({
        status: 'not found',
        message: 'JOC with that Code not found',
      });
    }

    const updatedJOC = await updateJOC(joc_no, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data JOC',
      data: updatedJOC,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update Status JOC
export const updateStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joc_no = req.params.joc_no;
    const data = req.body;
    // Cari JOC berdasarkan joc_no
    const joc: any | null = await getJOC(req.params.joc_no);

    if (!joc) {
      return res.status(404).json({ error: 'JOC not found' });
    }

    // Perbarui status JOC di database
    const updatedJOC = await updateJOC(joc_no, data);
    return res
      .status(200)
      .json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//! Delete JOC by id
export const deleteJOCHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const joc_no = req.params.joc_no;

    const joc = await getJOC(joc_no);

    if (!joc) {
      return res.status(404).json({
        status: 'not found',
        message: 'JOC with that Code not found',
      });
    }

    await deleteJOC(joc_no);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data JOC',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete JOC
export const deleteJOCsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllJOC();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data JOC',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
