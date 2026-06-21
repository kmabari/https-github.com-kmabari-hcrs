import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));

async function testSingle() {
  const app = initializeApp(config, "TestSingleWrite");
  const db = getFirestore(app);

  try {
    const docRef = doc(db, 'users', 'test_doc_web_sdk');
    await setDoc(docRef, { name: 'Test User Web SDK', test: true });
    console.log("SUCCESS! Wrote a single document!");
  } catch (err: any) {
    console.error("Single write failed:", err.message);
  }
}

testSingle()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
