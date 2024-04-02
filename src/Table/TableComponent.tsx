/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import React, { useEffect } from "react";
import { TableToolbarComponent } from "./TableToolbarComponent";
import { TableHeadComponent } from "./TableHeadComponent";
import useFetch from "./useFetch";
import TableLoadingRows from "./TableLoadingRows";
import TableErrorRow from "./TableErrorRow";

export default function TableComponent() {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { rows, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData("https://api.stackexchange.com/2.3/tags?&site=stackoverflow");
  }, [fetchData]);

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const visibleRows = React.useMemo(() => {
    if (!rows) return [];
    return stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [rows, order, orderBy, page, rowsPerPage, getComparator]);

  function stableSort<T>(array: readonly T[] | undefined, comparator: (a: T, b: T) => number) {
    if (!array) return [];
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <Box sx={{ width: "50%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbarComponent />
        {rows.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage={<>Ilość na stronie:</>}
            component="div"
            labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
              return `${from}–${to} z ${count !== -1 ? count : `more than ${to}`}`;
            }}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            {rows.length > 0 && (
              <TableHeadComponent order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            )}
            <TableBody>
              {rows.length > 0 && (
                <>
                  {visibleRows.map((row, index) => (
                    <TableRow hover key={index} sx={{ cursor: "pointer" }}>
                      <TableCell padding="normal">{row.name}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </>
              )}
              {loading && <TableLoadingRows rowsNum={10} />}
              {error && <TableErrorRow>Bład podczas pobierania danych</TableErrorRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
