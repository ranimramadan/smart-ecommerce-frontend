// شكل البيانات القادمة من الباك فقط (محايد)
export type RoleName = string; // نخليها مرنة، الأدوار الحقيقية تُدار في config/auth

export interface Role {
  id?: number;
  name: RoleName;
  slug?: string | null;
}

export interface Profile {
  id?: number;
  user_id?: number;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  phone_number?: string | null;
  birthdate?: string | null;
  gender?: string | null;
  profile_image?: string | null;
}

export interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  is_active: boolean;
  roles?: Role[];
  profile?: Profile | null;
}

// استجابات الأوث حسب الباك الحالي
export type LoginResponse = User;
export type MeResponse = User;
export interface RegisterResponse { user: User }
export interface LogoutResponse { message: string }
