'use client';

import Image from 'next/image';
import { SocialIcon } from 'react-social-icons/component';

export default function Tresillo() {
    return (
        <div className="sections-parent">
            <div className="left">
                <Image
                    src="/people/Dario2.png"
                    alt="Tresillo pixelart"
                    width={200}
                    height={600}
                />
                <SocialIcon url="https://kick.com/tresilloo/" />
                <SocialIcon url="https://www.instagram.com/tresilloo" />
                <SocialIcon url="https://www.tiktok.com/@tresilloo" />
            </div>
            <div className="right">Tresilloo, el hondureño</div>
        </div>
    );
}
