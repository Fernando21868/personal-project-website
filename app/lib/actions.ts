'use server';

import prisma from './db';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { Role } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { File } from 'buffer';
import { fetchCategoryById, fetchProductById, fetchUserById } from './data';

const bcrypt = require('bcrypt');
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export type StateUser = {
  errors?: {
    firstName?: string[];
    middleName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    role?: string[];
    image?: string[];
  };
  message?: string | null;
};

const FormSchemaRegister = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterUser = FormSchemaRegister.omit({ id: true });

export async function registerUser(prevState: StateUser, formData: FormData) {
  const validatedFields = RegisterUser.safeParse({
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }
  const { firstName, lastName, middleName, email, password } =
    validatedFields.data;
  const roleType: Role = Role.USER as Role;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName: firstName,
        middleName: middleName ?? null,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: roleType,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  redirect('/login');
}

const FormSchemaUser = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string(),
  image: z
    .object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
    })
    .optional(),
});

const CreateUser = FormSchemaUser.omit({ id: true });
const UpdateUser = FormSchemaUser.omit({ id: true, password: true });

export async function createUser(prevState: StateUser, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
    image: formData.get('image'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }
  const { firstName, lastName, middleName, email, password, role } =
    validatedFields.data;
  const roleType: Role = role as Role;
  const hashedPassword = await bcrypt.hash(password, 10);

  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');

  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }

  let imageUrl: string = '';
  const bytes = await imageProfile?.arrayBuffer();
  let base64Image = '';
  if (bytes) {
    const base64 = Buffer.from(bytes).toString('base64');
    base64Image = `data:image/jpeg;base64,${base64}`;
  }

  const uploadToCloudinary = () => {
    return new Promise((resolve, reject) => {
      var result = cloudinary.uploader
        .upload(base64Image, {
          invalidate: true,
        })
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  const result: any = await uploadToCloudinary();
  imageUrl = result.secure_url;

  try {
    await prisma.user.create({
      data: {
        firstName: firstName,
        middleName: middleName ?? null,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        role: roleType,
        image: imageUrl,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function updateUser(
  id: string,
  prevState: StateUser,
  formData: FormData,
) {
  console.log(formData.get('role'));
  if (formData.get('role') === null) {
    formData.set('role', 'USER');
  }

  const validatedFields = UpdateUser.safeParse({
    firstName: formData.get('firstName'),
    middleName: formData.get('middleName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }
  const { firstName, lastName, middleName, email, role } = validatedFields.data;
  const roleType: Role = role as Role;

  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');
  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }
  const user = await fetchUserById(id);
  let imageUrl: string = user?.image!;

  if (imageProfile?.size !== 0 && imageProfile?.name !== 'undefined') {
    const bytes = await imageProfile?.arrayBuffer();
    let base64Image = '';
    if (bytes) {
      const base64 = Buffer.from(bytes).toString('base64');
      base64Image = `data:image/jpeg;base64,${base64}`;
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(base64Image, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result: any = await uploadToCloudinary();
    imageUrl = result.secure_url;
  }

  try {
    await prisma.user.update({
      where: { id: id },
      data: {
        firstName: firstName,
        middleName: middleName ?? null,
        lastName: lastName,
        email: email,
        role: roleType,
        image: imageUrl,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    revalidatePath('dashboard/users');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete User.',
    };
  }
}

const FormSchemaCategory = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type StateCategory = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const CreateCategory = FormSchemaCategory.omit({ id: true });
const UpdateCategory = FormSchemaCategory.omit({ id: true });

export async function createCategory(
  prevState: StateCategory,
  formData: FormData,
) {
  const validatedFields = CreateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }
  const { name, description } = validatedFields.data;

  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');
  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }
  let imageUrl: string = '';

  if (imageProfile?.size !== 0 && imageProfile?.name !== 'undefined') {
    const bytes = await imageProfile?.arrayBuffer();
    let base64Image = '';
    if (bytes) {
      const base64 = Buffer.from(bytes).toString('base64');
      base64Image = `data:image/jpeg;base64,${base64}`;
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(base64Image, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result: any = await uploadToCloudinary();
    imageUrl = result.secure_url;
  }

  try {
    await prisma.category.create({
      data: {
        name: name,
        description: description,
        image: imageUrl,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Category.',
    };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function updateCategory(
  id: string,
  prevState: StateCategory,
  formData: FormData,
) {
  const validatedFields = UpdateCategory.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }
  const { name, description } = validatedFields.data;
  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');
  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }
  const category = await fetchCategoryById(id);
  let imageUrl: string = category?.image!;

  if (imageProfile?.size !== 0 && imageProfile?.name !== 'undefined') {
    const bytes = await imageProfile?.arrayBuffer();
    let base64Image = '';
    if (bytes) {
      const base64 = Buffer.from(bytes).toString('base64');
      base64Image = `data:image/jpeg;base64,${base64}`;
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(base64Image, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result: any = await uploadToCloudinary();
    imageUrl = result.secure_url;
  }

  try {
    await prisma.category.update({
      where: { id: id },
      data: {
        name: name,
        description: description,
        image: imageUrl,
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Category.',
    };
  }
  revalidatePath('/dashboard/categories');
  redirect('/dashboard/categories');
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath('dashboard/categories');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Category.',
    };
  }
}

const FormSchemaProduct = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.string(),
  image: z
    .object({
      name: z.string(),
      size: z.number(),
      type: z.string(),
    })
    .optional(),
  stock: z.string(),
  categoryId: z.string(),
});

export type StateProduct = {
  errors?: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
  };
  message?: string | null;
};

const CreateProduct = FormSchemaProduct.omit({ id: true });
const UpdateProduct = FormSchemaProduct.omit({ id: true });

export async function createProduct(
  prevState: StateProduct,
  formData: FormData,
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    categoryId: formData.get('categoryId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Category.',
    };
  }
  const { name, description, price, stock, categoryId } = validatedFields.data;

  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');
  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }
  let imageUrl: string = '';

  if (imageProfile?.size !== 0 && imageProfile?.name !== 'undefined') {
    const bytes = await imageProfile?.arrayBuffer();
    let base64Image = '';
    if (bytes) {
      const base64 = Buffer.from(bytes).toString('base64');
      base64Image = `data:image/jpeg;base64,${base64}`;
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(base64Image, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result: any = await uploadToCloudinary();
    imageUrl = result.secure_url;
  }

  try {
    await prisma.product.create({
      data: {
        name: name,
        description: description!,
        image: imageUrl,
        price: +price,
        stock: +stock,
        categories: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(
  id: string,
  prevState: StateProduct,
  formData: FormData,
) {
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    stock: formData.get('stock'),
    categoryId: formData.get('categoryId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Category.',
    };
  }
  const { name, description, price, stock, categoryId } = validatedFields.data;
  let imageProfile: File | null = null;
  const imageProfileValue = formData.get('image');
  if (imageProfileValue instanceof File) {
    imageProfile = imageProfileValue;
  }
  const product = await fetchProductById(id);
  let imageUrl: string = product?.image!;

  if (imageProfile?.size !== 0 && imageProfile?.name !== 'undefined') {
    const bytes = await imageProfile?.arrayBuffer();
    let base64Image = '';
    if (bytes) {
      const base64 = Buffer.from(bytes).toString('base64');
      base64Image = `data:image/jpeg;base64,${base64}`;
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(base64Image, {
            invalidate: true,
          })
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result: any = await uploadToCloudinary();
    imageUrl = result.secure_url;
  }

  try {
    await prisma.product.update({
      where: { id: id },
      data: {
        name: name,
        description: description!,
        image: imageUrl,
        price: +price,
        stock: +stock,
        categories: {
          set: {
            id: categoryId,
          },
        },
      },
    });
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Product.',
    };
  }
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath('dashboard/products');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Product.',
    };
  }
}

export async function removeProductFromCart(userId: string, productId: string) {
  try {
    // Verificar si el usuario tiene un carrito de compras
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { shoppingCart: true }, // Incluir el carrito de compras del usuario
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Obtener el ID del carrito de compras del usuario
    const cartId = user.shoppingCart?.id;

    if (!cartId) {
      throw new Error('Shopping cart not found for the user');
    }

    // Eliminar la relación entre el producto y el carrito de compras
    await prisma.shoppingCart.update({
      where: { id: cartId },
      data: {
        product: {
          disconnect: { id: productId }, // Desconectar el producto del carrito de compras
        },
      },
    });

    revalidatePath('profile/shopping-cart');
  } catch (error) {
    console.error('Failed to remove product from cart:', error);
    throw new Error('Failed to remove product from cart.');
  }
}
