export default function TopTracks({ tracks }) {
    return (
        <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">🎵</span>
                Your Top Tracks
            </h2>
            <div className="bg-zinc-900 rounded-xl overflow-hidden">
                {tracks.map((track, index) => (
                    <div
                        key={track.id}
                        className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 hover:bg-zinc-800 transition-colors border-b border-zinc-800 last:border-b-0"
                    >
                        <span className="text-lg sm:text-2xl font-bold text-gray-500 w-6 sm:w-8 text-center flex-shrink-0">
                            {index + 1}
                        </span>
                        <img
                            src={track.album.images[0]?.url || '/placeholder.png'}
                            alt={track.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate text-sm sm:text-base">{track.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">
                                {track.artists.map(a => a.name).join(', ')}
                            </p>
                        </div>
                        <div className="text-gray-400 text-xs sm:text-sm flex-shrink-0">
                            {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
