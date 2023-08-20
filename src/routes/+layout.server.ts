import { generateNewUser, getUser } from '$lib/services/user.server.js'
import type { User } from '@prisma/client'

export async function load({ url, cookies }) {
    // User setting/getting
    const username = cookies.get('username')
    console.log({username})

    let user: User | null

    if (username) {
        user = await getUser(username)    
        if (!user) {
            user = await generateNewUser()
            cookies.delete('username')
            cookies.set('username', user.username, {path: '/'})
        }
    } else {
        user = await generateNewUser()
        cookies.set('username', user.username, {path: '/'})
    }

    return {
        url: url.pathname,
        user: user
    }
} 