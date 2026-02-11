
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Camera, Upload, Trash2, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Photo {
    id: string;
    photo_url: string;
    week_number: number;
    created_at: string;
}

export default function PhotoGallery({ userId }: { userId: string }) {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        fetchPhotos();
    }, []);

    const fetchPhotos = async () => {
        const { data } = await supabase
            .from('photos')
            .select('*')
            .eq('user_id', userId)
            .order('week_number', { ascending: true });
        if (data) setPhotos(data);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        setUploading(true);

        try {
            // Upload Storage
            const { error: uploadError } = await supabase.storage
                .from('user-photos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('user-photos')
                .getPublicUrl(filePath);

            // Save to DB
            const nextWeek = photos.length + 1;
            const { error: dbError } = await supabase
                .from('photos')
                .insert({
                    user_id: userId,
                    photo_url: publicUrl,
                    week_number: nextWeek
                });

            if (dbError) throw dbError;

            toast.success('Foto enviada com sucesso!');
            fetchPhotos();
        } catch (error: any) {
            console.error(error);
            toast.error('Erro ao enviar foto: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Upload Button */}
            <div className="aspect-[3/4] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer relative overflow-hidden group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <Camera size={32} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">{uploading ? 'Enviando...' : 'Adicionar Foto'}</span>
            </div>

            {/* Photos List */}
            {photos.map((photo) => (
                <div key={photo.id} className="aspect-[3/4] bg-gray-100 rounded-xl relative group overflow-hidden shadow-sm">
                    <img
                        src={photo.photo_url}
                        alt={`Semana ${photo.week_number}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-sm font-bold flex items-center gap-1">
                            <Calendar size={12} />
                            Semana {photo.week_number}
                        </p>
                        <p className="text-gray-300 text-xs">
                            {new Date(photo.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            ))}

            {/* Empty State visual helper */}
            {photos.length === 0 && !uploading && (
                <div className="col-span-1 md:col-span-3 flex items-center justify-center text-gray-400 text-sm italic p-4 bg-gray-50 rounded-xl">
                    Nenhuma foto registrada ainda. Comece hoje!
                </div>
            )}
        </div>
    );
}
