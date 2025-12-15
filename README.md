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