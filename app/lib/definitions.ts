// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { Role } from '@prisma/client';

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  email: string;
  firstName: string;
  middleName?: string | null;
  password?: string | null;
  lastName: string;
  role: Role;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};
