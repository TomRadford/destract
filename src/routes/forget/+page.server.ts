import { promptAsync } from '$lib/ai.server.js'
import prisma from '$lib/prisma'
import { error, redirect } from '@sveltejs/kit'

export const actions = {
    default:async ({cookies, request}) => {
        const data = await request.formData()
        const thought = data.get('thought')?.toString()
        if (!thought) {
            throw error(400, {
                message: 'No thought submitted'
            })
        }
        const username = cookies.get('username')
        if (!username) {
            throw redirect(302, '/')
        }
        const user = await prisma.user.findUnique({ 'where': { 'username': username }, 'select': { 'id': true } })
        if (!user?.id) {
            throw redirect(302, '/')
        }

        const hint = await promptAsync(`Generate a cryptic hint with text and emojis as text-only for the following distraction: ${thought}`) ?? '🤷‍♂️'

        const thoughtEntry = await prisma.thought.create({ 'data': { userId: user.id, 'content': thought, hint } })
        console.log({thoughtEntry})
        
        throw redirect(302, '/forget/done')
    }
}
