const share = {
  name: "share",
  type: "document",
  fields: [
    {
      name: "content",
      type: "object",
      fields: [
        {
          name: "text",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "url",
          type: "url",
        },
      ],
    },
    {
      name: "skills",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "skill" }, { type: "skillCategory" }],
        },
      ],
    },
    {
      name: "category",
      type: "array",
      of: [{ type: "reference", to: { type: "shareCategory" } }],
    },
    {
      name: "user",
      type: "reference",
      to: { type: "user" },
    },
    {
      name: "data",
      type: "text",
    },
    {
      name: "opengraph",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text" },
        { name: "image", type: "string" },
        { name: "url", type: "string" },
      ],
    },
  ],
};

export default share;
