import { Port, Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createPortInput, UpdatePortInput } from './port.schema';
import { ParsedQs } from 'qs';

//! Generate kode Port
export const generatePortCode = async (query: ParsedQs) => {
  try {
    //* get last data
    const lastData = await prisma.port.findFirst({
      select: {
        port_code: true,
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
      const lastId = parseInt(lastData.port_code.slice(-4));
      id_u = lastId + 1;
    }

    const idString = id_u.toString().padStart(4, '0');
    const port_code = `PORT-${years}${idString}`;

    return port_code;
  } catch (error) {
    throw error;
  }
};

//! Create data Port
export async function createPort(data: Prisma.PortCreateInput): Promise<Port> {
  try {
    const port = await prisma.port.create({
      data,
    });
    return port;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Port: ${error.message}`);
    } else {
      throw new Error('Terjadi kesalahan saat membuat Port.');
    }
  }
}

//! Get data Poer by id
export async function getPort(port_code: string) {
  return await prisma.port.findUnique({
    where: {
      port_code,
    },
  });
}

//! Get all data Port
export async function getPorts(query: any) {
  let where: any = {
    port_code:
      (query.port_code as string) != null
        ? (query.port_code as string)
        : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.port.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.port.count({
    where,
  });

  const ports = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return ports;
}

//! Update data Port by Primary Key
export async function updatePort(port_code: string, data: UpdatePortInput) {
  return await prisma.port.update({
    where: {
      port_code: port_code,
    },
    data: data,
  });
}

//! Hapus data port by id
export async function deletePort(port_code: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.port.deleteMany({
      where: {
        port_code: port_code,
      },
    });
  });
}

//! Hapus all data port
export async function deleteAllPort() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.port.deleteMany();
  });
}
