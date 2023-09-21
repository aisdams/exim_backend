const express = require('express');
const router = express.Router();
const createQuotation = async (req: Request, res: Request) => {};
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
} from './cost.service';

//! Tambah outbound
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

//! Get quotation
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

//! Get outbounds
export const getCostsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const quotations = await getCosts(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data cost',
      data: quotations.data,
      pagination: quotations.pagination,
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

    //* remove password confirmation
    delete data.passwordConfirm;

    const quotation = await getCost(item_cost);

    if (!quotation) {
      return res.status(404).json({
        status: 'not found',
        message: 'cost with that Code not found',
      });
    }

    const updatedQuotation = await updateCost(item_cost, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data cost',
      data: updatedQuotation,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete quotation by id
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
