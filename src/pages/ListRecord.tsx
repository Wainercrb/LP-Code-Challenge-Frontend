import { useState, useEffect, FC } from "react";

// Material Components
import { visuallyHidden } from "@mui/utils";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import TableHead from "@mui/material/TableHead";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";

// Material Icons
import DeleteIcon from "@mui/icons-material/Delete";

// Custom UI Components
import DebounceInputSearch from "@/ui/DebounceInputSearch";

// Redux
import {
  useDeleteRecordMutation,
  useGetRecordsQuery,
} from "@/redux/services/appApi";
import { Record } from "@/models/Record";

// Utils
import { PaginationInput, buildPagination } from "@/utils/pagination";
import { TableSortLabel } from "@mui/material";

interface Column {
  name: string | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  sortedKey?: string;
  value: (v: Record) => string | number;
}

const TABLE_COLUMNS: readonly Column[] = [
  { name: "id", label: "Id", minWidth: 170, value: (v: Record) => v.id },
  {
    name: "amount",
    label: "Amount",
    minWidth: 170,
    sortedKey: "recordAmount",
    value: (v: Record) => v.amount.toLocaleString("en-US"),
  },
  {
    name: "username",
    label: "Username",
    minWidth: 170,
    sortedKey: "userUsername",
    value: (v: Record) => v.user.username,
  },
  {
    name: "operationType",
    label: "Operation Type",
    minWidth: 170,
    sortedKey: "operationType",
    value: (v: Record) => v.operation.type,
  },
  {
    name: "operationCost",
    label: "Operation Cost",
    minWidth: 170,
    sortedKey: "operationCost",
    value: (v: Record) => v.operation.cost,
  },
  {
    name: "date",
    label: "Date",
    minWidth: 170,
    sortedKey: "recordDate",
    value: (v: Record) => new Date(v.date).toLocaleDateString(),
  },
  {
    name: "operationResponse",
    label: "Operation Response",
    sortedKey: "recordOperationResponse",
    value: (v: Record) => v.operation_response,
  },
  {
    name: "actions",
    label: "Actions",
    value: (v: Record) => v.id,
  },
];

const ROWS_PER_PAGE: readonly number[] = [5, 10, 25, 100];
const SKELETON_ROW = 3;

const TableSkeleton: FC<{ columns: readonly Column[] }> = ({ columns }) => {
  const indices = Array.from({ length: SKELETON_ROW }, (_, index) => index);
  return (
    <>
      {indices.map((rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map(({ name }) => (
            <TableCell key={name}>
              <Skeleton variant="text" animation="wave" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

function RecordPage() {
  // Pagination and sort
  const [criteria, setCriteria] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE[0]);
  const [orderDirection, setOderDirection] =
    useState<PaginationInput["orderDirection"]>("desc");
  const [orderColumn, setOrderColumn] =
    useState<PaginationInput["orderColumn"]>(undefined);

  // Notifications
  const [errorStackBarOpen, setErrorStackBarOpen] = useState(false);
  const [successStackBarOpen, setSuccessStackBarOpen] = useState(false);

  // Other logic
  const [selectedRow, setSelectedRow] = useState(-1);

  const { isFetching, data } = useGetRecordsQuery(
    buildPagination({
      page,
      size: rowsPerPage,
      orderDirection,
      orderColumn,
      criteria: criteria.length ? criteria : undefined,
    }),
    {
      refetchOnMountOrArgChange: true,
      skip: false,
    }
  );

  const [handleDeleteRecord, { isLoading, isSuccess, isError }] =
    useDeleteRecordMutation();

  const { rows = [], totalItems } = data || {
    rows: [],
    totalItems: 0,
    totalPages: 0,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectedAndDeleteRow = (recordId: number) => {
    setSelectedRow(recordId);
    handleDeleteRecord({ record_id: recordId });
  };

  const createSortHandler = (property: string) => {
    const isAsc = orderColumn === property && orderDirection === "asc";
    setOderDirection(isAsc ? "desc" : "asc");
    setOrderColumn(property);
  };

  useEffect(() => {
    if (isSuccess) {
      setSuccessStackBarOpen(true);
    } else if (isError) {
      setErrorStackBarOpen(true);
    }
  }, [isSuccess, isError]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorStackBarOpen}
        autoHideDuration={6000}
        onClose={() => setErrorStackBarOpen(false)}
      >
        <Alert
          onClose={() => setErrorStackBarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Error deleting the record, check the logs
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={successStackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessStackBarOpen(false)}
      >
        <Alert
          onClose={() => setSuccessStackBarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Record deleted successfully!
        </Alert>
      </Snackbar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
        }}
      >
        <Typography variant="h5" component="div">
          Records
        </Typography>
        <DebounceInputSearch defaultValue={criteria} setValue={setCriteria} />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {TABLE_COLUMNS.map((column) => (
                <TableCell
                  key={column.name}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={
                    orderColumn === column.sortedKey ? orderDirection : false
                  }
                >
                  {column.sortedKey ? (
                    <TableSortLabel
                      active={orderColumn === column.sortedKey}
                      direction={orderDirection ? orderDirection : "asc"}
                      onClick={() =>
                        createSortHandler(column.sortedKey as string)
                      }
                    >
                      {column.label}
                      {orderColumn === column.sortedKey ? (
                        <Box component="span" sx={visuallyHidden}>
                          {orderDirection === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableSkeleton columns={TABLE_COLUMNS} />
            ) : (
              rows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {TABLE_COLUMNS.map((column) => {
                      const value = column.value(row);
                      return (
                        <TableCell key={column.name} align={column.align}>
                          {column.name !== "actions" ? (
                            value
                          ) : (
                            <>
                              <IconButton
                                onClick={() =>
                                  handleSelectedAndDeleteRow(row.id)
                                }
                                disabled={isLoading}
                                color="inherit"
                                aria-label="delete record"
                                edge="start"
                                sx={{
                                  marginLeft: 5,
                                }}
                              >
                                {isLoading && selectedRow === row.id ? (
                                  <CircularProgress />
                                ) : (
                                  <DeleteIcon />
                                )}
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default RecordPage;
