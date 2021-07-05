const ingredientSchema = {
  name: "ingredient",
  title: "Ingredient",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Ingredient name",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "notes",
      title: "Notes",
      type: "text",
    },
  ],
};

export default ingredientSchema;
