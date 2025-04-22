# news-api

> [!WARNING]
> Work in progress

## Getting Started

### Prerequisites

- Node.js v22.14.0
- PostgreSQL

### Installation

1. Clone the repository using `git clone https://github.com/H4ckint0sh/news-api.git`
2. Install dependencies using `npm install`

### Running the development server

1. Create a `.env` file in the root directory and add the following variables:

```bash
PG_DATABASE=name_of_your_database
SECRET_KEY=your_secret_key
```

2.Seed the database using `npm run seed:dev`

3. Start the development server using `npm run start:dev`

## Todo

- [ ] Add tests useing vitest
- [ ] Add calendar routes
- [ ] Add prayer times routes
