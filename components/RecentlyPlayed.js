export default function RecentlyPlayed({ items }) {
    return (
        <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">⏱️</span>
                Recently Played
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {items.map((item, index) => (
                    <div
                        key={`${item.track.id}-${index}`}
                        className="flex items-center gap-3 sm:gap-4 bg-zinc-900 p-3 sm:p-4 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                        <img
                            src={item.track.album.images[0]?.url || '/placeholder.png'}
                            alt={item.track.name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate text-sm sm:text-base">{item.track.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-400 truncate">
                                {item.track.artists.map(a => a.name).join(', ')}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(item.played_at).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
