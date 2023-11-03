import { object, string, TypeOf, z } from 'zod';

export const CostInput = z.object({
  item_name: z.string(),
  qty: z.string(),
  unit: z.string(),
  mata_uang: z.string(),
  price: z.string(),
  note: z.string().nullable(),
});

//! Validasi create data quotation
export const createQuotationSchema = z.object({
  body: z.object({
    sales: z.string(),
    subject: z.string(),
    customer: z.string(),
    attn: z.string(),
    type: z.string(),
    delivery: z.string(),
    kurs: z.string(),
    loading: z.string(),
    discharge: z.string(),
    customer_code: z.string(),
  }),
});

export const updateQuotationSchema = z.object({
  body: z.object({
    sales: z.string(),
    subject: z.string(),
    customer: z.string(),
    attn: z.string(),
    type: z.string(),
    delivery: z.string(),
    kurs: z.string(),
    loading: z.string(),
    discharge: z.string(),
    valheader: z.string(),
    valfooter: z.string(),
    item_cost: z.array(z.string()),
    cost: z.string().nullish(),
  }),
});

export const updateStatusSchema = z.object({
  body: z.object({
    status: z.string(),
  }),
});

export type createQuotationInput = z.infer<
  typeof createQuotationSchema
>['body'];
export type UpdateQuotationInput = z.infer<
  typeof updateQuotationSchema
>['body'];
export type UpdateStatusInput = TypeOf<typeof updateStatusSchema>['body'];
