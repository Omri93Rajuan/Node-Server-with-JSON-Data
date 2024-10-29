export interface User {
    id?: string | number;
    name: string;
    email: string;
    password: string;
    role: string; 
    createdAt: Date;
    updatedAt: Date;
    isBusiness: boolean;
    isAdmin: boolean;
  }
  