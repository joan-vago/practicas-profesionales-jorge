const checkOrigin = (req, res, next) =>{
  console.log(req.headers)
}

module.exports = {checkOrigin}