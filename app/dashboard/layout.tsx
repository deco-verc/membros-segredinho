import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/dashboard/Sidebar';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Fetch user name for Sidebar
    const { data: userData } = await supabase
        .from('users')
        .select('nome, quiz_data')
        .eq('id', user.id)
        .single();

    const nome = userData?.nome || userData?.quiz_data?.nome || 'Usuária';

    return (
        <div className="min-h-screen bg-gray-50 md:flex">
            <Sidebar nome={nome} />
            <div className="flex-1 lg:ml-72 min-w-0 transition-all duration-300">
                {children}
            </div>
        </div>
    );
}
