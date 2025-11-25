export default function DashboardHeader({ userData, onLogout }) {
    return (
        <header className="bg-gradient-to-r from-green-600 to-green-800 p-6 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {userData?.images?.[0] ? (
                        <img
                            src={userData.images[0].url}
                            alt={userData.display_name}
                            className="w-16 h-16 rounded-full border-4 border-white"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold">
                            {userData?.display_name?.[0] || 'U'}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">{userData?.display_name}'s Stats</h1>
                        <p className="text-green-100">Your music wrapped</p>
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
