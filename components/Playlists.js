export default function Playlists({ playlists }) {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">📚</span>
                Your Playlists
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {playlists.map((playlist) => (
                    <a
                        key={playlist.id}
                        href={playlist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition-all cursor-pointer group"
                    >
                        <img
                            src={playlist.images[0]?.url || '/placeholder.png'}
                            alt={playlist.name}
                            className="w-full aspect-square object-cover rounded-lg shadow-lg mb-3 group-hover:scale-105 transition-transform"
                        />
                        <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">{playlist.tracks.total} tracks</p>
                    </a>
                ))}
            </div>
        </section>
    );
}
