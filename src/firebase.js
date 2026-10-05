import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot 
} from 'firebase/firestore';

// Firebase configuration (Reads from .env or fallback values)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Check if Firebase is properly configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID"
);

// Initialize Firebase safely
let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
  } catch (err) {
    console.error("Firebase initialization failed:", err);
  }
}

export { db };

// ── Cloud Firestore Operations for Projects ──────────────────────────────────
const PROJECTS_COLLECTION = 'projects';

/**
 * Fetch all projects from Firestore (falling back to localStorage if not configured)
 */
export const fetchCloudProjects = async () => {
  if (!db) {
    const local = localStorage.getItem('freelance_projects');
    return local ? JSON.parse(local) : [];
  }

  try {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const projectsList = [];
    querySnapshot.forEach((docSnap) => {
      projectsList.push({ id: docSnap.id, ...docSnap.data() });
    });
    return projectsList;
  } catch (error) {
    console.warn("Firestore fetch error, fallback to local storage:", error);
    const local = localStorage.getItem('freelance_projects');
    return local ? JSON.parse(local) : [];
  }
};

/**
 * Add a new project to Firestore (or local storage fallback)
 */
export const saveCloudProject = async (projectData) => {
  if (!db) {
    const local = JSON.parse(localStorage.getItem('freelance_projects') || '[]');
    const newProject = { id: Date.now().toString(), ...projectData, createdAt: new Date().toISOString() };
    const updated = [newProject, ...local];
    localStorage.setItem('freelance_projects', JSON.stringify(updated));
    window.dispatchEvent(new Event('projectAdded'));
    return newProject;
  }

  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: new Date().toISOString()
    });
    const saved = { id: docRef.id, ...projectData };
    window.dispatchEvent(new Event('projectAdded'));
    return saved;
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    throw error;
  }
};

/**
 * Update an existing project in Firestore
 */
export const updateCloudProject = async (id, updatedData) => {
  if (!db) {
    const local = JSON.parse(localStorage.getItem('freelance_projects') || '[]');
    const updated = local.map(p => p.id === id ? { ...p, ...updatedData } : p);
    localStorage.setItem('freelance_projects', JSON.stringify(updated));
    window.dispatchEvent(new Event('projectAdded'));
    return;
  }

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, updatedData);
    window.dispatchEvent(new Event('projectAdded'));
  } catch (error) {
    console.error("Error updating project in Firestore:", error);
    throw error;
  }
};

/**
 * Delete a project from Firestore
 */
export const deleteCloudProject = async (id) => {
  if (!db) {
    const local = JSON.parse(localStorage.getItem('freelance_projects') || '[]');
    const updated = local.filter(p => p.id !== id);
    localStorage.setItem('freelance_projects', JSON.stringify(updated));
    window.dispatchEvent(new Event('projectAdded'));
    return;
  }

  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(docRef);
    window.dispatchEvent(new Event('projectAdded'));
  } catch (error) {
    console.error("Error deleting project in Firestore:", error);
    throw error;
  }
};
