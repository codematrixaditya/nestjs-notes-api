# Architecture Overview

## Purpose

This project is a NestJS backend for a notes application with user accounts, secure authentication, and role-based access. The base structure is already in place for a modular NestJS app using MongoDB and environment-based configuration.

## Current Stack

- NestJS 11 with TypeScript
- MongoDB with Mongoose
- Environment-based config via `@nestjs/config`
- Role-based access patterns
- Password hashing with `bcrypt`
- Validation and global transform/error handling

## High-Level Structure

- `src/app.module.ts` bootstraps the application and wires together the major modules.
- `src/auth/` handles registration and login flows.
- `src/user/` handles user-related business logic and persistence.
- `src/schemas/` contains MongoDB schemas for persisted entities.
- `src/utils/` contains DTOs, guards, filters, and interceptors.
- `test/` contains end-to-end testing setup.

## Request Flow

1. A client sends a request to a controller.
2. The controller delegates to a service.
3. The service performs validation, hashing, or database operations.
4. The database layer persists or retrieves data from MongoDB.
5. A global interceptor normalizes responses.
6. A global exception filter standardizes error output.
7. A guard may enforce auth or role protection before the action runs.

## Module Map

### App module

The root app module registers:

- `UserModule`
- `AuthModule`
- `ConfigModule.forRoot()`
- `MongooseModule.forRootAsync(...)`

This means the app expects a valid `MONGODB_URL` environment variable at runtime.

### Auth module

The auth module currently contains:

- controller for register/login routes
- service for registration and login logic
- dependency on the user module for data access

This is the place where JWT-based auth should eventually be implemented.

### User module

The user module handles user persistence and registration-related data flow. A `User` schema is registered here and exported for reuse across the app.

### Shared utility layer

This includes:

- DTO validation classes
- role guard
- global exception filter
- response transform interceptor
- logger service

These utilities are the foundation for consistent API behavior.

## Data Model Notes

The current user model includes:

- `fname`
- `lname`
- `email`
- `password`
- `role`

Role defaults to the student role and should eventually be enforced using JWT claims rather than request headers.

## Design Principles

- Keep controllers thin.
- Put business logic in services.
- Enforce access control at the guard layer.
- Validate DTOs aggressively.
- Keep Mongo schemas explicit and predictable.
- Ensure all secrets and database config are environment-driven.

## Planned Evolution

The next major architectural milestones are:

1. Replace the current auth placeholder with real JWT-based authentication.
2. Introduce a `Note` module and schema.
3. Add ownership checks for user-managed resources.
4. Strengthen testing around auth and authorization.
5. Prepare the app for deployment and production configuration.

## Key Files

- [src/app.module.ts](../src/app.module.ts)
- [src/auth/auth.module.ts](../src/auth/auth.module.ts)
- [src/auth/auth.service.ts](../src/auth/auth.service.ts)
- [src/user/user.module.ts](../src/user/user.module.ts)
- [src/user/user.service.ts](../src/user/user.service.ts)
- [src/schemas/user.schema.ts](../src/schemas/user.schema.ts)
- [src/main.ts](../src/main.ts)
