import { object, string, TypeOf, z } from 'zod';

export const createCostSchema = object({
  body: object({
    item_name: string({
      required_error: 'item_name harus di isi!',
    }),
    qty: string({
      required_error: 'qty harus di isi!',
    }),
    price: string({
      required_error: 'price harus di isi!',
    }),
    note: string({
      required_error: 'note harus di isi',
    }),
  }),
});

export const updateCostSchema = object({
  body: object({
    item_name: string(),
    qty: string(),
    unit: string(),
    note: string({
      required_error: 'note harus di isi',
    }),
  }),
});

export const createCostQuoSchema = z.object({
  body: z.object({
    item_cost: z.string().nullish(),
    item_name: z.string(),
    qty: z.string(),
    unit: z.string(),
    price: z.string(),
    note: z.string(),
  }),
});

export type createCostInput = TypeOf<typeof createCostSchema>['body'];
export type createCostQuoInput = TypeOf<typeof createCostQuoSchema>['body'];
export type UpdateCostInput = TypeOf<typeof updateCostSchema>['body'];
