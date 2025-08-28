import { addDoc, collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Products
export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addProduct = async (productData) => {
  const docRef = await addDoc(collection(db, 'products'), productData);
  return { id: docRef.id, ...productData };
};

// Branches
export const getBranches = async () => {
  const snapshot = await getDocs(collection(db, 'branches'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addBranch = async (branchData) => {
  const docRef = await addDoc(collection(db, 'branches'), branchData);
  return { id: docRef.id, ...branchData };
};

export const updateInventory = async (branchId, inventory) => {
  await updateDoc(doc(db, 'branches', branchId), { inventory });
  return { branchId, inventory };
};

export const addEmployee = async (branchId, employeeData) => {
  const branchRef = doc(db, 'branches', branchId);
  const branchDoc = await getDoc(branchRef);
  if (!branchDoc.exists()) throw new Error('Branch not found');
  const currentEmployees = branchDoc.data().employees || [];
  const updatedEmployees = [...currentEmployees, { ...employeeData, employeeId: Date.now().toString() }];
  await updateDoc(branchRef, { employees: updatedEmployees });
  return { branchId, employee: updatedEmployees[updatedEmployees.length - 1] };
};

// Reviews
export const submitReview = async (branchId, review) => {
  const docRef = await addDoc(collection(db, `branches/${branchId}/reviews`), review);
  return { id: docRef.id, ...review };
};

export const getReviews = async (branchId) => {
  const snapshot = await getDocs(collection(db, 'branches', branchId, 'reviews'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Orders
export const submitOrder = async (order) => {
  const docRef = await addDoc(collection(db, 'orders'), order);
  return { id: docRef.id, ...order };
};

// Offers
export const addOffer = async (offer) => {
  const docRef = await addDoc(collection(db, 'offers'), offer);
  return { id: docRef.id, ...offer };
};

export const getOffers = async () => {
  const snapshot = await getDocs(collection(db, 'offers'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
