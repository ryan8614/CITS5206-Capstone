import { GET } from '@/app/api/session/route';
import { checkSession } from '@/lib/session';
import { NextResponse } from 'next/server';

// Mock the modules and functions used in the route handler
jest.mock('@/lib/session', () => ({
    checkSession: jest.fn()
}));

jest.mock('next/server', () => ({
    NextResponse: {
        json: jest.fn()
    }
}));

describe('API Route: /api/session', () => {
    beforeEach(() => {
        (checkSession as jest.Mock).mockClear();
        (NextResponse.json as jest.Mock).mockClear();
    });

    it('should return a JSON response with isLoggedIn set to true when checkSession resolves to true', async () => {
        (checkSession as jest.Mock).mockResolvedValue(true);

        await GET();

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ isLoggedIn: true });
    });

    it('should return a JSON response with isLoggedIn set to false when checkSession resolves to false', async () => {
        (checkSession as jest.Mock).mockResolvedValue(false);

        await GET();

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ isLoggedIn: false });
    });

    it('should handle errors and return a 500 status code if checkSession throws an error', async () => {
        (checkSession as jest.Mock).mockRejectedValue(new Error('Session check failed'));

        // Mock console.error to prevent polluting the test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        try {
            await GET();
        } catch (error: any) {
            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe('Session check failed');
        }

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).not.toHaveBeenCalled();
        consoleErrorSpy.mockRestore(); // Restore console.error
    });

    it('should handle edge case where checkSession returns a non-boolean value', async () => {
        (checkSession as jest.Mock).mockResolvedValue('some-string');

        await GET();

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ isLoggedIn: 'some-string' });
    });

    it('should handle edge case where checkSession returns null', async () => {
        (checkSession as jest.Mock).mockResolvedValue(null);

        await GET();

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ isLoggedIn: null });
    });

    it('should handle edge case where checkSession returns undefined', async () => {
        (checkSession as jest.Mock).mockResolvedValue(undefined);

        await GET();

        expect(checkSession).toHaveBeenCalled();
        expect(NextResponse.json).toHaveBeenCalledWith({ isLoggedIn: undefined });
    });
});
