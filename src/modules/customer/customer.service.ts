import { Customer, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createCustomerInput, UpdateCustomerInput } from './customer.schema';
import { ParsedQs } from 'qs';

//! Generate kode customer code
export const generateCustomerCode = async (query: ParsedQs) => {
  //* get last data
  const lastData = await prisma.customer.findFirst({
    select: {
      customer_code: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  //* generate code
  let id_u = 1;

  if (lastData !== null) {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const lastYearInData = lastData.customer_code.slice(3, 5);

    if (currentYear === lastYearInData) {
      const id = parseInt(lastData.customer_code.slice(-5)) + 1;
      id_u = id;
    }
  }

  const idString = id_u.toString().padStart(5, '0');
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const customer_code = `CTM-${currentYear}${idString}`;

  return customer_code;
};

//! Tambah dat
export async function createCustomer(
  data: Prisma.CustomerCreateInput
): Promise<Customer> {
  try {
    const customer = await prisma.customer.create({
      data,
    });
    return customer;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Customer: ${error.message}`);
    } else {
      throw new Error('Terjadi kesalahan saat membuat Customer.');
    }
  }
}

//! Get dat by id
export async function getCustomer(customer_code: string) {
  return await prisma.customer.findUnique({
    where: {
      customer_code,
    },
  });
}

//! Get all dat
export async function getCustomers(query: any) {
  let where: any = {
    customer_code:
      (query.customer_code as string) != null
        ? (query.customer_code as string)
        : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.customer.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.customer.count({
    where,
  });

  const customers = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return customers;
}

//! Update data customer by Primary Key
export async function updateCustomer(
  customer_code: string,
  data: UpdateCustomerInput
) {
  return await prisma.customer.update({
    where: {
      customer_code: customer_code,
    },
    data: data,
  });
}

//! Hapus dat by id
export async function deleteCustomer(customer_code: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.customer.deleteMany({
      where: {
        customer_code: customer_code,
      },
    });
  });
}

//! Hapus all dat
export async function deleteAllCustomer() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.customer.deleteMany();
  });
}
