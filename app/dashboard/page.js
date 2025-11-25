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

            // Fetch top tracks (increase sample size)
            const tracksResponse = await fetch(
                `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`,
                { headers }
            );
            const tracksData = await tracksResponse.json();
            setTopTracks(tracksData.items || []);

            // Fetch recently played (use larger sample to estimate listening rate)
            const recentResponse = await fetch(
                'https://api.spotify.com/v1/me/player/recently-played?limit=50',
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

            // Calculate listening stats (use recently played to estimate listening time)
            const stats = calculateListeningStats(tracksData.items || [], artistsData.items || [], recentData.items || [], timeRange);
            setListeningStats(stats);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateListeningStats = (tracks, artists, recentlyPlayed, timeRange) => {
        // total duration of top tracks
        const totalDurationTop = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);

        // collect unique genres
        const genres = new Set();
        artists.forEach(artist => {
            (artist.genres || []).forEach(genre => genres.add(genre));
        });

        // Estimate listening time
        let estimatedMs = 0;
        let useRecentPlays = false;

        try {
            if (recentlyPlayed && recentlyPlayed.length >= 10) {
                const timestamps = recentlyPlayed
                    .map(item => item.played_at ? new Date(item.played_at).getTime() : null)
                    .filter(t => t !== null && !isNaN(t))
                    .sort((a, b) => a - b);

                if (timestamps.length >= 10) {
                    const recentTotalMs = recentlyPlayed.reduce((s, it) => s + (it.track?.duration_ms || 0), 0);
                    const earliest = timestamps[0];
                    const latest = timestamps[timestamps.length - 1];
                    const timeSpanHours = Math.max(1, (latest - earliest) / (1000 * 60 * 60));

                    // Only use recent plays if we have at least 12 hours of data
                    if (timeSpanHours >= 12) {
                        const avgMsPerHour = recentTotalMs / timeSpanHours;

                        const hoursMap = {
                            short_term: 28 * 24,      // 4 weeks
                            medium_term: 182 * 24,    // 6 months
                            long_term: 365 * 24       // 1 year
                        };

                        const hours = hoursMap[timeRange] || hoursMap['medium_term'];
                        estimatedMs = avgMsPerHour * hours;
                        useRecentPlays = true;
                    }
                }
            }

            // Fallback: use a multiplier on top tracks duration
            if (!useRecentPlays && totalDurationTop > 0) {
                const multipliers = {
                    short_term: 3,      // assume each top track played ~3 times in 4 weeks
                    medium_term: 8,     // assume ~8 times in 6 months
                    long_term: 15       // assume ~15 times over all time
                };
                estimatedMs = totalDurationTop * (multipliers[timeRange] || 5);
            }
        } catch (e) {
            console.warn('Error estimating listening time:', e);
            // Ultimate fallback
            estimatedMs = totalDurationTop * 5;
        }

        return {
            totalListeningTime: Math.round(estimatedMs),
            totalTracks: tracks.length,
            totalArtists: artists.length,
            uniqueGenres: genres.size,
            avgTrackDuration: tracks.length > 0 ? totalDurationTop / tracks.length : 0,
            sampleSizeRecentlyPlayed: recentlyPlayed?.length || 0,
            estimationMethod: useRecentPlays ? 'recent' : 'multiplier'
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
                <TopTracks tracks={topTracks.slice(0, 20)} />
                <RecentlyPlayed items={recentlyPlayed.slice(0, 10)} />
                <Playlists playlists={playlists} />
            </main>
        </div>
    );
}
