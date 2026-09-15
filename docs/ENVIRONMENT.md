# Environment Setup Guide

## Required Runtime Configuration

The application expects environment variables to be configured before startup. The current app uses `@nestjs/config` and reads values from process environment variables.

### Core variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URL` | Yes | MongoDB connection string |
| `PORT` | No | HTTP port for the NestJS app; defaults to `3000` |
| `JWT_SECRET` | Yes for auth phase | Secret used to sign JWTs |
| `JWT_EXPIRES_IN` | Yes for auth phase | JWT expiration duration |

## Example `.env` File

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/notes-api
JWT_SECRET=super-secret-key
JWT_EXPIRES_IN=1h
```

## Local MongoDB Setup

This project includes scripts for starting and stopping MongoDB locally:

- `npm run docker:start`
- `npm run docker:stop`

These scripts depend on the repository’s Mongo helper configuration and are intended to support local development.

## Local Development Workflow

```bash
npm install
npm run docker:start
npm run start:dev
```

## Production Considerations

- Keep secrets out of source control.
- Use environment-specific values in deployment pipelines.
- Inject database credentials through secure secret management.
- Ensure the JWT secret is long and unique.
- Restrict database access to the application environment only.

## Security Notes

- Never commit real `.env` files.
- Do not share JWT secrets or database credentials.
- Prefer deployment-managed environment variables over local static config.

## Related Files

- [package.json](../package.json)
- [src/app.module.ts](../src/app.module.ts)
- [scripts/start-mongo.sh](../scripts/start-mongo.sh)
- [scripts/stop-mongo.sh](../scripts/stop-mongo.sh)
