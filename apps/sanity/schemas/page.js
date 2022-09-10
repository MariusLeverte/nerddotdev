export default {
  name: "page",
  type: "document",
  fields: [
    {
      name: "content",
      type: "array",
      of: [
        {
          name: "banner",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            { name: "text", type: "text" },
            { name: "image", type: "image" },
          ],
        },
      ],
    },
  ],
};
