const express = require('express');
const router = express.Router();
import { NextFunction, Request, Response, query } from 'express';
import * as path from 'path';
import {
  generateCustomerCode,
  createCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
  deleteAllCustomer,
  deleteCustomer,
} from './customer.service';

//! Tambah Customer
export const createCustomerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let data = {
      ...req.body,
    };

    const query = {};

    const customer_code = await generateCustomerCode(query);
    data.customer_code = customer_code;

    const customer = await createCustomer(data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses create data customer',
      data: customer,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get customer
export const getCustomerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer = await getCustomer(req.params.customer_code);

    if (!customer) {
      return res.status(404).json({
        status: 'not found',
        message: 'Customer with that Code not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data Customer',
      data: customer,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Get customer
export const getCustomersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const query = req.query;
    const customers = await getCustomers(query);

    res.status(200).json({
      status: 'success',
      message: 'Sukses get data customers',
      data: customers.data,
      pagination: customers.pagination,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Update customer
export const updateCustomerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_code = req.params.customer_code;
    const data = req.body;

    //* remove password confirmation
    delete data.passwordConfirm;

    const customer = await getCustomer(customer_code);

    if (!customer) {
      return res.status(404).json({
        status: 'not found',
        message: 'Quotation with that Code not found',
      });
    }

    const updatedCustomer = await updateCustomer(customer_code, data);

    res.status(200).json({
      status: 'success',
      message: 'Sukses update data customer',
      data: updatedCustomer,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete customer by id
export const deleteCustomerHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customer_code = req.params.customer_code;

    const customer = await getCustomer(customer_code);

    if (!customer) {
      return res.status(404).json({
        status: 'not found',
        message: 'Customer with that Code not found',
      });
    }

    await deleteCustomer(customer_code);

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data customer',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

//! Delete customer
export const deleteCustomersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteAllCustomer();

    res.status(200).json({
      status: 'success',
      message: 'Sukses delete data customer',
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};
