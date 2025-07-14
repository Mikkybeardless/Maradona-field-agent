import apiClient from "../apiClient";

interface LoginData {
  email: string;
  password: string;
  login_by: string;
  user_type: string;
}
interface SignUpData {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  phone_no: string;
  document: File[] | null;
}

interface ReqPasswordData {
  email: string;
  send_code_by: string;
}

interface DoPassReset {
  verification_code: string;
  password: string;
}

interface ProfileData {
  full_name: string;
  email: string;
  phone_no: string;
  document: File | File[] | null;
}
type UpdateProfile = Partial<ProfileData>;

const authService = {
  signUp: (signUpData: SignUpData) => apiClient.post("/agent/auth", signUpData),
  login: (loginData: LoginData) => apiClient.post("/auth/login", loginData),
  logout: () => apiClient.get("/auth/logout"),
  reqPasswordReset: (reqPasswordData: ReqPasswordData) =>
    apiClient.post("/auth/password/forget_request", reqPasswordData),
  doPassReset: (data: DoPassReset) =>
    apiClient.post("/auth/password/confirm_reset", data),
  getProfile: () => apiClient.get("/agent/profile"),
  updateProfile: (profileData: UpdateProfile) =>
    apiClient.put("/admin/field-agents/2/update", profileData),
};

export type {
  LoginData,
  ReqPasswordData,
  DoPassReset,
  ProfileData,
  SignUpData,
  UpdateProfile,
};
export default authService;
