exports.config = {
  projectRoot: "src/app",
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./markdown/posts"
      }
    },
    '/conferences/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./markdown/conferences"
      }
    },
  }, 
  hostName: '0.0.0.0'
};
