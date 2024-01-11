// import eventData from "../../data/events.json" assert { type: "json" };

// const updateEventById = (id, updatedEvent) => {
//   const eventIndex = eventData.events.findIndex((event) => event.id === id);

//   if (eventIndex === -1) {
//     return null;
//   }

//   const {
//     title,
//     description,
//     location,
//     image,
//     startTime,
//     endTime,
//     createdBy,
//     categoryIds,
//   } = updatedEvent;

//   eventData.events[eventIndex] = {
//     ...eventData.events[eventIndex],
//     title: title || eventData.events[eventIndex].title,
//     description: description || eventData.events[eventIndex].description,
//     location: location || eventData.events[eventIndex].location,
//     image: image || eventData.events[eventIndex].image,
//     startTime: startTime || eventData.events[eventIndex].startTime,
//     endTime: endTime || eventData.events[eventIndex].endTime,
//     createdBy: createdBy || eventData.events[eventIndex].createdBy,
//     categoryIds: categoryIds || eventData.events[eventIndex].categoryIds,
//   };

//   return eventData.events[eventIndex];
// };

// export default updateEventById;

import { PrismaClient } from "@prisma/client";

const updateEventById = async (id, updatedEvent) => {
  const prisma = new PrismaClient();

  const { categoryIds, createdBy, ...rest } = updatedEvent;

  // Here we can't use updateMany() because we need to update the createdBy and categories fields if it is passed
  const event = await prisma.event.update({
    where: { id },
    data: {
      ...rest,
      createdBy: createdBy
        ? {
            connect: { id: createdBy },
          }
        : undefined,
      categories: categoryIds
        ? {
            set: categoryIds.map((id) => ({ id })),
          }
        : undefined,
    },
  });

  return event;
};

export default updateEventById;