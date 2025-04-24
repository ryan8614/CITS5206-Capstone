'use server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { createSession, deleteSession, decrypt } from '@/lib/session'
import { SignupFormSchema, SigninFormSchema, FormState } from '@/lib/definitions'

// Create prisma client
const prisma = new PrismaClient()

// Define signup functions
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for insertion into database
  const { username, email, password } = validatedFields.data

  // Check if user already exists in database
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { name: username },
        { email: email }
      ]
    }
  })

  if (existingUser) {
    return {
      errors: {
        username: ['Username already exists!'],
        email: ['Email already exists!'],
      }
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  // Insert user into database
  const user = await prisma.user.create({
    data: {
      name: username,
      email: email,
      password: hashedPassword,
    },
  })

  // print sussceful signup message
  return {
    message: 'User created successfully!'
  }
}

// Define signin functions
export async function signin(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Prepare data for insertion into database
  const { username, password } = validatedFields.data

  // Check if user exists in database
  const user = await prisma.user.findUnique({
    where: { name: username }
  })

  if (!user) {
    return {
      errors: {
        username: ['User is not registered!'],
      }
    }
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return {
      errors: {
        password: ['Password is incorrect!'],
      }
    }
  }

  // 4. Create user session
  await createSession(user.id.toString())

  // print sussceful login message
  return {
    message: 'Login successful!'
  }
}

// Define signout function
export async function logout() {
  await deleteSession()
  return 
}
