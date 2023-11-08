import { Prisma, Quotation, StatusCheck } from '@prisma/client';
import prisma from '../../utils/prisma';
import {
  createQuotationInput,
  UpdateQuotationInput,
  UpdateStatusInput,
} from './quotation.shecma';
import { ParsedQs } from 'qs';
import { HttpException } from '../../exceptions';
import { Request } from 'express';

//! Generate kode Quotation No
export const generateQuotationCode = async (query: ParsedQs) => {
  try {
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
    const years = 23;

    if (lastData !== null) {
      const lastId = parseInt(lastData.quo_no.slice(-4));
      id_u = lastId + 1;
    }

    const idString = id_u.toString().padStart(4, '0');
    const quo_no = `QUO-${years}${idString}`;

    return quo_no;
  } catch (error) {
    throw error;
  }
};

// Duplicate Data Quotation
export const copyQuotationData = async (quo_no: string): Promise<any> => {
  try {
    const quotationToCopy = await getQuotation(quo_no);

    if (!quotationToCopy) {
      return {
        success: false,
        error: 'Quotation with that Code not found',
      };
    }

    const copiedQuotationData: Prisma.QuotationCreateInput = {
      quo_no: await generateQuotationCode({}),
      sales: quotationToCopy.sales,
      customer: quotationToCopy.customer,
      subject: quotationToCopy.subject,
      attn: quotationToCopy.attn,
      type: quotationToCopy.type,
      delivery: quotationToCopy.delivery,
      kurs: quotationToCopy.kurs,
      loading: quotationToCopy.loading,
      discharge: quotationToCopy.discharge,
    };

    const createdQuotation = await createQuotationn(copiedQuotationData);

    console.log('API Response:', createdQuotation);

    return {
      success: true,
      data: createdQuotation,
    };
  } catch (error) {
    console.error('Error copying data:', error);
    return {
      success: false,
      error: 'Failed to copy Quotation data',
    };
  }
};

//! Create data quotation
export async function createQuotationn(
  data: Prisma.QuotationCreateInput
): Promise<Quotation> {
  try {
    const quotation = await prisma.quotation.create({
      data,
    });
    return quotation;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Quotation: ${error.message}`);
    } else {
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
    include: {
      cost: true,
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

//! Update data quotation by Primary Key
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
// Update Status
export async function updateQuotationStatus(
  quo_no: string,
  data: UpdateStatusInput
) {
  if (
    data.status !== StatusCheck.Executed &&
    data.status !== StatusCheck.InProgress &&
    data.status !== StatusCheck.Cancel
  ) {
    throw new Error('Invalid status value');
  }

  return await prisma.quotation.update({
    where: {
      quo_no: quo_no,
    },
    data: {
      status: data.status,
    },
  });
}

//! Hapus data quotation by id
export async function deleteQuotation(quo_no: string) {
  //  Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.quotation.deleteMany({
      where: {
        quo_no: quo_no,
      },
    });
  });
}

//! Hapus all data quotation
export async function deleteAllQuotation() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.quotation.deleteMany();
  });
}
