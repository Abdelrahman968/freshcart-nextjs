export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  terms?: boolean;
};

export type RegisterResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};
