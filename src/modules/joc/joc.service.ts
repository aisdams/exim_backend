import { JOC, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createJOCInput, UpdateJOCInput } from './joc.schema';
import { ParsedQs } from 'qs';

//! Generate kode JOC
export const generateJOCCode = async (query: ParsedQs) => {
  try {
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
    const years = 23;

    if (lastData !== null) {
      const lastId = parseInt(lastData.joc_no.slice(-4));
      id_u = lastId + 1;
    }

    const idString = id_u.toString().padStart(4, '0');
    const joc_no = `JOC-${years}${idString}`;

    return joc_no;
  } catch (error) {
    throw error;
  }
};

export async function createJOC(data: createJOCInput) {
  return await prisma.jOC.create({
    data,
  });
}
//! Get data JOC by id
export async function getJOC(joc_no: string) {
  return await prisma.jOC.findUnique({
    where: {
      joc_no,
    },
    include: {
      joborder: true,
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
  const limit = Number(query.limit) || 15;
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
