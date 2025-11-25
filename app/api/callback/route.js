

export async function GET(request, response) {
  const code = request.nextUrl.searchParams.get('code') || null;
  const state = request.nextUrl.searchParams.get('state') || null;
  const redirect_uri = process.env.REDIRECT_URI;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  if (state === null) {
    return Response.redirect('/#' +
      new URLSearchParams({
        error: 'state_mismatch'
      }).toString());
  }

  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    body: new URLSearchParams({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    })
  };
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOptions);
  const tokenData = await tokenResponse.json();
  return new Response(JSON.stringify(tokenData), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
