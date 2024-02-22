'use server';

import prisma from './db';
import { unstable_noStore as noStore } from 'next/cache';
// Fetch data with Prisma
const ITEMS_PER_PAGE = 5;

export async function fetchUsers(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        middleName: true,
        lastName: true,
        role: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { firstName: { contains: query, mode: 'insensitive' } },
          { middleName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        email: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUserById(id: string) {
  noStore();
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUsersPages(query: string) {
  try {
    const count = await prisma.user.count({
      where: {
        OR: [
          { email: { contains: query, mode: 'insensitive' } },
          { firstName: { contains: query, mode: 'insensitive' } },
          { middleName: { contains: query, mode: 'insensitive' } },
          { lastName: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchCategoryById(id: string) {
  noStore();
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.error('Failed to fetch category:', error);
    throw new Error('Failed to fetch category.');
  }
}

export async function fetchCategories(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
      orderBy: {
        name: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchCategoriesPages(query: string) {
  try {
    const count = await prisma.category.count({
      where: {
        OR: [{ name: { contains: query, mode: 'insensitive' } }],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchAllCategories() {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchQuantityProductsPerCategory(id: string) {
  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: true,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const quantity = category.products.length;
    return quantity;
  } catch (error) {
    console.error('Failed to fetch quantity of products per category:', error);
    throw new Error('Failed to fetch quantity of products per category.');
  }
}

export async function fetchProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: {
        name: 'desc',
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductById(id: string) {
  noStore();
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw new Error('Failed to fetch product.');
  }
}

export async function fetchProductsPages(query: string) {
  try {
    const count = await prisma.product.count({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProductsPerCategoryId(
  query: string,
  currentPage: number,
  id: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            description: true,
            price: true,
            image: true,
            stock: true,
            createdAt: true,
            updatedAt: true,
          },
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } },
            ],
          },
          orderBy: {
            name: 'desc',
          },
          take: ITEMS_PER_PAGE,
          skip: offset,
        },
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    const products = category.products;
    return products;
  } catch (error) {
    console.error('Failed to fetch products per category id:', error);
    throw new Error('Failed to fetch products per category id.');
  }
}

export async function addToCart(userId: string, productId: string) {
  try {
    // Verificar si el usuario tiene un carrito de compras
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: { shoppingCart: true }, // Incluir el carrito de compras del usuario
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Si el usuario no tiene un carrito de compras, crear uno nuevo
    if (!user.shoppingCart) {
      user = await prisma.user.update({
        where: { id: userId },
        data: {
          shoppingCart: {
            create: {}, // Crear un nuevo carrito de compras vacío
          },
        },
        include: { shoppingCart: true }, // Incluir el carrito de compras actualizado
      });
    }

    // Agregar el producto al carrito de compras del usuario
    await prisma.shoppingCart.update({
      where: { userId },
      data: {
        product: {
          connect: { id: productId }, // Conectar el producto al carrito de compras
        },
      },
    });

    return { success: true, message: 'Product added to cart successfully' };
  } catch (error) {
    console.error('Failed to add product to cart:', error);
    throw new Error('Failed to add product to cart.');
  }
}

export async function getCartProducts(userId: string) {
  try {
    // Buscar el usuario y sus productos en el carrito
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        shoppingCart: {
          include: { product: true }, // Incluir los productos en el carrito
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Obtener los productos del carrito del usuario
    const cartProducts = user.shoppingCart?.product;

    return cartProducts || [];
  } catch (error) {
    console.error('Failed to get cart products:', error);
    throw new Error('Failed to get cart products.');
  }
}
