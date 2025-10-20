import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../app/auth/signin/page';
import { signIn, getSession } from 'next-auth/react';

// Mock next-auth
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockGetSession = getSession as jest.MockedFunction<typeof getSession>;

// Mock fetch for CSRF token
const mockFetch = global.fetch as jest.MockedFunction<typeof global.fetch>;

describe('SignIn Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful CSRF token fetch
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({ csrfToken: 'test-csrf-token-123' }),
    } as Response);

    // Mock successful signin
    mockSignIn.mockResolvedValue({
      ok: true,
      error: null,
      status: 200,
      url: null,
    });

    // Mock session retrieval
    mockGetSession.mockResolvedValue({
      user: {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  });

  it('should render signin form with all required elements', async () => {
    render(<SignIn />);

    // Wait for CSRF token to be fetched
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/csrf-token');
    });

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('should fetch CSRF token on component mount', async () => {
    render(<SignIn />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/csrf-token');
    });
  });

  it('should handle successful signin flow', async () => {
    const user = userEvent.setup();
    render(<SignIn />);

    // Wait for CSRF token to be fetched
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/csrf-token');
    });

    // Fill in the form
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'ValidPass123!');
    await user.click(submitButton);

    // Verify signIn was called with correct parameters including CSRF token
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'ValidPass123!',
        csrfToken: 'test-csrf-token-123',
        redirect: false,
      });
    });

    // Verify session was retrieved
    expect(mockGetSession).toHaveBeenCalled();
  });

  it('should handle CSRF token fetch failure', async () => {
    // Mock failed CSRF token fetch
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<SignIn />);

    // Wait for error message to appear
    await waitFor(() => {
      expect(
        screen.getByText('Failed to initialize security token. Please refresh the page.')
      ).toBeInTheDocument();
    });

    // Verify submit button is disabled
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toBeDisabled();
  });

  it('should include CSRF token in form submission', async () => {
    const user = userEvent.setup();
    render(<SignIn />);

    // Wait for CSRF token to be fetched
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/csrf-token');
    });

    // Fill in the form
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'ValidPass123!');
    await user.click(submitButton);

    // Verify CSRF token is included in the signin call
    await waitFor(() => {
      const signInCall = mockSignIn.mock.calls[0][1];
      expect(signInCall).toHaveProperty('csrfToken', 'test-csrf-token-123');
    });
  });
});
