import { Node } from "slate";
import { User } from "../../types/schema";
import { generateKey } from "../../utils/key";

const slateMarks = (marks: string[]) => {
  let slate = {};
  for (const mark of marks) {
    if (mark === "strong") slate.bold = true;
    if (mark === "underline") slate.underline = true;
    if (mark === "em") slate.italic = true;
  }

  return slate;
};

export function toSlate(nodes: User["about"]) {
  return nodes?.map((node) => {
    let block = {
      _type: "_block",
      style: node.style,
      _key: node._key,
    };
    if (node.listItem === "number") {
      block.type = "numbered-list";
    }
    if (node.listItem === "bullet") {
      block.type = "bulleted-list";
    }
    if (["h1", "h2"].includes(block.style)) {
      block.type = block.style;
    }

    block.children = node.children?.map((c) => ({
      ...c,
      ...slateMarks(c.marks),
    }));

    return block;
  });
}

export function toPortableText(nodes) {
  return nodes
    .map((node) => ({
      _type: "block",
      _key: node?._key || generateKey(8),
      markDefs: [],
      ...(node.type === "block-quote" && { style: "blockquote" }),
      ...(node.type === "numbered-list" && { listItem: "number" }),
      ...(node.type === "bulleted-list" && { listItem: "bullet" }),
      style: node.type || null,
      children: node.children.map((span) => ({
        _type: "span",
        _key: span?._key || generateKey(8),
        text: Node.string(span),
        marks: findMark(span),
      })),
    }))
    .filter(Boolean);
}

function findMark(span) {
  let marks = [];
  if (span.bold) {
    marks.push("strong");
  }
  if (span.code) {
    marks.push("code");
  }
  if (span.italic) {
    marks.push("em");
  }
  return marks;
}
