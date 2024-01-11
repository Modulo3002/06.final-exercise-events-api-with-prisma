// import eventData from "../../data/events.json" assert { type: "json" };

// const getEvents = (title, location) => {
//   return eventData.events.filter((event) => {
//     return (
//       (!title || event.title === title) &&
//       (!location || event.location === location)
//     );
//   });
// };

// export default getEvents;

import { PrismaClient } from "@prisma/client";

const getEvents = async (title, location) => {
  const prisma = new PrismaClient();
  const events = await prisma.event.findMany({
    // where: {
    //   title: {
    //     contains: title,
    //   },
    //   location: {
    //     contains: location,
    //   },
    // },
    where:{
      title,
      location
    }
  });

  return events;
};

export default getEvents;