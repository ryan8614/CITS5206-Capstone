import { encrypt, decrypt, createSession, updateSession, deleteSession, checkSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

// Mock the 'next/headers' and 'jose' modules
jest.mock('next/headers', () => ({
    cookies: jest.fn(),
}));

jest.mock('jose', () => ({
    SignJWT: jest.fn(() => ({
        setProtectedHeader: jest.fn(() => ({
            setIssuedAt: jest.fn(() => ({
                setExpirationTime: jest.fn(() => ({
                    sign: jest.fn().mockResolvedValue('mocked_jwt'),
                })),
            })),
        })),
    })),
    jwtVerify: jest.fn().mockResolvedValue({ payload: { userId: 'testUser', expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000) } }),
}));

describe('Session Management Tests', () => {
    const mockCookies = {
        get: jest.fn(),
        set: jest.fn(),
        delete: jest.fn(),
    };

    beforeEach(() => {
        (cookies as jest.Mock).mockReturnValue(mockCookies);
        jest.clearAllMocks();
    });

    describe('encrypt', () => {
        it('should encrypt the payload and return a JWT', async () => {
            const payload = { userId: 'testUser', expiresAt: new Date() };
            const jwt = await encrypt(payload);
            expect(SignJWT).toHaveBeenCalledWith(payload);
            expect(jwt).toBe('mocked_jwt');
        });
    });

    describe('decrypt', () => {
        it('should decrypt the JWT and return the payload', async () => {
            const session = 'valid_jwt';
            const payload = await decrypt(session);
            expect(jwtVerify).toHaveBeenCalledWith(session, expect.any(Uint8Array), { algorithms: ['HS256'] });
            expect(payload).toEqual({ userId: 'testUser', expiresAt: expect.any(Date) });
        });

        it('should return undefined if JWT verification fails', async () => {
            (jwtVerify as jest.Mock).mockRejectedValue(new Error('Invalid JWT'));
            const session = 'invalid_jwt';
            const payload = await decrypt(session);
            expect(payload).toBeUndefined();
        });

        it('should return undefined if session is undefined', async () => {
            const payload = await decrypt(undefined);
            expect(jwtVerify).not.toHaveBeenCalled();
            expect(payload).toBeUndefined();
        });
    });

    describe('createSession', () => {
        it('should create a new session and set the cookie', async () => {
            const userId = 'testUser';
            await createSession(userId);
            expect(encrypt).toHaveBeenCalledWith({ userId: userId, expiresAt: expect.any(Date) });
            expect(mockCookies.set).toHaveBeenCalledWith('session', 'mocked_jwt', {
                httpOnly: true,
                secure: true,
                expires: expect.any(Date),
                sameSite: 'lax',
                path: '/',
            });
        });
    });

    describe('updateSession', () => {
        it('should update the session and set the cookie with a new expiration time', async () => {
            mockCookies.get.mockReturnValue({ value: 'existing_jwt' });
            await updateSession();
            expect(decrypt).toHaveBeenCalledWith('existing_jwt');
            expect(mockCookies.set).toHaveBeenCalledWith('session', 'existing_jwt', {
                httpOnly: true,
                secure: true,
                expires: expect.any(Date),
                sameSite: 'lax',
                path: '/',
            });
        });

        it('should not update the session if the session cookie is missing', async () => {
            mockCookies.get.mockReturnValue(undefined);
            await updateSession();
            expect(decrypt).not.toHaveBeenCalled();
            expect(mockCookies.set).not.toHaveBeenCalled();
        });

        it('should not update the session if the session payload is invalid', async () => {
            mockCookies.get.mockReturnValue({ value: 'invalid_jwt' });
            (jwtVerify as jest.Mock).mockRejectedValue(new Error('Invalid JWT'));
            await updateSession();
            expect(decrypt).toHaveBeenCalledWith('invalid_jwt');
            expect(mockCookies.set).not.toHaveBeenCalled();
        });
    });

    describe('deleteSession', () => {
        it('should delete the session cookie', async () => {
            await deleteSession();
            expect(mockCookies.delete).toHaveBeenCalledWith('session');
        });
    });

    describe('checkSession', () => {
        it('should return true if the user is signed in', async () => {
            mockCookies.get.mockReturnValue({ value: 'valid_jwt' });
            const isLoggedIn = await checkSession();
            expect(decrypt).toHaveBeenCalledWith('valid_jwt');
            expect(isLoggedIn).toBe(true);
        });

        it('should return false if the user is not signed in (no token)', async () => {
            mockCookies.get.mockReturnValue(undefined);
            const isLoggedIn = await checkSession();
            expect(decrypt).not.toHaveBeenCalled();
            expect(isLoggedIn).toBe(false);
        });

        it('should return false if the user is not signed in (invalid token)', async () => {
            mockCookies.get.mockReturnValue({ value: 'invalid_jwt' });
            (jwtVerify as jest.Mock).mockRejectedValue(new Error('Invalid JWT'));
            const isLoggedIn = await checkSession();
            expect(decrypt).toHaveBeenCalledWith('invalid_jwt');
            expect(isLoggedIn).toBe(false);
        });
    });
});
