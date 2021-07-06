const recipeSchema = {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Recipe name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "chef",
      title: "Chef",
      type: "reference",
      to: {
        type: "chef",
      },
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },

    {
      name: "ingredient",
      title: "Ingredient",
      type: "array",
      of: [
        {
          // object type is similar to document type, except that document type has additional data like revision, createdDay, etc.
          type: "object",
          fields: [
            {
              name: "ingredient",
              title: "Ingredient",
              type: "reference",
              to: [
                {
                  type: "ingredient",
                },
              ],
            },
            { name: "wholeNumber", title: "Whole number", type: "number" },
            {
              name: "fraction",
              title: "Fraction",
              type: "string",
              options: {
                list: ["1/2", "1/3", "1/4", "2/3", "3/4"],
              },
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                list: ["grams", "cup", "Tbsp.", "tsp."],
              },
            },
          ],
          preview: {
            select: {
              title: "ingredient.name",
              name: "ingredient.name",
              media: "ingredient.image",
              wholeNumber: "wholeNumber",
              fraction: "fraction",
              unit: "unit",
            },
            prepare({
              title,
              subtitle,
              media,
              wholeNumber = "(No whole number)",
              fraction = "(No fraction set)",
              unit = "(No unit set)",
            }) {
              return {
                title,
                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                media,
              };
            },
          },
        },
      ],
    },
    {
      name: "instruction",
      title: "Instruction",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
    },
  ],
  initialValue: {
    likes: 0,
  },
};

export default recipeSchema;
