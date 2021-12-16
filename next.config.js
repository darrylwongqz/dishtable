module.exports = {
  images: {
    domains: ["ibb.co", "i.ibb.co", "res.cloudinary.com"],
  },
  env: {
    mapbox_key:
      "pk.eyJ1IjoiZGFycnlsd29uZ3F6IiwiYSI6ImNrd3VuNnAwZDFzMDIydm55dnJrb2g0cjgifQ.zoSO52rabC_LDw_g6b0GsQ",
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
