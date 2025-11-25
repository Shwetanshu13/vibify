# 🎵 VibiFy

**VibiFy** is a beautiful, modern web application that visualizes your Spotify listening habits. Discover your top artists, tracks, playlists, and detailed listening statistics with an elegant dark-mode interface.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- 🎨 **Beautiful Dark Mode UI** - Sleek, modern interface with smooth animations
- 📊 **Listening Statistics** - View total listening time, track counts, and genre diversity
- 🎤 **Top Artists** - See your most-played artists with rankings
- 🎵 **Top Tracks** - Discover your favorite songs across different time periods
- ⏱️ **Recently Played** - Track your recent listening history
- 📚 **Playlists Overview** - Quick access to all your Spotify playlists
- ⏰ **Time Range Filters** - Switch between Last 4 Weeks, Last 6 Months, or All Time
- 📱 **Fully Responsive** - Perfect experience on mobile, tablet, and desktop

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- A Spotify Developer Account
- pnpm, npm, or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vibify.git
cd vibify
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Set Up Spotify API

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Note your **Client ID** and **Client Secret**
4. Add `http://localhost:3000/callback` to your Redirect URIs

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:3000/callback
```

### 5. Run the Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see VibiFy in action! 🎉

## 🏗️ Project Structure

```
vibify/
├── app/
│   ├── api/
│   │   ├── callback/      # OAuth callback handler
│   │   └── login/         # Spotify login endpoint
│   ├── callback/          # Callback page component
│   ├── dashboard/         # Main dashboard page
│   ├── layout.js          # Root layout
│   ├── page.js            # Landing page
│   └── globals.css        # Global styles
├── components/
│   ├── DashboardHeader.js # Header with user info
│   ├── TimeRangeFilter.js # Time period selector
│   ├── StatsOverview.js   # Statistics cards
│   ├── TopArtists.js      # Top artists grid
│   ├── TopTracks.js       # Top tracks list
│   ├── RecentlyPlayed.js  # Recent tracks
│   ├── Playlists.js       # Playlists grid
│   ├── LoadingSpinner.js  # Loading state
│   └── index.js           # Component exports
└── public/                # Static assets
```

## 🎯 Usage

1. **Login** - Click "Login with Spotify" on the landing page
2. **Authorize** - Grant VibiFy access to your Spotify data
3. **Explore** - View your personalized music dashboard
4. **Filter** - Switch between different time ranges to see how your taste evolves
5. **Discover** - Click on playlists to open them in Spotify

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - UI library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Spotify Web API](https://developer.spotify.com/documentation/web-api)** - Music data source

## 📱 Responsive Design

VibiFy is fully responsive and optimized for:

- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktop (1024px and up)
- 🖥️ Large screens (1280px and up)

## 🔒 Privacy & Security

- All authentication is handled through Spotify's OAuth 2.0
- Access tokens are stored locally in your browser
- No user data is stored on any server
- All API requests are made directly to Spotify's servers

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy VibiFy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add your environment variables in Vercel dashboard
4. Update your Spotify app's Redirect URI to your production URL
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

VibiFy can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

Remember to update your Redirect URI and environment variables!

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Spotify for their excellent Web API
- Next.js team for the amazing framework
- The open-source community

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

---

Made with ❤️ and 🎵 by VibiFy
