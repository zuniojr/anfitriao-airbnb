import { defineMiddleware } from 'astro:middleware';
import { validateSession, COOKIE_NAME_EXPORT as COOKIE_NAME } from './lib/auth';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ADMIN_SECRET = import.meta.env.ADMIN_SECRET;

// Redirects cache (1 minute TTL)
let redirectsCache: any[] | null = null;
let redirectsCacheAt = 0;
const CACHE_TTL = 60_000;

function getRedirects(): any[] {
    const now = Date.now();
    if (redirectsCache && now - redirectsCacheAt < CACHE_TTL) return redirectsCache;
    try {
        const raw = readFileSync(resolve(process.cwd(), 'src/data/redirects.json'), 'utf-8');
        redirectsCache = JSON.parse(raw);
        redirectsCacheAt = now;
        return redirectsCache!;
    } catch {
        redirectsCache = [];
        redirectsCacheAt = now;
        return [];
    }
}

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;

    // Check redirects for all public routes (before admin check)
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/')) {
        const redirects = getRedirects();
        for (const r of redirects) {
            const normFrom = r.from?.replace(/\/+$/, '') || '';
            const normPath = pathname.replace(/\/+$/, '') || '/';
            if (r.enabled && normFrom && r.to && (normFrom === normPath || r.from === pathname)) {
                return context.redirect(r.to, r.type || 301);
            }
        }
    }

    // Rotas públicas: pass through
    if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
        return next();
    }

    // Login page: always accessible
    if (pathname === '/admin/login') {
        return next();
    }

    // Sem ADMIN_SECRET configurado → aviso
    if (!ADMIN_SECRET) {
        if (pathname.startsWith('/api/')) {
            return new Response(JSON.stringify({ error: 'ADMIN_SECRET não configurado no .env' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return context.redirect('/admin/login');
    }

    // Valida sessão
    const cookieHeader = context.request.headers.get('cookie') || '';
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [k, ...v] = c.trim().split('=');
            return [k, decodeURIComponent(v.join('='))];
        })
    );

    const valid = await validateSession(cookies[COOKIE_NAME]);

    if (!valid) {
        if (pathname.startsWith('/api/')) {
            return new Response(JSON.stringify({ error: 'Não autorizado' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        return context.redirect('/admin/login');
    }

    return next();
});
