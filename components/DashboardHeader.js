export default function DashboardHeader({ userData, onLogout }) {
    return (
        <header className="bg-gradient-to-r from-green-600 to-green-800 p-4 sm:p-6 shadow-lg">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    {userData?.images?.[0] ? (
                        <img
                            src={userData.images[0].url}
                            alt={userData.display_name}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 sm:border-4 border-white"
                        />
                    ) : (
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl sm:text-2xl font-bold">
                            {userData?.display_name?.[0] || 'U'}
                        </div>
                    )}
                    <div className="text-center sm:text-left">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{userData?.display_name}'s Stats</h1>
                        <p className="text-sm sm:text-base text-green-100">Your music wrapped</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
