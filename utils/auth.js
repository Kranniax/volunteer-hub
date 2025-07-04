const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect("/login");
    return;
  } else {
    next();
  }
};
// TO DO:
// const loggedInAuth = (req, res, next) => {
//   if (req.session.user_id && req.session.volunteer_id) {
//     res.redirect("/");
//     return;
//   } else {
//     next();
//   }
// };

export { withAuth ,loggedInAuth };
