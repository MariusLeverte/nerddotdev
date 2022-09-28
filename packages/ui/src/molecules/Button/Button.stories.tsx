import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./";

export default {
  title: "Molecules/Button",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Hello world</Component>
);

export const Button = Template.bind({});
Button.args = {
  size: "md",
  color: "primary",
  rounded: "lg",
  bordered: false,
  shadow: false,
};
