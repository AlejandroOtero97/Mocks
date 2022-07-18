const apiControllers = {
    login: (req, res) => {
        const name = req.params.name;
        req.session.name = name;
        res.status(201).json({logged: true});
    },
    logout: (req, res) => {
        req.session.destroy(
            (err) => {
                if(!err) {
                    res.status(200).json({logged: false});
                } else {
                    console.log(err);
                }
            }
        )
    },
    session: (req, res) => {
        res.status(200).json({name: req.session.name});
    }
}

export default apiControllers;