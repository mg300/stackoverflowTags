import type { Meta, StoryObj } from "@storybook/react";
import { TableToolbarComponent } from "../Table/TableToolbarComponent";

const meta: Meta<typeof TableToolbarComponent> = {
  title: "Components/TableToolbarComponent",
  component: TableToolbarComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorRow: Story = {
  args: {},
};
