'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    DashboardHeader,
    TimeRangeFilter,
    StatsOverview,
    TopArtists,
    TopTracks,
    RecentlyPlayed,
    Playlists,
    LoadingSpinner
} from '../../components';

export default function Dashboard() {
    const router = useRouter();
    const [timeRange, setTimeRange] = useState('medium_term'); // short_term (4 weeks), medium_term (6 months), long_term (all time)
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [listeningStats, setListeningStats] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('spotify_access_token');

        if (!accessToken) {
            router.push('/');
            return;
        }

        fetchAllData(accessToken);
    }, [timeRange]);

    const fetchAllData = async (token) => {
        setLoading(true);
        try {
            const headers = {
                'Authorization': `Bearer ${token}`
            };

            // Fetch user profile
            const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });
            const userData = await userResponse.json();

            if (userResponse.status === 401) {
                localStorage.removeItem('spotify_access_token');
                localStorage.removeItem('spotify_refresh_token');
                router.push('/');
                return;
            }

            setUserData(userData);

            // Fetch top artists
            const artistsResponse = await fetch(
                `https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timeRange}`,
                { headers }
            );
            const artistsData = await artistsResponse.json();
            setTopArtists(artistsData.items || []);

            // Fetch top tracks
            const tracksResponse = await fetch(
                `https://api.spotify.com/v1/me/top/tracks?limit=20&time_range=${timeRange}`,
                { headers }
            );
            const tracksData = await tracksResponse.json();
            setTopTracks(tracksData.items || []);

            // Fetch recently played
            const recentResponse = await fetch(
                'https://api.spotify.com/v1/me/player/recently-played?limit=10',
                { headers }
            );
            const recentData = await recentResponse.json();
            setRecentlyPlayed(recentData.items || []);

            // Fetch playlists
            const playlistsResponse = await fetch(
                'https://api.spotify.com/v1/me/playlists?limit=10',
                { headers }
            );
            const playlistsData = await playlistsResponse.json();
            setPlaylists(playlistsData.items || []);

            // Calculate listening stats
            const stats = calculateListeningStats(tracksData.items || [], artistsData.items || []);
            setListeningStats(stats);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateListeningStats = (tracks, artists) => {
        const totalDuration = tracks.reduce((sum, track) => sum + track.duration_ms, 0);
        const genres = new Set();
        artists.forEach(artist => {
            artist.genres.forEach(genre => genres.add(genre));
        });

        return {
            totalListeningTime: totalDuration,
            totalTracks: tracks.length,
            totalArtists: artists.length,
            uniqueGenres: genres.size,
            avgTrackDuration: tracks.length > 0 ? totalDuration / tracks.length : 0
        };
    };

    const handleLogout = () => {
        localStorage.removeItem('spotify_access_token');
        localStorage.removeItem('spotify_refresh_token');
        router.push('/');
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <DashboardHeader userData={userData} onLogout={handleLogout} />
            <TimeRangeFilter timeRange={timeRange} onTimeRangeChange={setTimeRange} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                <StatsOverview listeningStats={listeningStats} />
                <TopArtists artists={topArtists} />
                <TopTracks tracks={topTracks} />
                <RecentlyPlayed items={recentlyPlayed} />
                <Playlists playlists={playlists} />
            </main>
        </div>
    );
}
