import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Grid";

export default {
  title: "Atoms/Grid",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = ({ gap, ...args }) => (
  <Component.Container gap={gap}>
    {[...new Array(12)].map((_, i) => (
      <Component key={i} {...args}>
        <div className="bg-slate-300 p-6 text-center">{i}</div>
      </Component>
    ))}
  </Component.Container>
);

export const Grid = Template.bind({});

Grid.args = {
  gap: 1,
  span: "auto",
};
