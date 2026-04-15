export interface LoginPayload {
  LoginEmail: string;
  LoginPassword: string;
  LoginRememberMe: boolean;
}

export interface RegisterPayload {
  RegisterEmail: string;
  RegisterPassword: string;
  RegisterConfirmPassword: string;
  RegisterAgreeToTerms: boolean;
}
