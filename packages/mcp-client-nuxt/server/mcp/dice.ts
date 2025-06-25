import { z } from "zod";

const getDiceRoll = (sides: number) => {
  const roll = Math.floor(Math.random() * sides) + 1;
  console.log({ roll });
  return roll;
};

export const diceToolConfig = {
  name: "getDiceRoll",
  description:
    "Roll a dice with a specified number of sides and return the result.",
  inputSchema: {
    sides: z.number().min(1).describe("Number of sides on the die"),
  },
  handler: ({ sides }: { sides: number }) => {
    const roll = getDiceRoll(sides);
    return {
      content: [
        {
          type: "text" as const,
          text: roll.toString(),
        },
      ],
    };
  },
};
