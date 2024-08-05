import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashing = 10

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'urban@gmail.com' },
        update: {},
        create: {
            email: 'urban@gmail.com',
            password: await bcrypt.hash('Geslo123!', roundsOfHashing),
            first_name: 'Urban',
            last_name: 'Prosenjak'
        },

    })

    console.log({ user1 });

}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})