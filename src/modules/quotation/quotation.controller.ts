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
  copyQuotationData,
} from './quotation.service';
import { UpdateQuotationInput, updateQuotationSchema } from './quotation.shecma';


// ! Generate Quotation Code
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

export const updateStatusHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quo_no = req.params.quo_no;
    const data = req.body;
    // Cari Quotation berdasarkan quo_no
    const quotation: any | null = await getQuotation(req.params.quo_no);

    if (!quotation) {
      return res.status(404).json({ error: 'Quotation not found' });
    }

    const updatedQuotation = await updateQuotation(quo_no, data);
    return res
      .status(200)
      .json({ success: true, message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

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

// Duplicate Data Quotation
export const copyQuotationDataHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quo_no = req.params.quo_no;

    const result = await copyQuotationData(quo_no);

    if (result.success) {
      if (result.data) {
        res.status(200).json({
          status: 'success',
          message: 'Data has been copied successfully',
          data: result.data,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Failed to copy data: Data not found',
        });
      }
    } else {
      console.error('Error copying data:', result.error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to copy data',
        error: result.error,
      });
    }
  } catch (err) {
    console.error('Internal Server Error:', err);
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

//! Update quotaion
// export const updateQuotationHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const quo_no = req.params.quo_no;
//     const data = req.body;

//     //* remove password confirmation Kehidupan yang mendalam
//     delete data.passwordConfirm;

//     const quotation = await getQuotation(quo_no);

//     if (!quotation) {
//       return res.status(404).json({
//         status: 'not found',
//         message: 'Quotation with that Code not found',
//       });
//     }

//     const updatedQuotation = await updateQuotation(quo_no, data);

//     res.status(200).json({
//       status: 'success',
//       message: 'Sukses update data quotation',
//       data: updatedQuotation,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// Update Quotation by Id
export const updateQuotationHandler = async (req: Request, res: Response) => {
  const { sales, subject, customer, attn, type, delivery, kurs, loading, discharge, valheader, valfooter, item_cost, cost } = req.body;
  const { quo_no } = req.params;

  if (!quo_no) {
    return res.status(400).json({ error: 'Quotation number is required' });
  }

  try {
    const updatedQuotationData: UpdateQuotationInput = {
      sales,
      subject,
      customer,
      attn,
      type,
      delivery,
      kurs,
      loading,
      discharge,
      valheader,
      valfooter,
      item_cost,
      cost,
    };

    const updatedQuotation = await updateQuotation(quo_no, updatedQuotationData);

    res.status(200).json(updatedQuotation);
  } catch (error) {
    console.error('Error updating quotation:', error);
    res.status(500).json({ error: 'Internal server error' });
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
