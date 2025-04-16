import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ConnectionForm = ({ onSuccess, onError, loading, setLoading }) => {
  const [connectionDetails, setConnectionDetails] = useState({
    host: "localhost",
    port: 5432,
    database: "",
    user: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConnectionDetails({
      ...connectionDetails,
      [name]: value,
    });
  };

  const handleConnect = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await window.electron.dbConnect({
        host: connectionDetails.host,
        port: parseInt(connectionDetails.port, 10),
        database: connectionDetails.database,
        user: connectionDetails.user,
        password: connectionDetails.password,
      });

      if (response.success) {
        onSuccess();
      } else {
        onError(new Error(response.message));
      }
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Connect to PostgreSQL Database
      </Typography>

      <form onSubmit={handleConnect}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              name="host"
              label="Host"
              fullWidth
              value={connectionDetails.host}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              name="port"
              label="Port"
              fullWidth
              value={connectionDetails.port}
              onChange={handleChange}
              margin="normal"
              required
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="database"
              label="Database Name"
              fullWidth
              value={connectionDetails.database}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="user"
              label="Username"
              fullWidth
              value={connectionDetails.user}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              value={connectionDetails.password}
              onChange={handleChange}
              margin="normal"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Connect"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ConnectionForm;
