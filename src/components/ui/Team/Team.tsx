'use client';
import dynamic from 'next/dynamic';

const TeamMember = dynamic(() => import('./TeamMembers'), { ssr: false });

import { MEMBERS } from '@/data';

const Team: React.FC = () => {
    return (
        <section className="py-16 px-4 bg-transparent">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-black text-blue-400 text-center mb-20 tracking-wider drop-shadow-lg">
                    UNK GANG
                </h2>

                <div
                    suppressHydrationWarning
                    className="flex justify-center items-end gap-6 md:gap-12"
                >
                    <TeamMember members={MEMBERS} />
                </div>
            </div>
        </section>
    );
};

export default Team;
