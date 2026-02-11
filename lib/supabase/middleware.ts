
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        // Max-Age de 1 ano para manter logado
                        const extendedOptions = {
                            ...options,
                            maxAge: 60 * 60 * 24 * 365, // 1 ano
                        };
                        request.cookies.set(name, value);
                        supabaseResponse = NextResponse.next({
                            request,
                        });
                        supabaseResponse.cookies.set(name, value, extendedOptions);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Rotas protegidas (tudo menos login, callback e estáticos)
    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth') &&
        !request.nextUrl.pathname.startsWith('/_next') &&
        !request.nextUrl.pathname.includes('.') // arquivos estáticos como imagens
    ) {
        // Redireciona para login se não estiver autenticado
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    // Se já estiver logado e tentar acessar login, manda pro dashboard
    if (user && request.nextUrl.pathname.startsWith('/login')) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
