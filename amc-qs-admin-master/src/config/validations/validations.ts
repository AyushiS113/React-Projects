const defaultLabel = "It";

export const regexPatterns = {
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!$%^&+=])(?=.*[0-9]).*$/,
  mobile: /^[0-9]+$/,
  twoDecimal: /^\d*(\.\d{0,2})?$/,
  numeric: /^[1-9\b]+$/,
  phone: /^\d{4} \d{3} \d{3}$/,
  mobilevalidation: /^[0-9]{10}$/,
  firstName: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
  lastName: /^(?=.*[a-z])(?=.*[A-Z]).*$/,
};

export const validations = {
  required: {
    text: (field = defaultLabel) => {
      return { required: true, message: `${field} is required.` };
    },
    select: (field = defaultLabel) => {
      return { required: true, message: `Please select ${field}.` };
    },
  },
  min: {
    text: (min = 3, field = defaultLabel) => {
      return {
        min,
        message: `${field} should contain minimum ${min} characters.`,
      };
    },
    select: (field = defaultLabel, min: number) => {
      return {
        min,
        message: `Please select minimum ${min} ${field}.`,
      };
    },
    number: (min: number, field = defaultLabel) => {
      return {
        min,
        message: `${field} should contain minimum ${min} digits.`,
      };
    },
  },
  max: {
    text: (max = 20, field = defaultLabel) => {
      return {
        max,
        message: `${field} should contain maximum ${max} characters.`,
      };
    },
    select: (field = defaultLabel, max: number) => {
      return {
        max,
        message: `Please select maximum ${max} ${field}.`,
      };
    },
    number: (max: number, field = defaultLabel) => {
      return {
        max,
        message: `${field} should contain maximum ${max} digits.`,
      };
    },
  },
  pattern: {
    firstName: {
      pattern: regexPatterns.firstName,
      message: "First letter must be capital",
    },
    lastName: {
      pattern: regexPatterns.lastName,
      message: "First letter must be capital",
    },
    phone: {
      pattern: regexPatterns.mobilevalidation,
      message: "Phone should contain only 10 numbers.",
    },
    password: (field = defaultLabel) => {
      return {
        pattern: regexPatterns.password,
        message: `${field} should contain at least an uppercase letter, a lowercase letter, a number, and a special character.`,
      };
    },
    numeric: {
      pattern: regexPatterns.numeric,
      message: "Please enter digits only.",
    },
    decimal: (number: number) => {
      return {
        pattern: regexPatterns.twoDecimal,
        message: `Please enter digits or decimal digits up to ${number} decimal places only.`,
      };
    },
    other: (field = defaultLabel) => {
      return {
        pattern: regexPatterns.firstName,
        message: `Please enter a valid ${field}.`,
      };
    },
  },
  email: (field = defaultLabel) => {
    return {
      type: "email",
      message: `${field} Is Invalid email.`,
    };
  },
};
