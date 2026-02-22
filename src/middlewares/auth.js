const adminAuth = (req,res,next) => { //middleware
    const token = '123';
    const isAuthenticated = token === '1212';
    if(!isAuthenticated) {
        res.status(401).send('Unauthorized'); //401 is status code for unauthorized
    }else{
        next();
    }
}

const userAuth = (req,res,next) => { //middleware
    const token = 'user';
    const isAuthenticated = token === 'user';
    if(!isAuthenticated) {
        res.status(401).send('Unauthorized'); //401 is status code for unauthorized
    }else{
        next();
    }
}

module.exports = {adminAuth,userAuth};