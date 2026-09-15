# Authentication and Authorization Guide

## Current State

The project already has a user registration flow and a role field on the user model. The auth layer is partially implemented but not yet complete.

## Current Behavior

- User data is stored in MongoDB with a hashed password.
- Registration creates a user with a password encrypted using `bcrypt`.
- Login endpoint exists but is not fully implemented.
- The role guard checks a request header value and is not yet backed by real JWT identity claims.

## Target Authentication Model

The app should use JWT-based authentication for all protected endpoints.

### Proposed flow

1. User sends registration data.
2. Server validates the payload.
3. Server hashes the password and stores the user.
4. User sends login credentials.
5. Server validates email and password.
6. Server issues a JWT with user identity and role.
7. Client includes the JWT in the `Authorization` header.
8. Guard verifies the token and loads user context.

## Required Roles

The user schema supports a role field. The expected model is:

- `student` (default)
- `admin` (restricted access)

The role guard should check the verified token payload instead of a raw request header.

## Recommended Guards

### `AuthGuard`

Used to ensure the user is authenticated before reaching the route.

### `RoleGuard`

Used to allow access only to users with the right role.

## Example Authorization Header

```http
Authorization: Bearer <jwt-token>
```

## Security Rules

- Store passwords only as hashed values.
- Never trust a client-provided role header.
- Validate JWT signature and expiration values.
- Keep protected routes behind auth guards.
- Use service-layer ownership checks for user-managed resources.

## Planned Work

- Implement `login()` with password verification.
- Generate and return a JWT.
- Create a real auth guard.
- Replace header-based role validation with JWT role extraction.
- Add tests for unauthenticated and unauthorized requests.

## Related Files

- [src/auth/auth.service.ts](../src/auth/auth.service.ts)
- [src/auth/auth.controller.ts](../src/auth/auth.controller.ts)
- [src/utils/guards/role.guard.ts](../src/utils/guards/role.guard.ts)
- [src/schemas/user.schema.ts](../src/schemas/user.schema.ts)
- [src/utils/dto/register-user.dto.ts](../src/utils/dto/register-user.dto.ts)
