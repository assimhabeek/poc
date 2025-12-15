## Getting Started

1 - Install dependencies
```
pnpm install
``` 
2 - Create `.env` file in `apps/web` following `apps/web/.env.example` 

3 - Run Postgres database docker container
```
pnpm docker:up 
```
4 - Build apps and packages
```
pnpm build
```
5 - Create database and tables
```
pnpm db:push
```
6 - Run web app in dev mode
```
pnpm dev
```
7 - Navigate to 
```
http://localhost:3000/
```
8 - To access openapi documents navigate to 
```
http://localhost:3000/api
```


## Tech stack

- [Turborepo](https://turborepo.com/) + [pnpm workspaces](https://pnpm.io/workspaces)
- [Tanstack start](https://tanstack.com/start/latest) + [React](https://react.dev/)
- [Tanstack Query](https://tanstack.com/query/latest) 
- [Tanstack Form](https://tanstack.com/form/latest) 
- [Shadcn](https://ui.shadcn.com/)
- [Biomejs](https://biomejs.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Zod](https://zod.dev/)
- [oRPC](https://orpc.dev/)
- [Postgres](https://www.postgresql.org/)

## Quick notes 
- Turborepo simplicity and minimalist design
- Single source of truth for models which are database schema (zod schema is driven from the database schema)
- Fetch data from database on ssr, no need for an additional api server
- Tanstack query covers all use cases of async state managements.
- Biomejs very simple compared to eslint  
- Drizzle ORM still not stable, but covers basic cases
- oRPC procedures are callable for anywhere server/client doesn't matter