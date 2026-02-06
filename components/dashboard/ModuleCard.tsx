'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lock, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ModuleCardProps {
    title: string;
    description: string;
    icon: string;
    iconBg: string;
    href: string;
    status: 'active' | 'unlocked' | 'locked' | 'coming-soon';
    badge?: string;
}

export default function ModuleCard({
    title,
    description,
    icon,
    iconBg,
    href,
    status,
    badge
}: ModuleCardProps) {

    const isClickable = status === 'active' || status === 'unlocked';

    const card = (
        <motion.div
            whileHover={isClickable ? { y: -4, scale: 1.02 } : {}}
            whileTap={isClickable ? { scale: 0.98 } : {}}
            className={`
        relative group
        bg-white rounded-2xl p-6
        border border-gray-100
        shadow-sm hover:shadow-xl
        transition-all duration-300
        ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}
      `}
        >
            {/* Badge */}
            {badge && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                    {badge}
                </div>
            )}

            {/* Icon */}
            <div className={`
        w-14 h-14 rounded-xl
        bg-gradient-to-br ${iconBg}
        flex items-center justify-center
        text-3xl
        mb-4
        group-hover:scale-110 transition-transform
        shadow-lg
      `}>
                {status === 'locked' ? <Lock className="w-6 h-6 text-white" /> : icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                {title}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className={`
          text-xs font-semibold
          ${status === 'active' ? 'text-green-600' : ''}
          ${status === 'unlocked' ? 'text-blue-600' : ''}
          ${status === 'locked' ? 'text-gray-400' : ''}
          ${status === 'coming-soon' ? 'text-orange-500' : ''}
        `}>
                    {status === 'active' && '● Ativo'}
                    {status === 'unlocked' && '✓ Liberado'}
                    {status === 'locked' && '🔒 Bloqueado'}
                    {status === 'coming-soon' && '⏳ Em breve'}
                </span>

                {isClickable && (
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                )}
            </div>

            {/* Hover Gradient Overlay */}
            {isClickable && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 rounded-2xl transition-all" />
            )}
        </motion.div>
    );

    return isClickable ? <Link href={href}>{card}</Link> : card;
}
