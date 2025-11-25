export default function TimeRangeFilter({ timeRange, onTimeRangeChange }) {
    const getTimeRangeLabel = (range) => {
        switch (range) {
            case 'short_term': return 'Last 4 Weeks';
            case 'medium_term': return 'Last 6 Months';
            case 'long_term': return 'All Time';
            default: return 'Last 6 Months';
        }
    };

    return (
        <div className="bg-zinc-900 border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex gap-4">
                    {['short_term', 'medium_term', 'long_term'].map((range) => (
                        <button
                            key={range}
                            onClick={() => onTimeRangeChange(range)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${timeRange === range
                                    ? 'bg-green-600 text-white'
                                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                                }`}
                        >
                            {getTimeRangeLabel(range)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
