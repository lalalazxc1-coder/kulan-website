import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession, decrypt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
    // 1. Protect /admin routes - CRITICAL SECURITY CHECK
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const session = request.cookies.get('session');

        // If no session cookie, redirect to login
        if (!session) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('from', request.nextUrl.pathname);
            return NextResponse.redirect(loginUrl);
        }

        // ✅ CRITICAL FIX: Verify JWT signature and expiration
        try {
            const payload = await decrypt(session.value);

            // Check if session is expired
            const expiresDate = new Date(payload.expires);
            if (expiresDate < new Date()) {
                throw new Error('Session expired');
            }

            // Check if user exists in payload
            if (!payload.user || !payload.user.id) {
                throw new Error('Invalid session structure');
            }

            // Optional: Add role-based access control (RBAC)
            // Uncomment when implementing different admin roles:
            // if (payload.user.role !== 'admin' && payload.user.role !== 'editor') {
            //     throw new Error('Insufficient permissions');
            // }

        } catch (error) {
            // Invalid session - clear cookie and redirect to login
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('error', 'session_invalid');
            const response = NextResponse.redirect(loginUrl);
            response.cookies.delete('session');
            return response;
        }
    }

    // 2. Update session expiration if valid
    const response = await updateSession(request);
    return response || NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
