import { object, string, TypeOf, z } from 'zod';

//! Validasi create data quotation
export const createJOCschema = object({
  body: object({
    no_mbl: string({
      required_error: 'no_mbl harus di isi',
    }),
    status: string({
      required_error: 'status harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    createdBy: string({
      required_error: 'createdBy harus di isi',
    }),
  }),
});
