import { object, string, TypeOf, z } from 'zod';

//! Validasi create data Customer
export const createCustomerSchema = object({
  body: object({
    partner_name: string({
      required_error: 'partner_name harus di isi',
    }),
    unit: string({
      required_error: 'unit harus di isi',
    }),
  }),
});

export const updateCustomerSchema = object({
  body: object({
    partner_name: string({
      required_error: 'partner_name harus di isi',
    }),
    unit: string({
      required_error: 'unit harus di isi',
    }),
  }),
});

export type createCustomerInput = TypeOf<typeof createCustomerSchema>['body'];
export type UpdateCustomerInput = TypeOf<typeof updateCustomerSchema>['body'];
