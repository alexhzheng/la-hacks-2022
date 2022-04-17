import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  updateDoc,
  doc,
  collection,
  getDocs,
  setDoc,
  addDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPShznb5emauNw5HiO0KR3SNmHaHO0yo0",
  authDomain: "lahacks-7edc4.firebaseapp.com",
  projectId: "lahacks-7edc4",
  storageBucket: "lahacks-7edc4.appspot.com",
  messagingSenderId: "859052923612",
  appId: "1:859052923612:web:93488a23385b1ea62b7219",
  measurementId: "G-PXT2KNRQ5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const firestore = getFirestore(app);

const addBill = async (address: string, bill: { phoneNumber: string, usdAmount: number, amount: number }[]) => {
  const docRef = await addDoc(collection(firestore, address), {splitList: bill});
  console.log("Document written with ID: ", docRef.id);
}

const getBills = async (address: string) => {
  const querySnapshot = await getDocs(collection(firestore, address));
  const bills = querySnapshot.docs.map(doc => doc.data());
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return bills;
}

export { addBill, getBills };
// const docRef = doc(firestore, `bills/${address}`);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log(docSnap.data());
//   } else {
//     await setDoc(docRef, { bill })
//   }