import middleware from '@/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';

// Mock the modules and functions used in the middleware
jest.mock('next/server', () => ({
    NextResponse: {
        redirect: jest.fn(),
        next: jest.fn()
    },
    NextRequest: jest.fn()
}));

jest.mock('@/lib/session', () => ({
    decrypt: jest.fn()
}));

jest.mock('next/headers', () => ({
    cookies: jest.fn()
}));

describe('Middleware Unit Tests', () => {
    let req: NextRequest;
    let res: NextResponse;
    const mockedCookies = {
        get: jest.fn()
    };

    beforeEach(() => {
        (NextResponse.redirect as jest.Mock).mockClear();
        (NextResponse.next as jest.Mock).mockClear();
        (decrypt as jest.Mock).mockClear();
        (cookies as jest.Mock).mockReturnValue(mockedCookies);

        // Mock NextRequest and NextResponse objects
        req = {
            nextUrl: {
                pathname: '/',
                origin: 'http://localhost:3000'
            }
        } as any;
        res = {} as any;
    });

    it('should redirect to /signin if a protected route is accessed and the user is not authenticated', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: 'test_session' });
        (decrypt as jest.Mock).mockResolvedValue(null);
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/signin', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });

    it('should redirect to /auth/excel-edit if a public route is accessed and the user is authenticated', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: 'test_session' });
        (decrypt as jest.Mock).mockResolvedValue({ userId: 'testUser' });
        (req.nextUrl as any).pathname = '/login';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/auth/excel-edit', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });

    it('should call NextResponse.next() if a public route is accessed and the user is not authenticated', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue(undefined);
        (decrypt as jest.Mock).mockResolvedValue(null);
        (req.nextUrl as any).pathname = '/';

        await middleware(req);

        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it('should call NextResponse.next() if a protected route is accessed and the user is authenticated', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: 'test_session' });
        (decrypt as jest.Mock).mockResolvedValue({ userId: 'testUser' });
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it('should handle the case where the session cookie is missing', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue(undefined);
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/signin', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });

    it('should handle the case where decrypt returns an error', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: 'test_session' });
        (decrypt as jest.Mock).mockRejectedValue(new Error('Decryption error'));
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/signin', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });

    it('should call NextResponse.next() for non-protected and non-public routes', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: 'test_session' });
        (decrypt as jest.Mock).mockResolvedValue({ userId: 'testUser' });
        (req.nextUrl as any).pathname = '/some-other-route';

        await middleware(req);

        expect(NextResponse.next).toHaveBeenCalled();
        expect(NextResponse.redirect).not.toHaveBeenCalled();
    });

    it('should handle a missing session value gracefully', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue(null);
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/signin', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });

    it('should handle an empty session value gracefully', async () => {
        (mockedCookies.get as jest.Mock).mockReturnValue({ value: '' });
        (decrypt as jest.Mock).mockResolvedValue(null);
        (req.nextUrl as any).pathname = '/auth/excel-edit';

        await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/signin', 'http://localhost:3000'));
        expect(NextResponse.next).not.toHaveBeenCalled();
    });
});
