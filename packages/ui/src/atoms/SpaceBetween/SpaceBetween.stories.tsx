import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./SpaceBetween";

export default {
  title: "Atoms/SpaceBetween",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>
    {[...new Array(12)].map((_, i) => (
      <div key={i} className="bg-slate-300 p-6 text-center">
        {i}
      </div>
    ))}
  </Component>
);

export const SpaceBetween = Template.bind({});
SpaceBetween.args = {};
