export default {
  name: "share",
  type: "document",
  fields: [
    {
      name: "content",
      type: "object",
      fields: [
        {
          name: "url",
          type: "url",
        },
        {
          name: "type",
          type: "string",
          options: {
            list: [
              { title: "Article", value: "article" },
              { title: "TikTok", value: "tiktok" },
            ],
          },
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
  ],
};
