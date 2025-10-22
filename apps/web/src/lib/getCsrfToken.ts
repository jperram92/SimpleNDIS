export async function getCsrfToken(): Promise<string> {
  try {
    const res = await fetch('/api/csrf-token');
    if (!res.ok) return '';
    const data = await res.json();
    return data?.csrfToken ?? '';
  } catch (err) {
    return '';
  }
}
