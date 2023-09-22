const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generateQuotationCode,
  createQuotationn,
  getQuotation,
  getQuotations,
  updateQuotation,
  deleteAllQuotation,
  deleteQuotation,
} from './quotation.service';

//! Tambah Quotation
export const createQuotationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const quo_no = await generateQuotationCode(query);
    data.quo_no = quo_no;

    const quotation = await createQuotationn(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data quotation',
      data: quotation,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get quotation
export const getQuotationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quotation = await getQuotation(req.params.quo_no);

    if (!quotation) {
      return res.status(404).json({
        status: 'not found',
        message: 'Quotation with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data quotation',
      data: quotation,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get quotatin
export const getQuotationsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const quotations = await getQuotations(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data quotations',
      data: quotations.data,
      pagination: quotations.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update quotaion
export const updateQuotationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quo_no = req.params.quo_no;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const quotation = await getQuotation(quo_no);

    if (!quotation) {
      return res.status(404).json({
        status: 'not found',
        message: 'Quotation with that Code not found',
      });
    }

    const updatedQuotation = await updateQuotation(quo_no, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data quotation',
      data: updatedQuotation,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete quotation by id
export const deleteQuotationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quo_no = req.params.quo_no;

    const quotation = await getQuotation(quo_no);

    if (!quotation) {
      return res.status(404).json({
        status: 'not found',
        message: 'Quotation with that Code not found',
      });
    }

    await deleteQuotation(quo_no);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data quotation',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete quotation
export const deleteQuotationsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllQuotation();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data quotation',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
