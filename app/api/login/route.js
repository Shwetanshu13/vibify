

export async function GET(request) {
    const CLIENT_ID = process.env.CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const scope = 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-follow-read user-library-read user-top-read';
    const state = generateRandomString(16);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
    });
    return Response.redirect('https://accounts.spotify.com/authorize?' + params.toString());
}

const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

