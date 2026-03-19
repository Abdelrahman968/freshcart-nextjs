export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export interface AuthResponse {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
}

export interface AuthJSAuthorizeType {
  id: string;
  name: string;
  email: string;
  routeToken: string;
  expiresAt: number;
}
