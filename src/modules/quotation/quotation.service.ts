import { Prisma, Quotation } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createQuotationInput, UpdateQuotationInput } from './quotation.shecma';
import { ParsedQs } from 'qs';

//! Generate kode outbound delivery
export const generateQuotationCode = async (query: ParsedQs) => {
  //* get last data
  const lastData = await prisma.quotation.findFirst({
    select: {
      quo_no: true,
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
    const id = parseInt(lastData.quo_no.slice(-7));
    id_u = id + 1;
  }

  const idString = id_u.toString().padStart(7, '0');
  const quo_no = `QUO${idString}`;

  return quo_no;
};

//! Tambah data quotation
export async function createQuotationn(
  data: Prisma.QuotationCreateInput // Menggunakan tipe yang sesuai dengan Prisma
): Promise<Quotation> {
  try {
    const quotation = await prisma.quotation.create({
      data,
    });
    return quotation;
  } catch (error) {
    // Periksa jika tipe error adalah Error
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Quotation: ${error.message}`);
    } else {
      // Jika tipe error bukan Error, tangani sesuai kebutuhan Anda
      throw new Error('Terjadi kesalahan saat membuat Quotation.');
    }
  }
}

//! Get data quotation by id
export async function getQuotation(quo_no: string) {
  return await prisma.quotation.findUnique({
    where: {
      quo_no,
    },
  });
}

//! Get all data quotation
export async function getQuotations(query: any) {
  let where: any = {
    quo_no:
      (query.quo_no as string) != null ? (query.quo_no as string) : undefined,
    status:
      query.status != null && !Array.isArray(query.status)
        ? query.status.toUpperCase()
        : undefined,
    title:
      (query.title as string) != null ? (query.title as string) : undefined,
  };

  if (Array.isArray(query.status)) {
    const OR = query.status.map((s: string) => ({ status: s.toUpperCase() }));

    where = {
      ...where,
      OR,
    };
  }

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.quotation.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.quotation.count({
    where,
  });

  const quotations = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return quotations;
}

//! Update data outbound by Primary Key
export async function updateQuotation(
  quo_no: string,
  data: UpdateQuotationInput
) {
  return await prisma.quotation.update({
    where: {
      quo_no: quo_no,
    },
    data: data,
  });
}

//! Hapus data outbound by id
export async function deleteQuotation(quo_no: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    // await tx.outbound_detail.deleteMany({
    //   where: {
    //     outbound_code: outbound_code,
    //   },
    // });

    await tx.quotation.deleteMany({
      where: {
        quo_no: quo_no,
      },
    });
  });
}

//! Hapus all data outbound
export async function deleteAllQuotation() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.quotation.deleteMany();
  });
}
