import { object, string, TypeOf, z } from 'zod';

//! Validasi create data quotation
export const createJOCSchema = object({
  body: object({
    no_mbl: string({
      required_error: 'no_mbl harus di isi',
    }),
    type: string({
      required_error: 'type harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    agent: string({
      required_error: 'agent harus di isi',
    }),
    no_container: string({
      required_error: 'no_container harus di isi',
    }),
    loading: string({
      required_error: 'loading harus di isi',
    }),
    discharge: string({
      required_error: 'discharge harus di isi',
    }),
    etd: string({
      required_error: 'etd harus di isi',
    }),
    eta: string({
      required_error: 'eta harus di isi',
    }),
  }),
});

export const updateJOCSchema = object({
  body: object({
    type: string({
      required_error: 'type harus di isi',
    }),
    vessel: string({
      required_error: 'vessel harus di isi',
    }),
    loading: string({
      required_error: 'loading harus di isi',
    }),
    discharge: string({
      required_error: 'discharge harus di isi',
    }),
    no_container: string({
      required_error: 'no_container harus di isi',
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

export type createJOCInput = TypeOf<typeof createJOCSchema>['body'];
export type UpdateJOCInput = TypeOf<typeof updateJOCSchema>['body'];
export type UpdateStatusInput = TypeOf<typeof updateStatusSchema>['body'];
