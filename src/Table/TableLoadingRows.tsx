import { Skeleton, TableCell, TableRow } from "@mui/material";

function TableLoadingRows({ rowsNum }: { rowsNum: number }) {
  return (
    <>
      {[...Array(rowsNum)].map((row, index) => (
        <TableRow key={index}>
          <TableCell style={{ minWidth: "10rem" }} component="th" scope="row">
            <Skeleton animation="wave" variant="text" />
          </TableCell>
          <TableCell style={{ minWidth: "10rem" }}>
            <Skeleton animation="wave" variant="text" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default TableLoadingRows;
