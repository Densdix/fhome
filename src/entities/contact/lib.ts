export const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) return "";
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address (e.g., example@domain.com)";
  }
  return "";
};

export const validatePhone = (phone: string) => {
  if (!phone) return "";

  const sanitizedPhone = phone.replace(/[+\s]/g, "");
  const integerCount = (sanitizedPhone.match(/\d/g) || []).length;

  if (integerCount < 10) {
    return "Phone number must contain at least 10 digits";
  }
  if (integerCount > 11) {
    return "Phone number cannot exceed 11 digits";
  }
  return "";
};

export const formatPhoneNumber = (value: string) => {
  const cleaned = value.replace(/[^\d+]/g, "");
  const digitsOnly = cleaned.replace(/\D/g, "");

  if (!digitsOnly) return "";

  const countryCode = digitsOnly.slice(0, 1);
  const areaCode = digitsOnly.slice(1, 4);
  const firstPart = digitsOnly.slice(4, 7);
  const secondPart = digitsOnly.slice(7, 11);

  let formatted = "";

  if (digitsOnly.length > 0) {
    formatted = `+${countryCode}`;
  }
  if (digitsOnly.length > 1) {
    formatted += ` ${areaCode}`;
  }
  if (digitsOnly.length > 4) {
    formatted += ` ${firstPart}`;
  }
  if (digitsOnly.length > 7) {
    formatted += ` ${secondPart}`;
  }

  return formatted;
};

export const convertToInitialPhoneFormat = (formattedPhone: string) => {
  return formattedPhone.replace(/\D/g, "");
};
