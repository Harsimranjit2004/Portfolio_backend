// const corsOptions = {
// //  origin: "https://harsimranjitsingh.onrender.com", // Allow access from any origin
//   origin: "http://localhost:5173",
//   // origin:"*",
//   // origin: "https://harsimranjit2004.vercel.app",
//   credentials: true,
//   optionsSuccessStatus: 200,
// };
// module.exports = corsOptions;
const allowedOrigins = [
  // "https://harsimranjitsingh.onrender.com",
  "http://localhost:5173",
  "https://a77d-142-204-17-60.ngrok-free.app",
  // "https://loose-apples-lead.loca.lt",
  "http://10.248.139.182:5173",
  "https://e2dd-142-204-17-60.ngrok-free.app",
  "http://10.248.139.182:5173",
  "https://harsimranjit2004.vercel.app",


];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies, authorization headers, etc.
  optionsSuccessStatus: 200, // For legacy browsers
};

module.exports = corsOptions;
