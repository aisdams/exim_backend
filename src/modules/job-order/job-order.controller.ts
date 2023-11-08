const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generateJobOrderCode,
  createJobOrder,
  getJobOrder,
  getJobOrders,
  updateJobOrder,
  deleteAllJobOrder,
  deleteJobOrder,
  createJOCforJO,
} from './job-order.service';

//! Create Job Order
export const createJobOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const jo_no = await generateJobOrderCode(query);
    data.jo_no = jo_no;

    const jobOrder = await createJobOrder(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data Job Order',
      data: jobOrder,
    });
  } catch (err: any) {
    next(err);
  }
};

//  Create Job Order for JOC
export const createJOForJOCHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = {
    ...req.body,
  };

  const query = {};

  const joc_no = req.params.joc_no;
  const jo_no = await generateJobOrderCode(query);
  data.jo_no = jo_no;

  try {
    const createdJOC = await createJOCforJO(joc_no, data);

    return res
      .status(201)
      .json({ message: 'Job Order created for the JOC', createdJOC });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to create Job Order for the JOC' });
  }
};

//! Get Job Order
export const getJobOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobOrder = await getJobOrder(req.params.jo_no);

    if (!jobOrder) {
      return res.status(404).json({
        status: 'not found',
        message: 'Job Order with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data Job Order',
      data: jobOrder,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get job order
export const getJobOrdersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const jobOrders = await getJobOrders(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data jobOrders',
      data: jobOrders.data,
      pagination: jobOrders.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update job order
export const updateJobOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jo_no = req.params.jo_no;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const jobOrder = await getJobOrder(jo_no);

    if (!jobOrder) {
      return res.status(404).json({
        status: 'not found',
        message: 'Job Order with that Code not found',
      });
    }

    const updatedJobOrder = await updateJobOrder(jo_no, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data job order',
      data: updatedJobOrder,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete job order by id
export const deleteJobOrderHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jo_no = req.params.jo_no;

    const jobOrder = await getJobOrder(jo_no);

    if (!jobOrder) {
      return res.status(404).json({
        status: 'not found',
        message: 'Job Order with that Code not found',
      });
    }

    await deleteJobOrder(jo_no);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data job order',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete job order
export const deleteJobOrdersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllJobOrder();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data job order',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
