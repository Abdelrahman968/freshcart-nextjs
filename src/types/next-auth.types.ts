export type AppUser = {
  id: string;
  name?: string;
  email?: string;
  routeToken?: string;
  expires?: string;
  expiresAt?: string;
};

export interface AppSession {
  routeToken?: string;
  expiresAt?: string;
  user: {
    id?: string;
  };
}
