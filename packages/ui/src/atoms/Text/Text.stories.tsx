import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Text";

export default {
  title: "Atoms/Text",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Hello world</Component>
);

export const Text = Template.bind({});
Text.args = {
  as: "p",
  size: "md",
  transform: "none",
  weight: "normal",
  color: "default",
};
