/* eslint-disable no-console */

import { AggregateField, Firestore } from '@google-cloud/firestore';

async function main() {
  const firestore = new Firestore();

  const rev1 = firestore.doc('experiments/1');
  const rev2 = firestore.doc('experiments/2');
  await rev1.set({
    x: 10,
    y: 20,
  });
  await rev2.set({
    x: 30,
    y: 90,
  });
  const col = firestore.collection('experiments');
  const sumAgg = col.aggregate({ total: AggregateField.sum('y') });
  const snapshot = await sumAgg.get();
  console.log(snapshot.data().total);
}

main().catch(console.error);
