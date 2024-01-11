// import eventData from "../../data/events.json" assert { type: "json" };

// const deleteEventById = (id) => {
//   const eventIndex = eventData.events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return null;
//   }

//   const deletedevent = eventData.events.splice(eventIndex, 1);

//   return deletedevent;
// };

// export default deleteEventById;

import { PrismaClient } from "@prisma/client";

const deleteEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.deleteMany({
    where: { id },
  });

  return event.count > 0 ? id : null;
};

export default deleteEventById;
