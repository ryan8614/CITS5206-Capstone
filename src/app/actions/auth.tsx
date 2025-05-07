/**
 * @file Defines authentication actions for user signup, signin, and logout.
 */

'use server' // Marks the file as a server action
import bcrypt from 'bcryptjs' // Import bcrypt for password hashing
import { PrismaClient } from '@prisma/client' // Import PrismaClient for database interactions
import { createSession, deleteSession} from '@/lib/session' // Import session management functions
import { SignupFormSchema, SigninFormSchema, FormState } from '@/lib/definitions' // Import form validation schemas and types

// Create prisma client
const prisma = new PrismaClient() // Instantiate Prisma client for database operations

/**
 * Signs up a new user.
 *
 * @param {FormState} state - The current form state.
 * @param {FormData} formData - The form data containing username, email, and password.
 * @returns {Promise<{errors?: {username?: string[], email?: string[], password?: string[]}, message?: string}>} - 
 * An object containing errors or a success message.
 */
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({ // Validate form data against the SignupFormSchema
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) { // Check if validation failed
    return {
      message: null,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for insertion into database
  const { username, email, password } = validatedFields.data // Extract validated data

  // Check if username already exists
  const usernameExists = await prisma.user.findUnique({
    where: { name: username }
  })

  // Check if email already exists
  const emailExists = await prisma.user.findUnique({
    where: { email: email }
  })

  if (usernameExists || emailExists) {
    return {
      message: null,
      errors: {
        ...(usernameExists ? { username: ['Username already exists!'] } : {}),
        ...(emailExists ? { email: ['Email already exists!'] } : {})
      }
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10) // Hash the password

  // Insert user into database
  const user = await prisma.user.create({ // Create a new user in the database
    data: {
      name: username,
      email: email,
      password: hashedPassword, // Store the hashed password
    },
  })

  // print sussceful signup message
  return {
    message: 'User created successfully!',
    errors: {}
  }
}

/**
 * Signs in an existing user.
 *
 * @param {FormState} state - The current form state.
 * @param {FormData} formData - The form data containing username and password.
 * @returns {Promise<{errors?: {username?: string[], password?: string[]}, message?: string}>} - 
 * An object containing errors or a success message.
 */
export async function signin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({ // Validate form data against the SigninFormSchema
    username: formData.get('username'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) { // If validation failed
    return {
      message: null, // Return null message
      errors: validatedFields.error.flatten().fieldErrors, // Return validation errors
    }
  }

  // Prepare data for insertion into database
  const { username, password } = validatedFields.data // Extract validated data

  // Check if user exists in database
  const user = await prisma.user.findUnique({ // Query the database for the user
    where: { name: username } // Find user by username
  })

  if (!user) { // If user does not exist
    return {
      message: null,
      errors: {
        username: ['User is not registered!']
      }
    }
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password) // Compare the provided password with the stored hashed password

  if (!isMatch) { // If passwords do not match
    return {
      message: null,
      errors: {
        password: ['Incorrect password!']
      }
    };
  }

  // 4. Create user session
  await createSession(user.id.toString()) // Create a session for the user

  // print sussceful login message
  return {
    message: "Login successful!",
    errors: {}
  };
}

/**
 * Logs out the current user by deleting the session.
 *
 * @returns {Promise<void>}
 */
export async function logout() {
  await deleteSession() // Delete the user's session
  return 
}
