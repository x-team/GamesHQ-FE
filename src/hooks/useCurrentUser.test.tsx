import { renderHook, act } from '@testing-library/react-hooks';
import { checkSession } from '../api/signInAndOut';
import useCurrentUser from '../hooks/useCurrentUser';

jest.mock('../api/signInAndOut');

describe('useCurrentUser', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should initialize with null user and session when localStorage is empty', () => {
    const { result } = renderHook(() => useCurrentUser());

    expect(result.current.currentUser).toBeNull();
    expect(result.current.authenticated).toBeFalsy();
    expect(result.current.isAdmin).toBeFalsy();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isDoingInitialLoading).toBeTruthy();
  });

  it('should load user from localStorage if available', () => {
    const mockUser = { id: '1', name: 'Test User', isAdmin: true };
    const mockSession = { token: 'test-token' };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    localStorage.setItem('session', JSON.stringify(mockSession));

    const { result } = renderHook(() => useCurrentUser());

    expect(result.current.currentUser).toEqual(mockUser);
    expect(result.current.authenticated).toBeTruthy();
    expect(result.current.isAdmin).toBeTruthy();
  });

  it('should fetch session from API if session token is available', async () => {
    const mockSession = { token: 'test-token' };
    localStorage.setItem('session', JSON.stringify(mockSession));

    const mockApiResponse = {
      success: true,
      user: { id: '1', name: 'Test User', isAdmin: false },
      session: { token: 'new-test-token' },
    };
    (checkSession as jest.Mock).mockResolvedValue(mockApiResponse);

    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser());

    await waitForNextUpdate();

    expect(checkSession).toHaveBeenCalledWith('test-token');
    expect(result.current.currentUser).toEqual(mockApiResponse.user);
    expect(result.current.authenticated).toBeTruthy();
    expect(result.current.isAdmin).toBeFalsy();
    expect(localStorage.getItem('currentUser')).toBe(JSON.stringify(mockApiResponse.user));
    expect(localStorage.getItem('session')).toBe(JSON.stringify(mockApiResponse.session));
  });

  it('should handle API error when fetching session', async () => {
    const mockSession = { token: 'test-token' };
    localStorage.setItem('session', JSON.stringify(mockSession));

    (checkSession as jest.Mock).mockResolvedValue({
      success: false,
      message: 'xtu-session-token Header needed',
    });

    const { result, waitForNextUpdate } = renderHook(() => useCurrentUser());

    await waitForNextUpdate();

    expect(checkSession).toHaveBeenCalledWith('test-token');
    expect(result.current.currentUser).toBeNull();
    expect(result.current.authenticated).toBeFalsy();
    expect(result.current.isDoingInitialLoading).toBeFalsy();
  });

  it('should erase user data when eraseUser is called', () => {
    const mockUser = { id: '1', name: 'Test User', isAdmin: true };
    const mockSession = { token: 'test-token' };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    localStorage.setItem('session', JSON.stringify(mockSession));

    const { result } = renderHook(() => useCurrentUser());

    act(() => {
      result.current.eraseUser();
    });

    expect(result.current.currentUser).toBeNull();
    expect(result.current.authenticated).toBeFalsy();
    expect(result.current.isAdmin).toBeFalsy();
    expect(result.current.isDoingInitialLoading).toBeTruthy();
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(localStorage.getItem('session')).toBeNull();
  });
});
