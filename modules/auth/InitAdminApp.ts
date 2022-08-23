import * as admin from "firebase-admin";
import { firebaseAdminConfig } from "../../config/FirebaseApp";

/**
 * Initialize the Firebase admin SDK,
 *  or return the existing instance if it's already initialized.
 *
 * @returns {Object} An object containing references to the 
 * firebaseApp and its authentication service.
 */
export default function useAdminApp() {
  let adminAuth = null;
  let adminApp = null;
  if (admin.apps.length == 0) {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
    adminAuth = admin.auth(adminApp);
    return { adminApp, adminAuth };
  } else {
    return { adminApp: admin.apps[0], adminAuth: admin.auth() };
  }
}
