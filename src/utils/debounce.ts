/**
 * Simple debounce function
 */
function debounce(func: Function, wait = 50) {
    let h: any
    return (...args: any[]) => {
        clearTimeout(h)
        h = setTimeout(() => func(...args), wait)
    }
}

export default debounce
