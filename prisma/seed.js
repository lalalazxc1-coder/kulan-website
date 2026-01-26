const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@adkulan.kz';
    const password = 'admin'; // Change this in production!

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (!existingUser) {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: 'Super Admin',
                role: 'admin',
            },
        });
        console.log(`Created admin user: ${user.email}`);
    } else {
        // Optional: update password if needed
        // await prisma.user.update({ where: { email }, data: { password: hashedPassword } });
        console.log(`Admin user already exists: ${existingUser.email}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
