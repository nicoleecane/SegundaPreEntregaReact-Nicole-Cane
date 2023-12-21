import { createContext, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export const FirebaseContext = createContext(null);

export const FirebaseContextProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductsDB = async (category) => {
    setIsLoading(true);
    const myProducts = category
      ? query(collection(db, "products"), where("category", "==", category))
      : collection(db, "products");

    const resp = await getDocs(myProducts);
    const productList = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
    setIsLoading(false);
  };

  const getProductById = async (id) => {
    setIsLoading(true);
    const productRef = doc(db, "products", id);
    const resp = await getDoc(productRef);
    if (resp.exists()) {
      setProduct({ id: resp.id, ...resp.data() });
    } else {
      setProduct(null);
    }
    setIsLoading(false);
  };

  const discountStock = async (product) => {
    const productRef = doc(db, "products", product.id);
    const newStock = product.stock - 1;
    await updateDoc(productRef, { stock: newStock });
  };

  const addOrderDB = async (cartItems, userData, total) => {
    const newOrder = {
      buyer: userData,
      items: cartItems,
      date: serverTimestamp(),
      total,
    };

    console.log("New order being added:", newOrder);

    const orderRef = await addDoc(collection(db, "orders"), newOrder);
    return orderRef.id; // Return the new order's ID
  };

  const objectValue = {
    products,
    product,
    isLoading,
    getProductsDB,
    getProductById,
    discountStock,
    addOrderDB,
  };

  return (
    <FirebaseContext.Provider value={objectValue}>
      {children}
    </FirebaseContext.Provider>
  );
};
