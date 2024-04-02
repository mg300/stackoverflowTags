import type { Meta, StoryObj } from "@storybook/react";
import TableComponent from "../Table/TableComponent";

const meta: Meta<typeof TableComponent> = {
  title: "Components/TableComponent",
  component: TableComponent,
  args: {},
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TableHead: Story = {};
