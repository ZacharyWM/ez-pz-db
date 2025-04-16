import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const QueryResults = ({ results }) => {
  if (!results || !results.data || results.data.length === 0) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Query Results
        </Typography>
        <Typography color="textSecondary">
          Query executed successfully. No data returned.
        </Typography>
      </Box>
    );
  }

  // Extract column names from the first result
  const columns = Object.keys(results.data[0]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Query Results</Typography>
        <Chip
          label={`${results.data.length} rows`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.data.map((row, rowIndex) => (
              <TableRow key={rowIndex} hover>
                {columns.map((column, colIndex) => (
                  <TableCell key={`${rowIndex}-${colIndex}`}>
                    {renderCellValue(row[column])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

// Helper function to render cell values properly
const renderCellValue = (value) => {
  if (value === null) {
    return <span style={{ color: "#999", fontStyle: "italic" }}>NULL</span>;
  }

  if (value === true) {
    return "true";
  }

  if (value === false) {
    return "false";
  }

  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }

  return String(value);
};

export default QueryResults;
