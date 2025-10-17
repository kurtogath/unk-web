'use client';

import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

export default function Dario() {
    return (
        <div className="sections-parent">
            <div className="left">
                <Image
                    src="/people/Dario.png"
                    alt="Dario pixelart"
                    width={200}
                    height={600}
                />
                <SocialIcon
                    url="https://kick.com/darioxgd/"
                    bgColor="transparent"
                />
                <SocialIcon
                    url="https://www.instagram.com/darioxgd/"
                    bgColor="transparent"
                />
                <SocialIcon
                    url="https://www.tiktok.com/@darioxgd"
                    bgColor="transparent"
                />
            </div>
            <div className="right">DarioxGD</div>
        </div>
    );
}
