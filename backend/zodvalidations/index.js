import {z} from 'zod'

// Sign-Up
const signupBody = z.object({
    username: z.string().email(),
    fullname: z.string(),
    password: z.string(),
})

// Sign-In
const signinBody = z.object({
    username: z.string().email(),
    password: z.string(),
})


export {
    signupBody,
    signinBody
}