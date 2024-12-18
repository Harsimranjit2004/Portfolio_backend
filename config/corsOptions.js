const allowedOrigins = [
"https://dev.d3q0bfxw9379o9.amplifyapp.com",
  "http://localhost:5173",
  "http://ec2-18-189-184-216.us-east-2.compute.amazonaws.com"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
   allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
