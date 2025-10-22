import { mirrorUser } from '@/lib/useMirrorUser';

describe('mirrorUser', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ ok: true }) } as any)
    ) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls mirror endpoint with payload', async () => {
    const payload = { id: 'u1', email: 'a@b.com', user_metadata: { role: 'USER' } };
    const res = await mirrorUser(payload);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/internal/mirror-user',
      expect.objectContaining({ method: 'POST' })
    );
    expect(res).toEqual({ ok: true });
  });
});
