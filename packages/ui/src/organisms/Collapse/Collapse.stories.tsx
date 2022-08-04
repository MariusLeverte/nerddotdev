import { ComponentStory, ComponentMeta } from "@storybook/react";
import Container from "../../atoms/Container/Container";
import Component from "./Collapse";

export default {
  title: "Organisms/Collapse",
  component: Component,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Container>
    <Component {...args}>Hello world</Component>
  </Container>
);

export const Collapse = Template.bind({});
Collapse.args = {
  title: "Hei verden",
};
