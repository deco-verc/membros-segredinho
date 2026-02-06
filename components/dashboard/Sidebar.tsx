'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Home,
    BookOpen,
    Activity,
    Utensils,
    Brain,
    Salad,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
    nome: string;
}

const menuItems = [
    { icon: Home, label: 'Início', href: '/dashboard' },
    { icon: BookOpen, label: 'Protocolo', href: '/protocolo' },
    { icon: Activity, label: 'Meu Progresso', href: '/acompanhador' },
    { icon: Utensils, label: 'Receitas', href: '/bonus-receitas' },
    { icon: Brain, label: 'Anti-Compulsão', href: '/bonus-compulsao' },
    { icon: Salad, label: 'Saúde Intestinal', href: '/bonus-intestinal' },
];

export default function Sidebar({ nome }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const sidebarContent = (
        <div className="flex flex-col h-full bg-white/80 backdrop-blur-xl border-r border-gray-100">
            {/* Logo Area */}
            <div className="p-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                    Segredinho
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase mt-1">
                    Área de Membros
                </p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  group relative overflow-hidden
                  ${isActive
                                        ? 'bg-green-50 text-green-700 font-semibold'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                `}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"
                                    />
                                )}

                                <Icon size={20} className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'} />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-lg">
                        {nome.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-semibold text-gray-900 truncate">{nome}</p>
                        <button className="text-xs text-gray-500 hover:text-green-600 flex items-center gap-1 transition-colors">
                            <LogOut size={12} /> Sair
                        </button>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings size={18} />
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg bg-white shadow-lg border border-gray-100 text-gray-600 hover:text-green-600 transition-colors"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                {sidebarContent}
            </aside>
        </>
    );
}
