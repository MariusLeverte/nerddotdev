import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Container";

export default {
  title: "Atoms/Container",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args}>Hello world</Component>
);

export const Container = Template.bind({});
Container.args = {
  padding: true,
  width: "lg",
};
