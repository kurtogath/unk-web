// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <section className="text-center">
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
                Error 404
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">
                Página no encontrada
            </h1>
            <p className="mt-3 text-gray-600">
                La URL que has abierto no existe o fue movida.
            </p>

            <div className="unk-btn red">
                <Link
                    href="/"
                    className="rounded-2xl px-4 py-2 shadow hover:shadow-md transition"
                >
                    Volver al inicio
                </Link>
            </div>
        </section>
    );
}
