import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ConnectionForm from "./components/ConnectionForm";
import QueryEditor from "./components/QueryEditor";
import QueryResults from "./components/QueryResults";
import Header from "./components/Header";
import { Container, Box, Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [queryResults, setQueryResults] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConnectionSuccess = () => {
    setIsConnected(true);
    setError(null);
  };

  const handleConnectionError = (error) => {
    setIsConnected(false);
    setError(error);
  };

  const handleQueryResults = (results) => {
    setQueryResults(results);
    setError(null);
  };

  const handleQueryError = (error) => {
    setError(error);
    setQueryResults(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Container sx={{ flexGrow: 1, py: 4 }}>
          {!isConnected ? (
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <ConnectionForm
                onSuccess={handleConnectionSuccess}
                onError={handleConnectionError}
                loading={loading}
                setLoading={setLoading}
              />
            </Paper>
          ) : (
            <>
              <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <QueryEditor
                  onQueryResults={handleQueryResults}
                  onQueryError={handleQueryError}
                  loading={loading}
                  setLoading={setLoading}
                />
              </Paper>

              {queryResults && (
                <Paper elevation={3} sx={{ p: 3 }}>
                  <QueryResults results={queryResults} />
                </Paper>
              )}
            </>
          )}

          {error && (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                mt: 3,
                backgroundColor: "error.light",
                color: "error.contrastText",
              }}
            >
              <Box
                component="pre"
                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
              >
                {error.message || JSON.stringify(error)}
              </Box>
            </Paper>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
