const errorResponse = {
  USER: {
    NOT_FOUND: "User not found",
    CREATION_FAILED: "Failed to create user",
    UPDATE_FAILED: "Failed to update user",
    DELETION_FAILED: "Failed to delete user",
    INVALID_CREDENTIALS: "Invalid credentials",
  },

  NAME: {
    REQUIRED: "Name is required",
    INVALID: "Invalid Name",
  },

  VALIDATION: {
    FAILED:
      "Some of the input data is invalid. Please review the highlighted fields and try again.",
  },

  USERNAME: {
    CONFLICT: "This username is already associated with an existing account",
    REQUIRED: "Username is required",
    INVALID: "Invalid Username",
  },

  EMAIL: {
    CONFLICT:
      "This email address is already associated with an existing account",
    REQUIRED: "Email is required",
    INVALID: "Invalid Email",
  },

  PASSWORD: {
    REQUIRED: "Password is required",
    LENGTH: "Password must be between 8 to 16 characters",
    INVALID: "Invalid Password",
  },

  AUTH_HEADER: {
    REQUIRED: "No authorization header provided",
    INVALID: "Invalid Authorization header format",
  },

  TOKEN: {
    EXPIRED: "Invalid or expired token",
  },
};

export { errorResponse };
