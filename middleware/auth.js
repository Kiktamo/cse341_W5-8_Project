const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/api-docs');
  };
  
  module.exports = auth;
  