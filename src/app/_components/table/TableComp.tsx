/* eslint-disable @typescript-eslint/no-explicit-any */

import { Paper } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRowId,
  GridRowParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";

type TableComponentProps = {
  columns: GridColDef[];
  rows: any[];
  onSelect?: (selectedRows: any[]) => void;
  pageSize?: number;
  onPageChange?: (model: GridPaginationModel) => void;
  currentPage?: number; // Optional, used for server-side pagination
  totalRowCount?: number;
  rowHeight?: number;
  loading?: boolean;
  showCheckbox?: boolean;
  headerStyle?: {
    backgroundColor?: string;
    fontWeight?: string | number;
  };
  onRowClick?: (params: GridRowParams) => void;
};

export default function MuiTableComponent({
  columns,
  rows,
  pageSize,
  currentPage = 0,
  rowHeight,
  showCheckbox,
  headerStyle,
  onSelect,
  onRowClick,
  onPageChange,
  totalRowCount = rows.length, // Default to rows length if not provided
  loading = false,
}: TableComponentProps) {
  // const [selectedRowIds, setSelectedRowIds] = useState<GridRowId[]>([]);

  // Handle row click
  const handleRowClick = (params: GridRowParams) => {
    if (onRowClick) {
      onRowClick(params);
    }
  };

  const handleSelectionChange = (newSelection: GridRowSelectionModel) => {
    // Convert Set to array of IDs
    const normalizedSelection: GridRowId[] = Array.from(
      newSelection as unknown as Set<GridRowId>
    );

    console.log("newSelection:", newSelection);
    console.log("normalizedSelection:", normalizedSelection);

    // Get the full row objects using the IDs
    const selectedRowsData = rows.filter((row) =>
      normalizedSelection.includes(row.id)
    );

    onSelect?.(selectedRowsData);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Paper className="w-full min-w-[400px] min-h-[200px] overflow-hidden">
        <div style={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={rows}
            rowCount={totalRowCount}
            columns={columns}
            paginationMode="server"
            paginationModel={{
              page: currentPage > 0 ? currentPage - 1 : 0, // Adjust for zero-based index
              pageSize: pageSize || 10,
            }}
            onPaginationModelChange={onPageChange}
            pageSizeOptions={[5, 10, 15, 20]}
            checkboxSelection={showCheckbox}
            disableColumnFilter={true}
            disableColumnMenu={true}
            loading={loading}
            disableRowSelectionOnClick={true}
            onRowSelectionModelChange={handleSelectionChange}
            rowHeight={rowHeight}
            onRowClick={handleRowClick}
            sx={{
              border: 0,
              minWidth: "900px",
              height: 500,
              paddingLeft: 2,
              "& .MuiCheckbox-root.Mui-checked": {
                color: "#e65800 !important", // Replace with your desired color
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: headerStyle?.backgroundColor ?? "transparent",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                fontWeight: headerStyle?.fontWeight ?? "normal",
              },
              "& .MuiDataGrid-row": {
                cursor: `${onRowClick && "pointer"}`, // Always show pointer cursor on rows
              },
              "& .MuiDataGrid-overlay": {
                backgroundColor: "rgba(255, 255, 255, 0.8)", // semi-transparent background
              },
              "& .MuiCircularProgress-root": {
                color: "#14199c", // custom spinner color
                width: "60px !important",
                height: "60px !important",
              },
            }}
          />
        </div>
      </Paper>
    </div>
  );
}
