const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log(req.headers.authorization);
    try {
        const token = req.headers.authorization.split(' ')[1];
        // split will split the first value and take the second argument "barear this_should_be_private"
        jwt.verify(token, 'this_should_be_private');
        next();
    } 
    catch (error) {
        console.log('here came');
        res.status(401).json({error: error});
    }
}