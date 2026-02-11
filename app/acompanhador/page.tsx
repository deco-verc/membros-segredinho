
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AcompanhadorDashboard from '@/components/acompanhador/AcompanhadorDashboard';

export default async function AcompanhadorPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Busca dados do usuário (quiz_data)
    const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    // Busca progresso do usuário
    const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

    return (
        <AcompanhadorDashboard
            userData={userData}
            progressData={progressData || []}
            userId={user.id}
        />
    );
}
