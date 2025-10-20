import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../app/auth/signin/page';
import { signIn, getSession, getCsrfToken } from 'next-auth/react';

// Mock next-auth
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;
const mockGetSession = getSession as jest.MockedFunction<typeof getSession>;
const mockGetCsrfToken = getCsrfToken as jest.MockedFunction<typeof getCsrfToken>;

describe('SignIn Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful CSRF token fetch
    mockGetCsrfToken.mockResolvedValue('test-csrf-token-123');

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
      expect(mockGetCsrfToken).toHaveBeenCalled();
    });

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('should fetch CSRF token on component mount', async () => {
    render(<SignIn />);

    await waitFor(() => {
      expect(mockGetCsrfToken).toHaveBeenCalled();
    });
  });

  it('should handle successful signin flow', async () => {
    const user = userEvent.setup();
    render(<SignIn />);

    // Wait for CSRF token to be fetched
    await waitFor(() => {
      expect(mockGetCsrfToken).toHaveBeenCalled();
    });

    // Fill in the form
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'ValidPass123!');
    await user.click(submitButton);

    // Verify signIn was called with correct parameters
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'ValidPass123!',
        redirect: false,
      });
    });

    // Verify session was retrieved
    expect(mockGetSession).toHaveBeenCalled();
  });

  it('should handle CSRF token fetch failure', async () => {
    // Mock failed CSRF token fetch
    mockGetCsrfToken.mockRejectedValueOnce(new Error('Network error'));

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

  it('should include CSRF token in form and handle submission', async () => {
    const user = userEvent.setup();
    render(<SignIn />);

    // Wait for initial CSRF token fetch
    await waitFor(() => {
      expect(mockGetCsrfToken).toHaveBeenCalled();
    });

    // Fill in the form
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'ValidPass123!');
    await user.click(submitButton);

    // Verify CSRF token is included in the form as hidden input
    const csrfInput = screen.getByDisplayValue('test-csrf-token-123');
    expect(csrfInput).toHaveAttribute('type', 'hidden');
    expect(csrfInput).toHaveAttribute('name', 'csrfToken');

    // Verify signIn was called without csrfToken parameter (NextAuth handles it automatically)
    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      email: 'test@example.com',
      password: 'ValidPass123!',
      redirect: false,
    });
  });
});
