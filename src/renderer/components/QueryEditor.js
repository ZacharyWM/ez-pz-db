import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

const QueryEditor = ({ onQueryResults, onQueryError, loading, setLoading }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const executeQuery = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    setLoading(true);
    try {
      const response = await window.electron.dbQuery(query);

      if (response.success) {
        onQueryResults(response);
      } else {
        onQueryError(new Error(response.message));
      }
    } catch (error) {
      onQueryError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        SQL Query Editor
      </Typography>

      <form onSubmit={executeQuery}>
        <TextField
          label="SQL Query"
          fullWidth
          multiline
          rows={6}
          value={query}
          onChange={handleQueryChange}
          margin="normal"
          variant="outlined"
          placeholder="Enter your SQL query here..."
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || !query.trim()}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Execute Query"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default QueryEditor;
