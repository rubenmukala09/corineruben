module.exports = {
  ci: {
    collect: {
      startServerCommand:
        "npm run preview -- --host 127.0.0.1 --port 3000 --strictPort",
      numberOfRuns: 1,
      settings: {
        preset: "desktop",
      },
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
