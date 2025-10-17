import type { Member } from '@/types/index';
import Link from 'next/link';
import React, { useState } from 'react';

interface TeamMemberProps {
    members: Member[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ members }) => {
    const [hoveredMember, setHoveredMember] = useState<string | null>(null);

    return (
        <>
            {/* Team Members */}
            {members.map((member, index) => {
                const memberName = member.name.toUpperCase();
                const isHovered = hoveredMember === member.slug;

                return (
                    <div
                        key={member.slug}
                        className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredMember(member.slug)}
                        onMouseLeave={() => setHoveredMember(null)}
                        onClick={() => {
                            console.log(`Navigate to ${member.slug}`);
                        }}
                    >
                        <Link role="menuitem" href={`${member.slug}`}>
                            {/* Background Column - Solo aparece en hover */}
                            <div
                                className={`absolute bottom-0 w-24 md:w-32 transition-all duration-500 ease-out rounded-t-lg ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                                style={{
                                    backgroundColor: member.color,
                                    height: '320px',
                                    filter: 'brightness(1.2)',
                                    boxShadow: `0 0 30px ${member.color}80, 0 10px 50px ${member.color}40`,
                                }}
                            />

                            {/* Character Container */}
                            <div className="relative w-24 md:w-32 h-64 md:h-80 flex items-end justify-center">
                                {/* Silueta coloreada (estado por defecto) */}
                                <div
                                    className={`absolute bottom-0 w-20 md:w-28 h-56 md:h-72 overflow-hidden transition-all duration-500 ease-out ${
                                        isHovered
                                            ? 'opacity-0 scale-110'
                                            : 'opacity-100'
                                    }`}
                                >
                                    {/* Capa coloreada usando la máscara del PNG */}
                                    <div
                                        className="w-full h-full"
                                        style={{
                                            // Color que quieres aplicar SOLO al personaje
                                            backgroundColor: member.color,

                                            // Usamos la imagen como máscara (respeta la transparencia)
                                            WebkitMaskImage: `url(${member.img})`,
                                            WebkitMaskRepeat: 'no-repeat',
                                            WebkitMaskPosition: 'center',
                                            WebkitMaskSize: 'contain',
                                            maskImage: `url(${member.img})`,
                                            maskRepeat: 'no-repeat',
                                            maskPosition: 'center',
                                            maskSize: 'contain',

                                            // Mantener look pixel-art
                                            imageRendering: 'pixelated',
                                        }}
                                    />
                                </div>

                                {/* Imagen a color (estado hover) */}
                                <div
                                    className={`absolute inset-0 flex items-end justify-center transition-all duration-500 ease-out ${
                                        isHovered
                                            ? 'opacity-100 scale-100'
                                            : 'opacity-0 scale-90'
                                    }`}
                                >
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="h-full w-full object-contain"
                                        style={{
                                            imageRendering: 'pixelated',
                                            filter: 'brightness(1.1) contrast(1.2) saturate(1.1)',
                                            pointerEvents: 'none',
                                        }}
                                    />
                                </div>

                                {/* Name Label */}
                                {/* {isHovered && (
                                <div className="absolute -top-6 md:-top-8 left-1/2 transform -translate-x-1/2 animate-fadeIn z-10">
                                    <div
                                        className="px-2 md:px-3 py-1 rounded-md text-white font-bold text-xs md:text-sm border-2 shadow-lg whitespace-nowrap"
                                        style={{
                                            backgroundColor: member.color,
                                            borderColor: 'white',
                                            textShadow:
                                                '0 1px 2px rgba(0,0,0,0.8)',
                                        }}
                                    >
                                        {memberName}
                                    </div>
                                </div>
                            )} */}
                            </div>

                            {/* Special highlight for center character */}
                            {isHovered && (
                                <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                                    <div
                                        className="px-3 md:px-4 py-2 rounded-lg text-black font-black text-sm md:text-lg border-4 shadow-2xl whitespace-nowrap"
                                        style={{
                                            backgroundColor: member.color,
                                            borderColor: 'white',
                                            textShadow:
                                                '0 2px 4px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        {memberName}
                                    </div>
                                </div>
                            )}
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default TeamMember;
