import { createClient } from '@/lib/supabase/server';
import WelcomeHero from '@/components/dashboard/WelcomeHero';
import ProgressCard from '@/components/dashboard/ProgressCard';
import ModuleCard from '@/components/dashboard/ModuleCard';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Note: Redirect is handled in layout, but safe to keep checking user here if needed for queries
    if (!user) return null;

    const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

    const quizData: any = userData?.quiz_data || {};
    const nome = quizData.nome || userData?.nome || 'Usuária';
    const meta = quizData.metaKg || 10;
    const peso = quizData.peso || 70;

    const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false })
        .limit(1);

    const diasAtivos = userData?.total_days_active || 0;
    const streak = userData?.current_streak || 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* Welcome Hero */}
            <WelcomeHero
                nome={nome}
                diasAtivos={diasAtivos}
                streak={streak}
            />

            {/* Progress Overview */}
            <ProgressCard
                userId={user.id}
                pesoInicial={peso}
                meta={meta}
                pesoAtual={progressData?.[0]?.peso_atual || peso}
            />

            {/* Módulos Grid */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                    Seus Módulos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ModuleCard
                        title="Protocolo Personalizado"
                        description="Sua dose exata e passo a passo completo dos 60 dias"
                        icon="💊"
                        iconBg="from-green-400 to-emerald-500"
                        href="/protocolo"
                        status="active"
                        badge="Essencial"
                    />

                    <ModuleCard
                        title="Acompanhador de Progresso"
                        description="Registre peso, medidas e fotos. Veja sua evolução"
                        icon="📊"
                        iconBg="from-blue-400 to-cyan-500"
                        href="/acompanhador"
                        status="active"
                    />

                    <ModuleCard
                        title="Guia Saúde Intestinal"
                        description="Destravar intestino em 7 dias. Zero inchaço"
                        icon="🌿"
                        iconBg="from-emerald-400 to-green-500"
                        href="/bonus-intestinal"
                        status="unlocked"
                        badge="Bônus"
                    />

                    <ModuleCard
                        title="Protocolo Anti-Compulsão"
                        description="Domine gatilhos emocionais. Pare de sabotar"
                        icon="🧘‍♀️"
                        iconBg="from-purple-400 to-pink-500"
                        href="/bonus-compulsao"
                        status="unlocked"
                        badge="Bônus"
                    />

                    <ModuleCard
                        title="100 Receitas Seca-Barriga"
                        description="Emagreça comendo doces, massas e o que gosta"
                        icon="🍽️"
                        iconBg="from-orange-400 to-red-500"
                        href="/bonus-receitas"
                        status="unlocked"
                        badge="Bônus"
                    />

                    <ModuleCard
                        title="Comunidade Privada"
                        description="Grupo exclusivo com 24.783 mulheres ativas"
                        icon="👥"
                        iconBg="from-pink-400 to-rose-500"
                        href="#"
                        status="coming-soon"
                        badge="Em breve"
                    />
                </div>
            </div>
        </div>
    );
}
