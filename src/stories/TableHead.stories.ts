import type { Meta, StoryObj } from "@storybook/react";
import { TableHeadComponent } from "../Table/TableHeadComponent";
import { fn } from "@storybook/test";

const meta: Meta<typeof TableHeadComponent> = {
  title: "Components/TableHeadComponent",
  component: TableHeadComponent,
  args: {
    onRequestSort: fn(),
  },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TableHead: Story = {
  args: {
    order: "asc",
    orderBy: "name",
  },
};
