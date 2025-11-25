export default function TopArtists({ artists }) {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">🎤</span>
                Your Top Artists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {artists.map((artist, index) => (
                    <div key={artist.id} className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition-all cursor-pointer group">
                        <div className="relative mb-3">
                            <img
                                src={artist.images[0]?.url || '/placeholder.png'}
                                alt={artist.name}
                                className="w-full aspect-square object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform"
                            />
                            <div className="absolute -top-2 -left-2 bg-green-500 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="font-semibold text-white truncate">{artist.name}</h3>
                        <p className="text-sm text-gray-400 truncate">
                            {artist.genres[0] || 'Artist'}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
