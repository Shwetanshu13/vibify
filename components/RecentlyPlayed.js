export default function RecentlyPlayed({ items }) {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-500">⏱️</span>
                Recently Played
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map((item, index) => (
                    <div
                        key={`${item.track.id}-${index}`}
                        className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl hover:bg-zinc-800 transition-colors"
                    >
                        <img
                            src={item.track.album.images[0]?.url || '/placeholder.png'}
                            alt={item.track.name}
                            className="w-16 h-16 rounded-lg shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white truncate">{item.track.name}</h3>
                            <p className="text-sm text-gray-400 truncate">
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
