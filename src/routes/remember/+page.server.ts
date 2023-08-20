import { distractionChecks } from '$lib/constants/checks.server.js'

export const load = ({ request }) => {
    const index = Math.round(Math.random() * (distractionChecks.length - 1))
    return {
        check: {
            message: distractionChecks[index].question,
            index: distractionChecks
        }
    }
}