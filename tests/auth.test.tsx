import { signup, signin, logout } from '@/app/actions/auth';
import { FormState } from '@/lib/definitions';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { createSession, deleteSession } from '@/lib/session';


// Mock PrismaClient
jest.mock('@prisma/client', () => {
   const mockPrisma = {
       user: {
           findFirst: jest.fn(),
           findUnique: jest.fn(),
           create: jest.fn(),
       },
   };
   return { PrismaClient: jest.fn(() => mockPrisma) };
});

// Mock bcrypt
jest.mock('bcryptjs', () => ({
   hash: jest.fn().mockResolvedValue('hashedPassword'),
   compare: jest.fn().mockResolvedValue(true),
}));

// Mock session functions
jest.mock('@/lib/session', () => ({
   createSession: jest.fn().mockResolvedValue(undefined),
   deleteSession: jest.fn().mockResolvedValue(undefined),
}));

describe('Auth Actions Unit Tests', () => {
   let prisma: any;

   beforeEach(() => {
       prisma = new PrismaClient();
       (PrismaClient as jest.Mock).mockClear();
       (bcrypt.hash as jest.Mock).mockClear();
       (bcrypt.compare as jest.Mock).mockClear();
       (createSession as jest.Mock).mockClear();
       (deleteSession as jest.Mock).mockClear();
       (prisma.user.findFirst as jest.Mock).mockReset();
       (prisma.user.findUnique as jest.Mock).mockReset();
       (prisma.user.create as jest.Mock).mockReset();
   });

   describe('signup', () => {
       it('should successfully sign up a new user', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('email', 'test@example.com');
           formData.append('password', 'password123');

           (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
           (prisma.user.create as jest.Mock).mockResolvedValue({ id: 'newUserId', username: 'testuser', email: 'test@example.com' });

           const result = await signup({} as FormState, formData);

           expect(prisma.user.findFirst).toHaveBeenCalledWith({
               where: {
                   OR: [{ name: 'testuser' }, { email: 'test@example.com' }],
               },
           });
           expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
           expect(prisma.user.create).toHaveBeenCalledWith({
               data: {
                   name: 'testuser',
                   email: 'test@example.com',
                   password: 'hashedPassword',
               },
           });
           expect(result).toEqual({ message: 'User created successfully!' });
       });

       it('should return errors if the username already exists', async () => {
           const formData = new FormData();
           formData.append('username', 'existinguser');
           formData.append('email', 'test@example.com');
           formData.append('password', 'password123');

           (prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 'existingUserId', username: 'existinguser', email: 'test@example.com' });

           const result = await signup({} as FormState, formData);

           expect(result).toEqual({
               errors: {
                   username: ['Username already exists!'],
                   email: ['Email already exists!'],
               },
           });
           expect(prisma.user.create).not.toHaveBeenCalled();
       });

       it('should return errors if the email already exists', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('email', 'existing@example.com');
           formData.append('password', 'password123');

           (prisma.user.findFirst as jest.Mock).mockResolvedValue({ id: 'existingUserId', username: 'testuser', email: 'existing@example.com' });

           const result = await signup({} as FormState, formData);

            expect(result).toEqual({
               errors: {
                   username: ['Username already exists!'],
                   email: ['Email already exists!'],
               },
           });
           expect(prisma.user.create).not.toHaveBeenCalled();
       });

       it('should return errors if the form data is invalid', async () => {
           const formData = new FormData();
           formData.append('username', '');
           formData.append('email', 'invalid-email');
           formData.append('password', 'short');

           const result = await signup({} as FormState, formData);

           expect(result).toHaveProperty('errors');
           expect(prisma.user.create).not.toHaveBeenCalled();
       });

       it('should handle database errors during user creation', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('email', 'test@example.com');
           formData.append('password', 'password123');

           (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
           (prisma.user.create as jest.Mock).mockRejectedValue(new Error('Database error'));

           await expect(signup({} as FormState, formData)).rejects.toThrow('Database error');
       });
   });

   describe('signin', () => {
       it('should successfully sign in an existing user', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('password', 'password123');

           (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'existingUserId', username: 'testuser', password: 'hashedPassword' });
           (bcrypt.compare as jest.Mock).mockResolvedValue(true);

           const result = await signin({} as FormState, formData);

           expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { name: 'testuser' } });
           expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
           expect(createSession).toHaveBeenCalledWith('existingUserId');
           expect(result).toEqual({ message: 'Login successful!' });
       });

       it('should return an error if the user is not registered', async () => {
           const formData = new FormData();
           formData.append('username', 'nonexistentuser');
           formData.append('password', 'password123');

           (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

           const result = await signin({} as FormState, formData);

           expect(result).toEqual({ errors: { username: ['User is not registered!'] } });
           expect(createSession).not.toHaveBeenCalled();
       });

       it('should return an error if the password is incorrect', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('password', 'wrongpassword');

           (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'existingUserId', username: 'testuser', password: 'hashedPassword' });
           (bcrypt.compare as jest.Mock).mockResolvedValue(false);

           const result = await signin({} as FormState, formData);

           expect(result).toEqual({ errors: { password: ['Password is incorrect!'] } });
           expect(createSession).not.toHaveBeenCalled();
       });

       it('should return errors if the form data is invalid', async () => {
           const formData = new FormData();
           formData.append('username', '');
           formData.append('password', '');

           const result = await signin({} as FormState, formData);

           expect(result).toHaveProperty('errors');
           expect(createSession).not.toHaveBeenCalled();
       });

       it('should handle database errors during user retrieval', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('password', 'password123');

           (prisma.user.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

           await expect(signin({} as FormState, formData)).rejects.toThrow('Database error');
           expect(createSession).not.toHaveBeenCalled();
       });

       it('should handle bcrypt compare errors', async () => {
           const formData = new FormData();
           formData.append('username', 'testuser');
           formData.append('password', 'password123');

           (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'existingUserId', username: 'testuser', password: 'hashedPassword' });
           (bcrypt.compare as jest.Mock).mockRejectedValue(new Error('bcrypt error'));

           await expect(signin({} as FormState, formData)).rejects.toThrow('bcrypt error');
           expect(createSession).not.toHaveBeenCalled();
       });
   });

   describe('logout', () => {
       it('should successfully log out the user', async () => {
           await logout();
           expect(deleteSession).toHaveBeenCalled();
       });

       it('should handle errors during logout', async () => {
           (deleteSession as jest.Mock).mockRejectedValue(new Error('Session deletion error'));
           await expect(logout()).rejects.toThrow('Session deletion error');
       });
   });
});
