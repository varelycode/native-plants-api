import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresService {
  stringifyData(plants: Object): string {
    return JSON.stringify(plants, (key, value) =>
      typeof value === 'bigint' ? value.toString() + 'n' : value
    );
  }

  async getPlantsByState(state: string): Promise<string> {
    return await prisma.usdaplants
      .findMany({
        where: {
          State: {
            contains: state,
          },
          NativeStatus: {
            contains: `${state} (N)`,
          },
        },
      })
      .then((res) => this.stringifyData(res));
  }
  async getPlantsByCommonName(name: string): Promise<string> {
    return await prisma.usdaplants
      .findMany({
        where: {
          CommonName: name,
        },
      })
      .then((res) => this.stringifyData(res));
  }
}
