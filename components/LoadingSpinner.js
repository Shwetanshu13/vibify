export default function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-xl">Loading your stats...</p>
            </div>
        </div>
    );
}
