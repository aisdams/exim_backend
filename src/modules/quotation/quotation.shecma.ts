import { object, string, TypeOf, z } from 'zod';

//! Validasi create data quotation
export const createQuotationSchema = object({
  body: object({
    sales: string({
      required_error: 'sales harus di isi',
    }),
    subject: string({
      required_error: 'subject harus di isi',
    }),
    customer: string({
      required_error: 'customer harus di isi',
    }),
    attn: string({
      required_error: 'attn harus di isi',
    }),
    type: string({
      required_error: 'type harus di isi',
    }),
    delivery: string({
      required_error: 'delivery harus di isi',
    }),
    kurs: string({
      required_error: 'kurs harus di isi',
    }),
    loading: string({
      required_error: 'loading harus di isi',
    }),
    discharge: string({
      required_error: 'discharge harus di isi',
    }),
  }),
});

export const updateQuotationSchema = object({
  body: object({
    sales: string({
      required_error: 'sales harus di isi',
    }),
    subject: string({
      required_error: 'subject harus di isi',
    }),
    customer: string({
      required_error: 'customer harus di isi',
    }),
    attn: string({
      required_error: 'attn harus di isi',
    }),
    type: string({
      required_error: 'type harus di isi',
    }),
    delivery: string({
      required_error: 'delivery harus di isi',
    }),
    kurs: string({
      required_error: 'kurs harus di isi',
    }),
    loading: string({
      required_error: 'loading harus di isi',
    }),
    discharge: string({
      required_error: 'discharge harus di isi',
    }),
    item_cost: string({
      required_error: 'item_cost harus di isi',
    }),
  }),
});

export const updateStatusSchema = object({
  body: object({
    status: string({
      required_error: 'newStatus harus di isi',
    }),
  }),
});

export type createQuotationInput = TypeOf<typeof createQuotationSchema>['body'];
export type UpdateQuotationInput = TypeOf<typeof updateQuotationSchema>['body'];
export type UpdateStatusInput = TypeOf<typeof updateStatusSchema>['body'];
