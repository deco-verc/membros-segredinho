
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ModuleHeaderProps {
    title: string;
    description?: string;
    emoji?: string;
    bgClass?: string;
}

export default function ModuleHeader({ title, description, emoji, bgClass = "bg-white" }: ModuleHeaderProps) {
    return (
        <div className={`${bgClass} rounded-b-3xl shadow-sm border-b border-gray-100 mb-8`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 font-medium mb-6 transition-colors group"
                >
                    <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span>Voltar para o Dashboard</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center gap-6"
                >
                    {emoji && (
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-md rotate-3 hover:rotate-6 transition-transform">
                            {emoji}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
                        {description && (
                            <p className="text-lg text-gray-600 max-w-2xl">{description}</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
