export default function StatsOverview({ listeningStats }) {
    const formatDuration = (ms) => {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        return `${hours}h ${minutes}m`;
    };

    if (!listeningStats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xs sm:text-sm font-semibold text-green-100 mb-2">Total Listening Time</h3>
                <p className="text-2xl sm:text-3xl font-bold">{formatDuration(listeningStats.totalListeningTime)}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xs sm:text-sm font-semibold text-purple-100 mb-2">Top Tracks</h3>
                <p className="text-2xl sm:text-3xl font-bold">{listeningStats.totalTracks}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xs sm:text-sm font-semibold text-pink-100 mb-2">Top Artists</h3>
                <p className="text-2xl sm:text-3xl font-bold">{listeningStats.totalArtists}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 sm:p-6 rounded-xl shadow-lg">
                <h3 className="text-xs sm:text-sm font-semibold text-blue-100 mb-2">Unique Genres</h3>
                <p className="text-2xl sm:text-3xl font-bold">{listeningStats.uniqueGenres}</p>
            </div>
        </div>
    );
}
