const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electron", {
  dbConnect: (connectionConfig) =>
    ipcRenderer.invoke("db-connect", connectionConfig),
  dbQuery: (query, params) => ipcRenderer.invoke("db-query", query, params),
  // Add any other methods you need to expose here
});
