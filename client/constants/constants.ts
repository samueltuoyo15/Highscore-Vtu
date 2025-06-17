export const SIGN_IN_FORM_FIELDS = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "johndoe@gmail.com",
    icon: "Mail" 
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    icon: "Lock" 
  }
] as const

export const SIGN_UP_FORM_FIELDS = [
     {
    name: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    icon: "User",
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "johndoe123",
    icon: "AtSign",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "john@example.com",
    icon: "Mail",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    icon: "Lock",
  }
] as const