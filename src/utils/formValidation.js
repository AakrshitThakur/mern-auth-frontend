const regex = {
  username: /^[a-zA-Z0-9_]{3,16}$/, // 3-16 alphanumeric characters or underscores
  dob: /^\d{4}-\d{2}-\d{2}$/, // Date format YYYY-MM-DD
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // Basic email validation
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/, // Minimum 8 chars with upper, lower, digit and special char
};

const validateRegistrationForm = (formData) => {
  const errors = {};

  if (!regex.username.test(formData.username)) {
    errors.username =
      "Username must be 3-16 characters long and can only contain letters, numbers, and underscores.";
  }
  if (!regex.email.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!regex.password.test(formData.password)) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  if (!regex.dob.test(formData.dob)) {
    errors.dob = "Date of Birth must be in the format YYYY-MM-DD.";
  }

  return errors;
};

const validateLoginForm = (formData) => {
  const errors = {};

  if (!regex.email.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!regex.password.test(formData.password)) {
    errors.password =
      "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
  }

  return errors;
};

export { validateRegistrationForm, validateLoginForm };
