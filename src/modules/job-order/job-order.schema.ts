import { object, string, TypeOf, z } from 'zod';

export const createJobOrderSchema = object({
  body: object({
    jo_date: string({
      required_error: 'jo_date harus di isi!',
    }),
    quo_no: string({
      required_error: 'quo_no harus di isi',
    }),
    customer_code: string({
      required_error: 'customer_code harus di isi',
    }),
  }),
});

export const updateJobOrderSchema = object({
  body: object({
    shipper: string({
      required_error: 'shipper harus di isi!',
    }),
    consignee: string({
      required_error: 'consignee harus di isi!',
    }),
    qty: string({
      required_error: 'qty harus di isi!',
    }),
    hbl: string({
      required_error: 'hbl harus di isi!',
    }),
    mbl: string({
      required_error: 'mbl harus di isi!',
    }),
    etd: string({
      required_error: 'etd harus di isi!',
    }),
    eta: string({
      required_error: 'eta harus di isi!',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    gross_weight: string({
      required_error: 'gross_weight harus di isi',
    }),
    volume: string({
      required_error: 'volume harus di isi',
    }),
    name_of_goods: string({
      required_error: 'name_of_goods harus di isi',
    }),
  }),
});

export const createJOtoJOCSchema = object({
  body: object({
    shipper: string({
      required_error: 'shipper harus di isi',
    }),
    consignee: string({
      required_error: 'consignee harus di isi',
    }),
    qty: string({
      required_error: 'qty harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    gross_weight: string({
      required_error: 'gross_weight harus di isi',
    }),
    volume: string({
      required_error: 'volume harus di isi',
    }),
  }),
});

export type createJobOrderInput = TypeOf<typeof createJobOrderSchema>['body'];
export type createJOtoJOCInput = TypeOf<typeof createJOtoJOCSchema>['body'];
export type UpdateJobOrderInput = TypeOf<typeof updateJobOrderSchema>['body'];
