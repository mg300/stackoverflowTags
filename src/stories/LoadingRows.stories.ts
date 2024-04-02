import type { Meta, StoryObj } from "@storybook/react";
import TableLoadingRows from "../Table/TableLoadingRows";

const meta: Meta<typeof TableLoadingRows> = {
  title: "Components/TableLoadingRows",
  component: TableLoadingRows,
  args: {
    rowsNum: 10,
  },
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const TableLoading: Story = {};
