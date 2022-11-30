export default {
  postgres: {
    database: process.env.DB_NAME ?? "alquiler",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "",
    port: +(process.env.DB_PORT ?? 5432),
  },
  api: {
    PORT: process.env.PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
  },
  firebase: {
    // apiKey: "AIzaSyD8sf1-cqMxLWo7gDU0uIeQqiRn8_VNZEE",
    // authDomain: "social-network-fs.firebaseapp.com",
    // projectId: "social-network-fs",
    // storageBucket: "social-network-fs.appspot.com",
    // messagingSenderId: "374203391919",
    // appId: "1:374203391919:web:fa34d4a170b8fcf1b9595a",
    // measurementId: "G-GCCQSWB6RL",
    apiKey: "AIzaSyBg8CWNE89kPEiuLChZFP2mAymA3sR138s",
    authDomain: "platzi-course-1514.firebaseapp.com",
    projectId: "platzi-course-1514",
    storageBucket: "platzi-course-1514.appspot.com",
    messagingSenderId: "692160488731",
    appId: "1:692160488731:web:6603421f027c74c6c21fbe",
  },
};
