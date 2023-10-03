import { object, string, TypeOf, z } from 'zod';

//! Validasi create data quotation
export const createJOCSchema = object({
  body: object({
    no_mbl: string({
      required_error: 'no_mbl harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    no_container: string({
      required_error: 'no_container harus di isi',
    }),
    general_purposeL: string({
      required_error: 'general_purpose harus disi',
    }),
    loading: string({
      required_error: 'loading harus di isi',
    }),
    discharge: string({
      required_error: 'discharge harus di isi',
    }),
    createdBy: string({
      required_error: 'createdBy harus di isi',
    }),
    etd: string({
      required_error: 'setd harus di isi',
    }),
    eta: string({
      required_error: 'setd harus di isi',
    }),
  }),
});

export const updateJOCSchema = object({
  body: object({
    no_mbl: string({
      required_error: 'no_mbl harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    createdBy: string({
      required_error: 'createdBy harus di isi',
    }),
  }),
});

export type createJOCInput = TypeOf<typeof createJOCSchema>['body'];
export type UpdateJOCInput = TypeOf<typeof updateJOCSchema>['body'];
