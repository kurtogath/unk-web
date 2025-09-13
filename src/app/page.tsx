'use client';

import Calendar from '@/components/Calendar';
import SwiperCarousel from '@/components/ui/SwiperCarrousel';
import VerticalCard from '@/components/ui/VerticalCard';
import { MEMBERS } from '@/data';

export default function App() {
    return (
        <>
            {/* CARROUSEL */}
            <section className="frame h-72 md:h-80 p-4 flex items-center justify-center">
                <SwiperCarousel className="rounded-xl overflow-hidden">
                    <div className="h-56 md:h-72 grid place-items-center bg-zinc-800">
                        Snippets musicales
                    </div>
                    <div className="h-56 md:h-72 grid place-items-center bg-zinc-800">
                        Trailers para nada falsos
                    </div>
                    <div className="h-56 md:h-72 grid place-items-center bg-zinc-800">
                        Drops ropa DarioxGD
                    </div>
                    <div className="h-56 md:h-72 grid place-items-center bg-zinc-800">
                        Videogames
                    </div>
                </SwiperCarousel>
            </section>

            {/* PROYECTOS */}
            <section>
                <h2 className="title text-xl mb-4">Proyectos</h2>
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="card">
                        <img
                            src="cards/BatallasDeGallos.png"
                            alt="BatallaDeGallos"
                        />
                    </div>
                    <div className="card">
                        <img src="cards/JuegoDeMesa.jpg" alt="Juegos de mesa" />
                    </div>
                    <div className="card">
                        <img
                            src="cards/BatallasDeGallos.png"
                            alt="BatallaDeGallos"
                        />
                    </div>
                </div>
            </section>

            {/* UNK TV + CALENDARIO */}
            <section className="grid gap-8 md:grid-cols-3 items-start">
                <div className="flex items-center">
                    <div className="rounded-xl2 p-6 bg-gradient-to-br from-pop to-pink-500 font-extrabold text-4xl">
                        <img src="icon.webp" alt="UNK TV" />
                    </div>
                    <div className="space-y-4">
                        <div className="frame h-12 p-3 border-2 border-solid">
                            Game Night
                        </div>
                        <div className="frame h-12 p-3 border-2 border-solid">
                            Pasapalabro
                        </div>
                        <div className="frame h-12 p-3 border-2 border-solid">
                            Podcast
                        </div>
                    </div>
                </div>
                <div className="flex md:justify-end"></div>
                <div className="flex md:justify-end">
                    <Calendar />
                </div>
            </section>

            {/* UNK GANG */}
            <section>
                <h2 className="uppercase tracking-widest text-sm opacity-70 mb-4">
                    Equipo
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {MEMBERS.map((unkGang) => (
                        <VerticalCard
                            key={unkGang.name}
                            name={unkGang.name}
                            imageSrc={unkGang.img}
                            web={unkGang.slug}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}
