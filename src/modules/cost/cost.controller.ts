const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generateItemCost,
  createCost,
  getCost,
  getCosts,
  updateCost,
  deleteAllCost,
  deleteCost,
  createQuotationCost,
} from './cost.service';

//! Create Cost
export const createCostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const item_cost = await generateItemCost(query);
    data.item_cost = item_cost;

    const cost = await createCost(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data cost',
      data: cost,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Create Cost for Quotation
export const createCostForQuotationHandler = async (
  req: Request<{ quo_no: string }>,
  res: Response,
  next: NextFunction
) => {
  let data = {
    ...req.body,
  };

  const query = {};

  const quo_no = req.params.quo_no;
  const item_cost = await generateItemCost(query);
  data.item_cost = item_cost;

  try {
    const createdCost = await createQuotationCost(quo_no, data);

    return res
      .status(201)
      .json({ message: 'Cost created for the quotation', createdCost });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Failed to create cost for the quotation' });
  }
};

//! Get cost
export const getCostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cost = await getCost(req.params.item_cost);

    if (!cost) {
      return res.status(404).json({
        status: 'not found',
        message: 'Cost with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data cost',
      data: cost,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get costs
export const getCostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const costs = await getCosts(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data cost',
      data: costs.data,
      pagination: costs.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update Cost
export const updateCostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item_cost = req.params.item_cost;
    const data = req.body;

    delete data.passwordConfirm;

    const cost = await getCost(item_cost);

    if (!cost) {
      return res.status(404).json({
        status: 'not found',
        message: 'cost with that Code not found',
      });
    }

    const updatedCost = await updateCost(item_cost, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data cost',
      data: updatedCost,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete cost by id
export const deleteCostHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item_cost = req.params.item_cost;

    const cost = await getCost(item_cost);

    if (!cost) {
      return res.status(404).json({
        status: 'not found',
        message: 'Cost with that Code not found',
      });
    }

    await deleteCost(item_cost);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data cost',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete cost
export const deleteCostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllCost();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data cost',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
