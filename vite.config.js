/** @type {import('vite').UserConfig} */

export default {
    build: {
        target: 'esnext'
    },
    worker: {
        format: 'es'
    }
}