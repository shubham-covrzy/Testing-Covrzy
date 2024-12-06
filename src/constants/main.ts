// constants
export const REQUIRED = 'Required';
export const EMAIL = 'Enter a valid email';
export const PHONE = 'Enter a valid phone number';
export const CONFIRM_PASSWORD = 'Confirm password not match with new password';
export const PASSWORD =
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character';
export const EMAIL_REG = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
export const PASSWORD_REG =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
export const PHONE_REG = /^(\+?91|0)?[6789]\d{9}$/;
export const ONLY_ALPHABET = /^[a-zA-Z ]*$/;
// /^[a-zA-Z ]+$/

// Header title name
export const HOME = 'Home';
export const COMPLETE_PAYMENT = ' Finalize your coverage';
export const POLICIES = 'Policies';
export const PAYMENTS = 'Payments';
export const CLAIMS = 'Claims';
export const SUPPORT = 'Support';
export const SUPPORT_TICKETS = 'View Ticket';
export const ADD_COVERAGE = 'Add Coverage';

// sign-up step
export const PERSONAL = 'personal';
export const COMPANY = 'company';
export const ADDITIONAL = 'additional';

// status code
export const InternalServerError =
    "Oops! Something went wrong on our end. We're fixing it, please try again later.";
export const BadRequest =
    "Uh-oh! There's an issue with your request. Check your input and try again.";
export const NotFound =
    "Sorry, we couldn't find the page you're looking for. Double-check the URL or go back home.";

export const HttpStatusMessages: any = {
    500: InternalServerError,
    404: NotFound,
    400: BadRequest,
};
