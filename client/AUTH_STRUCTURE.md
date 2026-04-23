# Auth Structure Documentation

## Overview

This is a clean, industry-standard authentication system built with security and user experience in mind.

## Architecture

### Core Files

1. **`/lib/auth.ts`** - Central authentication service
   - Token management (access/refresh tokens)
   - Server-side validation
   - Automatic token refresh
   - User data extraction

2. **`/lib/api-client.ts`** - Axios instance with auth interceptors
   - Automatic token attachment
   - Token refresh on 401 errors
   - Network error handling

3. **`/store/index.ts`** - Zustand store for state management
   - Auth state management
   - User data persistence
   - UI state (sidebar, dark mode, toasts)

4. **`/actions/auth.api.ts`** - Auth API endpoints
   - Login, register, logout
   - Profile management
   - Password change

5. **`/components/AuthGuard.tsx`** - Route protection component
   - Authentication checking
   - Loading states
   - Redirect logic

## Key Features

### Security
- **JWT tokens** with proper expiration handling
- **Secure cookies** with httpOnly, secure, sameSite
- **Automatic token refresh** before expiration
- **Server-side validation** fallback to client-side
- **Network error handling** for backend restarts

### User Experience
- **Seamless auth flow** - No login required after backend restart
- **Persistent sessions** - User stays logged in across refreshes
- **Graceful error handling** - Clear error messages
- **Loading states** - Smooth UI transitions
- **Toast notifications** - User feedback

### Developer Experience
- **Clean separation of concerns**
- **TypeScript support** throughout
- **Backward compatibility** with existing API calls
- **Easy to extend** and maintain

## Usage

### Login
```typescript
const { login } = useStore();
await login(email, password);
```

### Auth Check
```typescript
const { isAuthenticated, checkAuth } = useStore();
const isValid = await checkAuth();
```

### API Calls
```typescript
import { api } from '@/lib/api-client';
const data = await api.get('/buildings');
```

### Protected Routes
```tsx
<AuthGuard>
  <YourComponent />
</AuthGuard>
```

## Backend Requirements

### Auth Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/validate` - Token validation (optional)
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update profile
- `POST /auth/change-password` - Change password

### Response Format
```typescript
{
  accessToken: string,
  refreshToken: string,
  user: {
    id: string,
    email: string,
    name: string,
    role: string,
    avatar?: string
  }
}
```

## Migration Notes

### From Old System
1. Update store imports: `@/store/useStore` → `@/store`
2. Use new auth methods: `authService.login()` → `store.login()`
3. No need to manually handle tokens - done automatically
4. Better error handling built-in

### File Changes
- ✅ **Deleted**: Old scattered auth files
- ✅ **Created**: Clean, centralized auth system
- ✅ **Updated**: All components to use new system
- ✅ **Maintained**: Backward compatibility for API calls

## Benefits

1. **Security First** - Proper token handling, validation, and refresh
2. **User Friendly** - Seamless experience, no unnecessary logins
3. **Developer Friendly** - Clean code, TypeScript, easy to use
4. **Production Ready** - Handles edge cases, network issues, scaling
5. **Maintainable** - Clear structure, well-documented, easy to extend

## Testing

The system should:
- ✅ Handle login/logout flows
- ✅ Persist user data across refreshes
- ✅ Handle backend restarts gracefully
- ✅ Show proper error messages
- ✅ Maintain security best practices
- ✅ Work with existing API endpoints

## Next Steps

1. Test the authentication flows
2. Verify backend endpoint compatibility
3. Test edge cases (network issues, token expiry)
4. Monitor performance and user experience
