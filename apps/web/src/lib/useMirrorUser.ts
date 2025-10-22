export async function mirrorUser(payload: {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}) {
  // Calls an internal server route which validates the user's token and upserts the user server-side.
  const res = await fetch('/api/internal/mirror-user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}
