import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage() {
    const supabase = await createClient();

    // Get the session after email confirmation
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
}
