export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "name",
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
      name: "photo",
      type: "object",
      fields: [{ name: "photoImage", type: "image" }],
    },
    {
      name: "previewColor",
      type: "colorPicker",
    },
    {
      name: "about",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "developers",
      type: "array",
      of: [
        {
          name: "developer",
          type: "object",
          fields: [
            { name: "role", type: "reference", to: { type: "projectRole" } },
            { name: "user", type: "reference", to: { type: "user" } },
          ],
        },
      ],
    },
  ],
};
