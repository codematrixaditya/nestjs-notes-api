# Project Plan: NestJS Notes API

## 1. Objective

Build a secure, modular notes application backend using NestJS and MongoDB. The project already contains a solid foundation for a user-authentication flow and a modular architecture, but it still needs the core notes domain, stronger auth security, and production-readiness work before it can be considered a complete MVP.

## 2. Current State of the Project

The repository currently shows the following baseline:

- NestJS application scaffold with TypeScript.
- MongoDB configured through `@nestjs/mongoose` and environment-based configuration.
- Modular structure with `AppModule`, `UserModule`, and `AuthModule`.
- User schema with fields for name, email, password, and role.
- Password hashing during user registration using `bcrypt`.
- Role-based guard pattern exists, but it is not yet tied to real JWT auth or user claims.
- Auth login logic is still incomplete or placeholder-based.

Relevant files:

- [src/app.module.ts](src/app.module.ts)
- [src/auth/auth.module.ts](src/auth/auth.module.ts)
- [src/auth/auth.service.ts](src/auth/auth.service.ts)
- [src/user/user.module.ts](src/user/user.module.ts)
- [src/user/user.service.ts](src/user/user.service.ts)
- [src/schemas/user.schema.ts](src/schemas/user.schema.ts)
- [src/utils/guards/role.guard.ts](src/utils/guards/role.guard.ts)

## 3. Product Vision

The app should support:

- User registration and login
- Secure JWT-based authentication
- Role-aware authorization
- CRUD operations for notes
- Ownership and access validation for user-created content
- Validation, error handling, and testing
- Clean deployment and environment configuration for local and production use

## 4. Guiding Architecture Principles

1. Keep business logic in services, not controllers.
2. Use MongoDB documents for real domain data.
3. Protect all sensitive endpoints with authenticated access checks.
4. Enforce authorization based on user identity and roles, not request headers.
5. Prefer type-safe DTOs and validation pipes for all incoming payloads.
6. Keep modules focused and reusable.
7. Treat tests as required for every major feature.

## 5. Delivery Roadmap

### Phase 1: Authentication hardening

Goal: Replace the current placeholder auth flow with a real, secure authentication system.

Tasks:

- Implement a proper login flow in [src/auth/auth.service.ts](src/auth/auth.service.ts)
- Verify user credentials against stored hashed password
- Generate and return a JWT token after successful login
- Create an auth guard that reads JWT data from the request
- Create a role guard that checks real user roles from a verified token
- Add DTO validation for login and registration requests
- Expose endpoints for register/login with consistent error handling

Acceptance criteria:

- Users can register with valid data.
- Users can log in and receive a JWT token.
- Protected endpoints reject unauthenticated requests.
- Admin-only endpoints only work for users with the correct role.
- Passwords are never stored as plain text.

Key files to update:

- [src/auth/auth.service.ts](src/auth/auth.service.ts)
- [src/auth/auth.controller.ts](src/auth/auth.controller.ts)
- [src/utils/guards/role.guard.ts](src/utils/guards/role.guard.ts)
- [src/utils/dto/register-user.dto.ts](src/utils/dto/register-user.dto.ts)

### Phase 2: Notes domain implementation

Goal: Add the central business feature of the application: notes CRUD.

Tasks:

- Create a `Note` schema with fields such as title, content, createdBy, updatedAt, and optional status or tags
- Register the `Note` model in a dedicated notes module
- Implement `NoteService` with create, findAll, findOne, update, and delete methods
- Enforce ownership checks so users can only access or modify their own notes
- Add DTOs for create and update note requests
- Add controller endpoints for note operations
- Add proper validation for missing or invalid fields

Suggested module layout:

- `src/note/note.module.ts`
- `src/note/note.controller.ts`
- `src/note/note.service.ts`
- `src/schemas/note.schema.ts`
- `src/utils/dto/create-note.dto.ts`
- `src/utils/dto/update-note.dto.ts`

Acceptance criteria:

- Authenticated users can create notes.
- Users can fetch their own notes.
- Users cannot update or delete notes they do not own.
- Notes are stored in MongoDB with proper indexing for common queries.

### Phase 3: API polish and validation

Goal: Hardening the application before feature expansion.

Tasks:

- Add `ValidationPipe` globally
- Standardize all API responses using the existing transform interceptor
- Improve exception filtering with consistent error payloads
- Add `@nestjs/swagger` only if API documentation becomes a product requirement
- Add request-level validation around user and note inputs
- Improve logging and structured error handling

Relevant files:

- [src/main.ts](src/main.ts)
- [src/utils/transform.interceptor.ts](src/utils/transform.interceptor.ts)
- [src/utils/all-exceptions.filter.ts](src/utils/all-exceptions.filter.ts)
- [src/utils/logger/logger.service.ts](src/utils/logger/logger.service.ts)

Acceptance criteria:

- Invalid payloads return clean validation errors.
- API responses are consistent across all features.
- Log messages include enough context for debugging production issues.

### Phase 4: Testing and regression safety

Goal: Ensure the app is reliable and maintainable.

Tasks:

- Add unit tests for AuthService, UserService, and NoteService
- Add controller tests for auth and notes endpoints
- Add e2e coverage for login, protected route access, and note CRUD
- Validate edge cases such as duplicate emails, bad passwords, and unauthorized access
- Keep tests focused on real behavior rather than mocked-only assertions

Relevant test files:

- [src/auth/auth.service.spec.ts](src/auth/auth.service.spec.ts)
- [src/user/user.service.spec.ts](src/user/user.service.spec.ts)
- [src/utils/guards/role.guard.spec.ts](src/utils/guards/role.guard.spec.ts)
- [test/app.e2e-spec.ts](test/app.e2e-spec.ts)

Acceptance criteria:

- Core flows are covered by automated tests.
- Authentication and authorization regressions are caught early.
- Production risk is reduced for every new feature.

### Phase 5: Production readiness

Goal: Prepare the backend for deployment and ongoing maintenance.

Tasks:

- Configure environment variables for all runtime settings
- Add production-safe MongoDB connection handling
- Review and clean up scripts in [package.json](package.json)
- Add Docker and environment setup documentation
- Add CI checks for build, lint, and tests
- Document API usage and expected auth flow

Acceptance criteria:

- The project can run locally and in a deployment environment with predictable configuration.
- Build and test commands work consistently.
- The project is prepared for handoff and future iterations.

## 6. Suggested Execution Order

1. Finish secure auth with JWT and real role enforcement.
2. Implement the note domain with CRUD and ownership rules.
3. Add validation and response consistency improvements.
4. Expand test coverage for auth and notes.
5. Harden the app for deployment and maintainability.

## 7. Risks and Dependencies

### Risks

- The current role guard relies on a request header rather than JWT claims.
- Login is currently incomplete, which blocks protected-route functionality.
- The project currently does not yet have a real domain feature beyond users.
- Testing coverage should be expanded before adding major new modules.

### Dependencies

- MongoDB running locally or in Docker
- Environment configuration for app secrets and database URLs
- Consistent authentication patterns across modules
- A source of truth for user roles and permissions

## 8. Recommended Next Step

The immediate priority is to complete Phase 1 and implement real JWT-based authentication and authorization. Once that is stable, the notes feature can be built cleanly on top of the same architecture and validation patterns.

This sequence reduces risk because the app is already organized around modules and MongoDB, but it still needs a trusted identity layer before features like note ownership and access control can be implemented correctly.
