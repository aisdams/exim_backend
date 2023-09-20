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
    status: string({
      required_error: 'status harus di isi',
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
    status: string({
      required_error: 'status harus di isi',
    }),
  }),
});

export type createQuotationInput = TypeOf<typeof createQuotationSchema>['body'];
export type UpdateQuotationInput = TypeOf<typeof updateQuotationSchema>['body'];
