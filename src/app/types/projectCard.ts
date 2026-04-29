export type ProjectCard = {
    id: number;
    locked?: boolean;
    featured?: boolean;
    title: string;
    timer?: string;
    size?: 'default' | 'mid' | 'bottom';
    tilt: 'tilt1' | 'tilt2' | 'tilt3' | 'tilt4';
    image: string;
    link?: string;
};
