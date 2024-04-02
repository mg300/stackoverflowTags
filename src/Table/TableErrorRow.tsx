import { TableCell, TableRow, Typography } from "@mui/material";

function TableErrorRow({ children }: { children: string }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography style={{ color: "red" }}>{children}</Typography>
      </TableCell>
    </TableRow>
  );
}

export default TableErrorRow;
