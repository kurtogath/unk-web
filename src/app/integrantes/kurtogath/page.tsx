'use client';

import Image from 'next/image';
import { SocialIcon } from 'react-social-icons/component';

export default function Tresillo() {
    return (
        <div className="sections-parent">
            <div className="left">
                <Image
                    src="/people/Dario3.png"
                    alt="Tresillo pixelart"
                    width={200}
                    height={600}
                />
                <SocialIcon url="https://www.instagram.com/kurtogath/" />
                <SocialIcon url="https://www.twitch.tv/kurtogath/" />
                <SocialIcon url="https://www.tiktok.com/@kurtogath" />
            </div>
            <div className="right">Kurtogath</div>
        </div>
    );
}
