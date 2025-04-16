# EZ-PZ DB - PostgreSQL GUI

A desktop application built with Electron and React for interacting with PostgreSQL databases.

## Features

- Connect to any PostgreSQL database with username/password authentication
- Execute SQL queries and view results in a tabular format
- Modern and intuitive user interface built with Material UI

## Development

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- PostgreSQL database for testing

### Installation

1. Clone this repository

```bash
git clone https://github.com/YourUsername/ez-pz-db.git
cd ez-pz-db
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Start the development server

```bash
npm start
# or
yarn start
```

### Building for Production

To build the application for production, run:

```bash
npm run build
# or
yarn build
```

The packaged application will be available in the `dist` directory.

## Technical Details

- **Frontend**: React with Material UI
- **Backend**: Electron
- **Database**: PostgreSQL (via node-postgres)
- **Bundling**: Webpack

## License

This project is licensed under the ISC License - see the LICENSE file for details.
