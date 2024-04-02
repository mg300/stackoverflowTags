import type { Meta, StoryObj } from "@storybook/react";
import TableErrorRow from "../Table/TableErrorRow";

const meta: Meta<typeof TableErrorRow> = {
  title: "Components/TableErrorRow",
  component: TableErrorRow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ErrorRow: Story = {
  args: {
    children: "Błąd podczas ładowania danych",
  },
};
