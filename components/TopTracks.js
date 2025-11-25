export default function TopTracks({ tracks }) {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">🎵</span>
                Your Top Tracks
            </h2>
            <div className="bg-zinc-900 rounded-xl overflow-hidden">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
                    >
                        <span className="text-2xl font-bold text-gray-500 w-8 text-center">
                            {index + 1}
                        </span>
                        <img
                            src={track.album.images[0]?.url || '/placeholder.png'}
                            alt={track.name}
                            className="w-16 h-16 rounded-lg shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">{track.name}</h3>
                            <p className="text-sm text-gray-400 truncate">
                                {track.artists.map(a => a.name).join(', ')}
                            </p>
                        </div>
                        <div className="text-gray-400 text-sm">
                            {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
