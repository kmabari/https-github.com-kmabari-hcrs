import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

async function run() {
  const app = initializeApp({
    projectId: "gen-lang-client-0932665202"
  });
  const db = getFirestore(app, "ai-studio-2eaab070-9ce1-4d91-bbeb-abf7bacb0528");
  console.log("Database initialized successfully!");

  // 1. Get user hcrskerala@gmail.com
  const usersRef = db.collection('users');
  const hcrskeralaSnap = await usersRef.where('email', '==', 'hcrskerala@gmail.com').get();
  console.log(`Found ${hcrskeralaSnap.size} documents for hcrskerala@gmail.com:`);
  hcrskeralaSnap.forEach(doc => {
    console.log(doc.id, "=>", { ...doc.data(), photoUrl: undefined, photo: undefined, photo_base64: undefined });
  });

  // 2. Count total users
  const totalSnap = await usersRef.get();
  console.log(`Total users in DB: ${totalSnap.size}`);

  // 3. Count / find pending registrations
  const pendingSnap = await usersRef.where('status', '==', 'pending').get();
  console.log(`Total pending users (where status == 'pending'): ${pendingSnap.size}`);
  if (pendingSnap.size > 0) {
    console.log("Sample pending users (first 5):");
    let count = 0;
    pendingSnap.forEach(doc => {
      if (count++ < 5) {
        console.log(doc.id, "=>", { ...doc.data(), photoUrl: undefined, photo: undefined, photo_base64: undefined });
      }
    });
  }

  // 4. Count / find renewalPending users
  const renewalPendingSnap = await usersRef.where('renewalPending', '==', true).get();
  console.log(`Total renewalPending users (where renewalPending == true): ${renewalPendingSnap.size}`);
  if (renewalPendingSnap.size > 0) {
    console.log("Sample renewalPending users (first 5):");
    let count = 0;
    renewalPendingSnap.forEach(doc => {
      if (count++ < 5) {
        console.log(doc.id, "=>", { ...doc.data(), photoUrl: undefined, photo: undefined, photo_base64: undefined });
      }
    });
  }

  // 5. Look for users with other status
  const statusCounts: Record<string, number> = {};
  totalSnap.forEach(doc => {
    const data = doc.data();
    statusCounts[data.status] = (statusCounts[data.status] || 0) + 1;
  });
  console.log("Status distribution:", statusCounts);
}

run().catch(console.error);
