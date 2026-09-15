# API Reference

## Overview

This document summarizes the current and planned API surface for the notes backend. It is intentionally written to help new agents understand the intended behavior quickly.

## Current API Status

The application currently includes a registration endpoint and a login endpoint under the `auth` controller. The user controller exists but does not yet expose business logic. The notes API is planned but not yet implemented.

## Auth Endpoints

### `POST /auth/register`

Registers a new user.

Request body:

```json
{
  "fname": "Jane",
  "lname": "Doe",
  "email": "jane@example.com",
  "password": "Password123!"
}
```

Behavior:

- Validates the request body
- Hashes the password
- Persists the new user to MongoDB

### `POST /auth/login`

Logs the user in and returns an authentication token.

Expected behavior after completion:

- Validate email and password
- Verify password against stored hash
- Return JWT with user info and role

## Planned Notes Endpoints

### `POST /notes`

Create a new note for the authenticated user.

### `GET /notes`

Return all notes belonging to the current user.

### `GET /notes/:id`

Return a specific note if it belongs to the current user.

### `PATCH /notes/:id`

Update the contents of a note owned by the current user.

### `DELETE /notes/:id`

Delete a note owned by the current user.

## Authorization Model

Protected endpoints should require:

- valid JWT in the `Authorization` header
- correct user role for role-restricted routes
- ownership validation for user-specific resources

Example header:

```http
Authorization: Bearer <token>
```

## Error Handling Expectations

The app already uses a global exception filter and response transform interceptor to keep responses predictable.

Expected patterns:

- validation failures return 400 or 422-style responses
- unauthorized requests return 401
- forbidden access returns 403
- resource not found returns 404

## Related Files

- [src/auth/auth.controller.ts](../src/auth/auth.controller.ts)
- [src/user/user.controller.ts](../src/user/user.controller.ts)
- [src/utils/all-exceptions.filter.ts](../src/utils/all-exceptions.filter.ts)
- [src/utils/transform.interceptor.ts](../src/utils/transform.interceptor.ts)
- [src/utils/guards/role.guard.ts](../src/utils/guards/role.guard.ts)
