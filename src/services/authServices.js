import { onValue, ref, set } from "firebase/database";
import { db } from "../../firebase.config";

export function fetchUserData(uid) {
  const dataRef = ref(db, "users/" + uid);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        console.log(error.message);
        reject(error.message);
      }
    );
  });
}

export function writeUserData({
  uid,
  name = "",
  email = "",
  birthDate = "",
  events = [],
}) {
  try {
    return set(ref(db, "users/" + uid), {
      uid,
      name,
      email,
      birthDate,
      events,
    });
  } catch (error) {
    console.log(error.message);
  }
}
