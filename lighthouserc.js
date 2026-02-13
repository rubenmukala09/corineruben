module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/contact",
        "http://localhost:3000/pricing",
      ],
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
