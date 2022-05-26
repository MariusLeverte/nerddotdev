export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "intro",
      type: "string",
    },
    {
      name: "about",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      type: "object",
      fields: [
        { name: "photoImage", type: "image" },
        { name: "photoURL", type: "string" },
      ],
    },
    {
      name: "social",
      type: "object",
      fields: [
        { name: "github", type: "string" },
        { name: "linkedin", type: "string" },
      ],
    },
    {
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "reference", to: { type: "skill" } }],
    },
    {
      name: "repos",
      title: "Repos",
      type: "array",
      of: [
        {
          name: "repo",
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "html_url",
              type: "url",
            },
            {
              name: "description",
              type: "text",
            },
            { name: "homepage", type: "url" },
            { name: "language", type: "string" },
          ],
        },
      ],
    },
  ],
};
