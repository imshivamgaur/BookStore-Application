import { openDB } from 'idb';

const DB_NAME = 'BookstoreDB';
const DB_VERSION = 1;

// Initialize IndexedDB
export async function initDB() {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('favorites')) {
        db.createObjectStore('favorites', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('auth')) {
        db.createObjectStore('auth', { keyPath: 'key' });
      }
      if (!db.objectStoreNames.contains('theme')) {
        db.createObjectStore('theme', { keyPath: 'key' });
      }
    },
  });
}

// Cart operations
export async function getCartItems() {
  const db = await initDB();
  return await db.getAll('cart');
}

export async function addToCart(book) {
  const db = await initDB();
  const existingItem = await db.get('cart', book.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
    await db.put('cart', existingItem);
    return existingItem;
  } else {
    const cartItem = { ...book, quantity: 1 };
    await db.put('cart', cartItem);
    return cartItem;
  }
}

export async function updateCartItem(id, quantity) {
  const db = await initDB();
  if (quantity <= 0) {
    await db.delete('cart', id);
    return null;
  } else {
    const item = await db.get('cart', id);
    if (item) {
      item.quantity = quantity;
      await db.put('cart', item);
      return item;
    }
  }
}

export async function removeFromCart(id) {
  const db = await initDB();
  await db.delete('cart', id);
}

export async function clearCart() {
  const db = await initDB();
  await db.clear('cart');
}

// Favorites operations
export async function getFavorites() {
  const db = await initDB();
  return await db.getAll('favorites');
}

export async function addToFavorites(book) {
  const db = await initDB();
  await db.put('favorites', book);
}

export async function removeFromFavorites(id) {
  const db = await initDB();
  await db.delete('favorites', id);
}

export async function isFavorite(id) {
  const db = await initDB();
  const item = await db.get('favorites', id);
  return !!item;
}

// Auth operations
export async function saveAuthState(authData) {
  const db = await initDB();
  await db.put('auth', { key: 'currentUser', ...authData });
}

export async function getAuthState() {
  const db = await initDB();
  const authData = await db.get('auth', 'currentUser');
  return authData || null;
}

export async function clearAuthState() {
  const db = await initDB();
  await db.delete('auth', 'currentUser');
}

// Theme operations
export async function saveTheme(theme) {
  const db = await initDB();
  await db.put('theme', { key: 'currentTheme', theme });
}

export async function getTheme() {
  const db = await initDB();
  const themeData = await db.get('theme', 'currentTheme');
  return themeData?.theme || 'light';
}