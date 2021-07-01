[![tests](https://github.com/suricat89/nlw6_valoriza/actions/workflows/cy.yml/badge.svg)](https://github.com/suricat89/nlw6_valoriza/actions/workflows/cy.yml)
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

# NLW#6 Valoriza

## Technologies

- Typescript (using GTS - Google Typescript)
- TypeORM
- PostgreSQL
- Docker compose (just for development and local tests)
- JWT with a per route access level validation
- Joi (for smart request input validation)
- Jest (integrated tests with 99% coverage!)
- Github CI

## What is it?

Project developed during the NLW#6 event that took place between june 20 to 27.<br/>
The **NLW#6 Valoriza** is an API where co-workers can send compliments to one another.

## Installation

```bash
yarn

sudo docker-compose up

yarn dev
```

## Environment variables

| Name                  | Default value |
| --------------------- | ------------- |
| NODE_ENV              | development   |
| PORT                  | 5000          |
| JWT_SECRET            | test          |
| JWT_EXPIRES_IN        |               |
| DATABASE_TYPE         | postgres      |
| DATABASE_HOST         | localhost     |
| DATABASE_PORT         | 15432         |
| DATABASE_USERNAME     | admin         |
| DATABASE_PASSWORD     | development   |
| DATABASE_DATABASENAME | nlw6_valoriza |
