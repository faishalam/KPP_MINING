export type InputsLogin = {
  email: string;
  password: string;
};

export type InputsRegister = {
  email: string;
  password: string;
  username: string;
  district: string;
  department: string;
  site: string;
};


export interface AuthProvidersProps {
  children: ReactNode;
}

export interface DataLogin {
  access_token: string;
  role: string;
}