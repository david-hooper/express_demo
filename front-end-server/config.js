

module.exports = {
    dev: {
        apiUrl: "http://localhost:3000"
    },

    production: {
        apiUrl: process.env.API_URL
    }
}