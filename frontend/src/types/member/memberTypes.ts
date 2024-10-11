export interface SignupFormData {
  memberId: string;
  name: string;
  password: string;
  birthday: string;
  gender: string;
  phone: string;
  paymentPassword: string;
}

export interface LoginFormData {
  memberId: string;
  password: string;
}

export interface MemberInfoData {
  memberId: string;
  name: string;
  gender: string;
  phone: string;
}
