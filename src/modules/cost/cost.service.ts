import { Prisma, Cost } from '@prisma/client';
import prisma from '../../utils/prisma';
import { createCostInput, UpdateCostInput } from './cost.schema';
import { ParsedQs } from 'qs';

//! Generate kode Cost
export const generateItemCost = async (query: ParsedQs) => {
  try {
    //* get last data
    const lastData = await prisma.cost.findFirst({
      select: {
        item_cost: true,
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
      const lastId = parseInt(lastData.item_cost.split('-')[1]);
      id_u = lastId + 1;
    }

    const idString = id_u.toString().padStart(5, '0');
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const item_cost = `COST-${currentYear}${idString}`;

    return item_cost;
  } catch (error) {
    throw error;
  }
};

//! Tambah data cost
export async function createCost(data: Prisma.CostCreateInput): Promise<Cost> {
  try {
    const cost = await prisma.cost.create({
      data,
    });
    return cost;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Gagal membuat Cost: ${error.message}`);
    } else {
      throw new Error('Terjadi kesalahan saat membuat Cost.');
    }
  }
}

//! Get data cost by id
export async function getCost(item_cost: string) {
  return await prisma.cost.findUnique({
    where: {
      item_cost,
    },
  });
}

//! Get all data cost
export async function getCosts(query: any) {
  let where: any = {
    item_cost:
      (query.item_cost as string) != null
        ? (query.item_cost as string)
        : undefined,
  };

  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const offset = page * limit - limit;

  const data = await prisma.cost.findMany({
    where,
    skip: offset,
    take: limit,
  });

  const pagination = await prisma.cost.count({
    where,
  });

  const costs = {
    data,
    pagination: {
      total_page: Math.ceil(pagination / limit),
      total: pagination,
      current_page: page,
    },
  };

  return costs;
}

//! Update data cost by Primary Key
export async function updateCost(item_cost: string, data: UpdateCostInput) {
  return await prisma.cost.update({
    where: {
      item_cost: item_cost,
    },
    data: data,
  });
}

//! Hapus data cost by id
export async function deleteCost(item_cost: string) {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.cost.deleteMany({
      where: {
        item_cost: item_cost,
      },
    });
  });
}

//! Hapus all data cost
export async function deleteAllCost() {
  //* Start transaction
  return await prisma.$transaction(async (tx) => {
    await tx.cost.deleteMany();
  });
}
