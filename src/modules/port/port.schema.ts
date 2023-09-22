import { object, string, TypeOf, z } from 'zod';

export const createPortSchema = object({
  body: object({
    port_name: string({
      required_error: 'port_name harus di isi',
    }),
    caption: string({
      required_error: 'port_name harus di isi',
    }),
  }),
});

export const updatePortSchema = object({
  body: object({
    port_name: string({
      required_error: 'port_name harus di isi',
    }),
    caption: string({
      required_error: 'port_name harus di isi',
    }),
  }),
});

export type createPortInput = TypeOf<typeof createPortSchema>['body'];
export type UpdatePortInput = TypeOf<typeof updatePortSchema>['body'];
