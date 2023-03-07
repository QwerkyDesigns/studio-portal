require("dotenv").config({ path: ".env.development" });
const config = require("./../dev.config.js");
const { PrismaClient } = require("@prisma/client");
console.log(process.env.DATABASE_URL);
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});
const data = {
    userName: "dev-user",
    email: config.email,
    password: "12345",
    stripeCustomerId: "cus_NT3Q8CV9Ayl59L",
    usage: { create: { availableFunds: 2.0 } },
};

console.log("Generated Account data:", data);

prisma.account
    .create({ data })
    .then(() => {
        console.log("AccountData stored in the database.");
    })
    .catch((error) => {
        console.error("Failed to store usage data:", error);
    })
    .finally(() => {
        prisma.$disconnect();
    });
