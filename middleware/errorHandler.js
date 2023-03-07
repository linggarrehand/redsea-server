module.exports = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";
    console.log (err.name)
    switch (err.name) {
      case "SequelizeValidationError":
        status = 400;
        message = err.errors[0].message;
        break;
      case "SequelizeUniqueConstraintError":
        status = 400;
        message = err.errors[0].message;
        break;
      case "email_required":
        status = 400;
        message = "Email is required";
        break;
      case "password_required":
        status = 400;
        message = "Password is required";
        break;
      case "invalid_email_password":
        status = 401;
        message = "Invalid email/password";
        break;
      default:
        break;
    }
    res.status(status).json({ message });
  }