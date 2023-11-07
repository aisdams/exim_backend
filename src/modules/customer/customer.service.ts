import { Customer, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createCustomerInput, UpdateCustomerInput } from './customer.schema';
import { ParsedQs } from 'qs';

//! Generate kode customer code
//! Generate kode Port
export const generateCustomerCode = async (query: ParsedQs) => {
  try {
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
    const years = 23;

    if (lastData !== null) {
      const lastId = parseInt(lastData.customer_code.slice(-4));
      id_u = lastId + 1;
    }

    const idString = id_u.toString().padStart(4, '0');
    const customer_code = `CTM-${years}${idString}`;

    return customer_code;
  } catch (error) {
    throw error;
  }
};

//! Create data
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
