import 'dotenv/config'
import { PrismaClient } from "@/app/generated/prisma/client";

import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'


const connectionString = process.env.DATABASE_URL

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter });
async function main() {

    const demoUserId = "aaf50089-c8ff-46fb-8de4-08e7ff74b9d4";

    await prisma.product.createMany({
        data: Array.from({ length: 35 }).map((_, i) => ({
            userId: demoUserId,
            name: `Product: ${i + 1}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            quantity: Math.floor(Math.random() * 20),
            lowStockAt: 5,
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5))
        }))
    })

}



main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => await prisma.$disconnect())