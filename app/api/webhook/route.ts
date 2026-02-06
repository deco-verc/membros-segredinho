import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        // 1. Validar webhook secret
        const secret = req.headers.get('x-webhook-secret');
        if (secret !== process.env.EFIBANK_WEBHOOK_SECRET) {
            console.error('❌ Webhook unauthorized');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const payload = await req.json();
        console.log('📦 Webhook payload received:', payload);

        // 2. Verificar se pagamento foi aprovado
        if (payload.status !== 'approved' && payload.status !== 'paid') {
            console.log('⏳ Payment not approved yet:', payload.status);
            return NextResponse.json({ message: 'Payment not approved' });
        }

        const email = payload.customer?.email || payload.email;
        const metadata = payload.metadata || {};

        if (!email) {
            console.error('❌ No email in webhook');
            return NextResponse.json({ error: 'Email required' }, { status: 400 });
        }

        // 3. Extrair dados do quiz do metadata
        let quizData: any = {};

        if (metadata.quiz_data) {
            try {
                quizData = typeof metadata.quiz_data === 'string'
                    ? JSON.parse(metadata.quiz_data)
                    : metadata.quiz_data;
                console.log('✅ Quiz data parsed successfully');
            } catch (e) {
                console.error('❌ Error parsing quiz data:', e);
            }
        } else {
            console.warn('⚠️  No quiz_data in metadata');
        }

        // 4. Criar usuário no Supabase Auth
        console.log('👤 Creating user:', email);

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            email_confirm: true,
        });

        if (authError) {
            console.error('❌ Error creating auth user:', authError);
            return NextResponse.json({ error: authError.message }, { status: 500 });
        }

        console.log('✅ Auth user created:', authData.user.id);

        // 5. Criar entrada na tabela users
        const { error: dbError } = await supabaseAdmin
            .from('users')
            .insert({
                id: authData.user.id,
                email: email,
                nome: quizData.nome || 'Usuária',
                quiz_data: quizData,
                onboarding_completed: false,
            });

        if (dbError) {
            console.error('❌ Error creating user record:', dbError);
            return NextResponse.json({ error: dbError.message }, { status: 500 });
        }

        console.log('✅ User record created');

        // 6. Criar primeiro registro de progresso (dia 1)
        const today = new Date().toISOString().split('T')[0];
        await supabaseAdmin
            .from('user_progress')
            .insert({
                user_id: authData.user.id,
                date: today,
                peso_atual: quizData.peso || null,
                tomou_bebida: false,
            });

        console.log('✅ Initial progress created');

        // 7. Enviar magic link por email
        const { error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'magiclink',
            email: email,
            options: {
                redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`,
            }
        });

        if (linkError) {
            console.error('❌ Error sending magic link:', linkError);
        } else {
            console.log('✅ Magic link sent to:', email);
        }

        return NextResponse.json({
            success: true,
            user_id: authData.user.id,
            message: 'User created and email sent'
        });

    } catch (error) {
        console.error('❌ Webhook error:', error);
        return NextResponse.json({
            error: 'Internal server error',
            details: (error as any).message
        }, { status: 500 });
    }
}
