import { object, string, TypeOf, z } from 'zod';

export const createCostSchema = object({
  body: object({
    item_name: string({
      required_error: 'item_name harus di isi!',
    }),
    qty: string({
      required_error: 'qty harus di isi!',
    }),
    unit: string({
      required_error: 'unit harus di isi!',
    }),
    mata_uang: string({
      required_error: 'mata_uang harus di isi!',
    }),
    amount: string({
      required_error: 'amount harus di isi!',
    }),
    note: string({
      required_error: 'note harus di isi',
    }),
  }),
});

export const updateCostSchema = object({
  body: object({
    item_name: string({
      required_error: 'item_name harus di isi!',
    }),
    qty: string({
      required_error: 'qty harus di isi!',
    }),
    unit: string({
      required_error: 'unit harus di isi!',
    }),
    mata_uang: string({
      required_error: 'mata_uang harus di isi!',
    }),
    amount: string({
      required_error: 'amount harus di isi!',
    }),
    note: string({
      required_error: 'note harus di isi',
    }),
  }),
});

export type createCostInput = TypeOf<typeof createCostSchema>['body'];
export type UpdateCostInput = TypeOf<typeof updateCostSchema>['body'];
