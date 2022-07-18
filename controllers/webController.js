const webControllers = {
    inicio: (req, res) => {
        res.sendFile('index.html', { root: './public/views' })
    },
    login: (req, res) => {
        res.sendFile('login.html', { root: './public/views' })
    },
    logout: (req, res) => {
        res.sendFile('logout.html', { root: './public/views' })
    }
}

export default webControllers;