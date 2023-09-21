import { JobOrder, Prisma, Quotation } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createJobOrderInput, UpdateJobOrderInput } from './job-order.schema';
import { ParsedQs } from 'qs';

//! Generate kode Job Order
export const generateJobOrderCode = async (query: ParsedQs) => {
  //* get last data
  const lastData = await prisma.jobOrder.findFirst({
    select: {
      jo_no: true,
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
    const id = parseInt(lastData.jo_no.slice(-7));
    id_u = id + 1;
  }

  const idString = id_u.toString().padStart(7, '0');
  const jo_no = `JO${idString}`;

  return jo_no;
};

//! Tambah data quotation
export async function createJobOrder(
  data: Prisma.JobOrderCreateInput
): Promise<JobOrder> {
  try {
    const jobOrder = await prisma.jobOrder.create({
      data,
    });
    return jobOrder;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Quotation: ${error.message}`);
    } else {
      throw new Error('Terjadi kesalahan saat membuat JobOrder.');
    }
  }
}

//! Get data jobOrder by id
export async function getJobOrder(jo_no: string) {
  return await prisma.jobOrder.findUnique({
    where: {
      jo_no,
    },
  });
}

//! Get all data jobOrder
export async function getJobOrders(query: any) {
  let where: any = {
    jo_no:
      (query.jo_no as string) != null ? (query.jo_no as string) : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.jobOrder.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.jobOrder.count({
    where,
  });

  const jobOrders = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return jobOrders;
}

//! Update data jobOrder by Primary Key
export async function updateJobOrder(jo_no: string, data: UpdateJobOrderInput) {
  return await prisma.jobOrder.update({
    where: {
      jo_no: jo_no,
    },
    data: data,
  });
}

//! Hapus data jobOrder by id
export async function deleteJobOrder(jo_no: string) {
  return await prisma.$transaction(async (tx) => {
    // await tx.outbound_detail.deleteMany({
    //   where: {
    //     outbound_code: outbound_code,
    //   },
    // });

    await tx.jobOrder.deleteMany({
      where: {
        jo_no: jo_no,
      },
    });
  });
}

//! Hapus all data jobOrder
export async function deleteAllJobOrder() {
  return await prisma.$transaction(async (tx) => {
    await tx.jobOrder.deleteMany();
  });
}
