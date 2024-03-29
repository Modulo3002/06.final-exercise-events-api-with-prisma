import { PrismaClient } from "@prisma/client";

import categoryData from "../src/data/categories.json" assert { type: "json" };
import eventsData from "../src/data/events.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { categories } = categoryData;
  const { events } = eventsData;
  const { users } = userData;

  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {},
      create: category,
    });
  }

  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        description: event.description,
        image: event.image,
        location: event.location,
        startTime: event.startTime,
        endTime: event.endTime,
        createdBy: { connect: { id: event.createdBy } },
        categories: {
          connect: event.categoryIds.map((categoryId) => ({ id: categoryId })),
        }
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
