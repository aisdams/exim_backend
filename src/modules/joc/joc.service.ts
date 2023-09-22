import { JOC, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createJOCInput, UpdateJOCInput } from './joc.schema';
import { ParsedQs } from 'qs';

//! Generate kode JOC
export const generateJOCCode = async (query: ParsedQs) => {
  //* get last data
  const lastData = await prisma.jOC.findFirst({
    select: {
      joc_no: true,
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
    const id = parseInt(lastData.joc_no.slice(-7));
    id_u = id + 1;
  }

  const idString = id_u.toString().padStart(7, '0');
  const joc_no = `JO${idString}`;

  return joc_no;
};

//! Tambah data JOC
export async function createJOC(data: Prisma.JOCCreateInput): Promise<JOC> {
  try {
    const JOC = await prisma.jOC.create({
      data,
    });
    return JOC;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat JOC: ${error.message}`);
    } else {
      throw new Error('Terjadi kesalahan saat membuat JOC.');
    }
  }
}

//! Get data JOC by id
export async function getJOC(joc_no: string) {
  return await prisma.jOC.findUnique({
    where: {
      joc_no,
    },
  });
}

//! Get all data JOC
export async function getJOCS(query: any) {
  let where: any = {
    joc_no:
      (query.joc_no as string) != null ? (query.joc_no as string) : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.jOC.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.jOC.count({
    where,
  });

  const JOCs = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return JOCs;
}

//! Update data JOC by Primary Key
export async function updateJOC(joc_no: string, data: UpdateJOCInput) {
  return await prisma.jOC.update({
    where: {
      joc_no: joc_no,
    },
    data: data,
  });
}

//! Hapus data JOC by id
export async function deleteJOC(joc_no: string) {
  return await prisma.$transaction(async (tx) => {
    await tx.jOC.deleteMany({
      where: {
        joc_no: joc_no,
      },
    });
  });
}

//! Hapus all data JOC
export async function deleteAllJOC() {
  return await prisma.$transaction(async (tx) => {
    await tx.jOC.deleteMany();
  });
}
