const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startURL = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "build/index.html")}`;

  mainWindow.loadURL(startURL);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Database connection handlers
ipcMain.handle("db-connect", async (event, connectionConfig) => {
  const { Pool } = require("pg");
  try {
    const pool = new Pool(connectionConfig);
    const client = await pool.connect();

    // Test the connection
    await client.query("SELECT NOW()");
    client.release();

    // Store the connection config for later use
    global.connectionConfig = connectionConfig;

    return { success: true, message: "Successfully connected to database" };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

ipcMain.handle("db-query", async (event, query, params) => {
  if (!global.connectionConfig) {
    return { success: false, message: "Database not connected" };
  }

  const { Pool } = require("pg");
  const pool = new Pool(global.connectionConfig);

  try {
    const client = await pool.connect();
    const result = await client.query(query, params);
    client.release();
    return { success: true, data: result.rows, fields: result.fields };
  } catch (error) {
    return { success: false, message: error.message };
  }
});
