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
  RegisterAgreeToPrivacy: boolean;
}

export interface ChangePasswordPayload {
  ChangeCurrentPassword: string;
  ChangeNewPassword: string;
  ChangeConfirmNewPassword: string;
}

export interface ForgotPasswordPayload {
  ForgotPasswordEmail: string;
}
