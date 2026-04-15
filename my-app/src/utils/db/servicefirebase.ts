import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);
const USERS_COLLECTION = "users";

export type UserRole = "user" | "editor" | "admin";

type PublicUser = {
  email: string;
  fullname?: string | null;
  image?: string | null;
  type?: string;
  role?: UserRole;
};

type SignUpInput = {
  email: string;
  fullname: string;
  password: string;
  role?: UserRole;
};

type SignUpResult = {
  status: "success" | "error";
  message: string;
};

type OAuthResult = {
  status: boolean;
  data: PublicUser;
};

function sanitizeRole(role?: string): UserRole {
  if (role === "admin" || role === "editor") {
    return role;
  }

  return "user";
}

async function getUsersByEmail(email: string) {
  const usersQuery = query(
    collection(db, USERS_COLLECTION),
    where("email", "==", email),
  );
  const querySnapshot = await getDocs(usersQuery);

  return querySnapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

async function retrieveCollectionData(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  }));
}

export async function retrieveProducts(collectionName: string) {
  return retrieveCollectionData(collectionName);
}

export async function signIn(email: string) {
  const users = await getUsersByEmail(email);
  return users[0] || null;
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));
  const data = snapshot.data();
  return data;
}

// Backward-compatible alias (some pages still import `retrieveDataByID`)
export const retrieveDataByID = retrieveDataById;

export async function retrieveLapars(collectionName: string) {
  return retrieveCollectionData(collectionName);
}

export async function signUp(
  userData: SignUpInput,
  callback?: (result: SignUpResult) => void,
) {
  const existingUsers = await getUsersByEmail(userData.email);

  if (existingUsers.length > 0) {
    const result: SignUpResult = {
      status: "error",
      message: "User already exists",
    };

    callback?.(result);
    return result;
  }

  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const nextUser = {
      email: userData.email,
      fullname: userData.fullname,
      password: hashedPassword,
      role: sanitizeRole(userData.role),
    };

    await addDoc(collection(db, USERS_COLLECTION), nextUser);

    const result: SignUpResult = {
      status: "success",
      message: "User registered successfully",
    };

    callback?.(result);
    return result;
  } catch {
    const result: SignUpResult = {
      status: "error",
      message: "An error occurred while registering the user",
    };

    callback?.(result);
    return result;
  }
}

export async function signInWithOAuth(
  provider: "google" | "github",
  userData: PublicUser,
  callback?: (result: OAuthResult) => void,
) {
  const users = await getUsersByEmail(userData.email);

  if (users.length > 0) {
    const existingUser = users[0] as Record<string, unknown>;
    const existingEmail =
      typeof existingUser.email === "string" ? existingUser.email : userData.email;
    const mergedFullname =
      userData.fullname ||
      (typeof existingUser.fullname === "string" ? existingUser.fullname : undefined);
    const mergedImage =
      userData.image ??
      (typeof existingUser.image === "string" ? existingUser.image : undefined);
    const mergedRole = sanitizeRole(
      typeof existingUser.role === "string" ? existingUser.role : userData.role,
    );

    await updateDoc(doc(db, USERS_COLLECTION, String(existingUser.id ?? users[0].id)), {
      fullname: mergedFullname || "",
      image: mergedImage || null,
      type: provider,
      role: mergedRole,
    });

    const result: OAuthResult = {
      status: true,
      data: {
        email: existingEmail,
        fullname: mergedFullname,
        image: mergedImage,
        type: provider,
        role: mergedRole,
      },
    };

    callback?.(result);
    return result;
  }

  const newUser = {
    email: userData.email,
    fullname: userData.fullname || "",
    image: userData.image || null,
    type: provider,
    role: sanitizeRole(userData.role),
  };

  await addDoc(collection(db, USERS_COLLECTION), newUser);

  const result: OAuthResult = {
    status: true,
    data: newUser,
  };

  callback?.(result);
  return result;
}