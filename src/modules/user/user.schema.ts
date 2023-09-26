import { object, string, TypeOf, z } from 'zod';

enum RoleEnumType {
  ADMIN = 'admin',
  USER = 'user',
}

export const registerUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name harus di isi',
    }),
    email: string({
      required_error: 'Alamat email harus di isi',
    }).email('Email tidak valid'),
    password: string({
      required_error: 'Password harus di isi',
    })
      .min(8, 'Password harus lebih dari 8 karakter')
      .max(32, 'Password tidak boleh lebih dari 32 karakter'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords tidak sama',
  }),
});

export const registerSchema = object({
  body: object({
    name: string({
      required_error: 'Name harus di isi',
    }),
    email: string({
      required_error: 'Alamat email harus di isi',
    }).email('Email tidak valid'),
    password: string({
      required_error: 'Password harus di isi',
    })
      .min(8, 'Password harus lebih dari 8 karakter')
      .max(32, 'Password tidak boleh lebih dari 32 karakter'),
    password_confirmation: string({
      required_error: 'Please confirm your password',
    }),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  }).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Password tidak sama',
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email address harus di isi',
    }).email('Email tidak valid'),
    password: string({
      required_error: 'Password harus di isi',
    }).min(8, 'Email atau password salah'),
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email address harus di isi',
    }).email('Email tidak valid'),
    password: string({
      required_error: 'Password harus di isi',
    }).min(8, 'Email atau password salah'),
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string({}),
    email: string({}).email('Email tidak valid'),
    password: string({})
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({}),
    role: z.optional(z.nativeEnum(RoleEnumType)),
  })
    .partial()
    .refine((data) => data.password === data.passwordConfirm, {
      path: ['passwordConfirm'],
      message: 'Passwords do not match',
    }),
});

export const resetPasswordSchema = object({
  params: object({
    resetToken: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password harus di isi',
    }).min(8, 'Password must be more than 8 characters'),
    passwordConfirm: string({
      required_error: 'Please confirm your password',
    }),
  }).refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords do not match',
    path: ['passwordConfirm'],
  }),
});

export type RegisterUserInput = Omit<
  TypeOf<typeof registerUserSchema>['body'],
  'passwordConfirm'
>;

export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
