'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function SuccessAnimation() {
    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#10B981', '#059669', '#ECFDF5'],
        });
    }, []);

    return null;
}
