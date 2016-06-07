module.exports = {
  'GET /' : {
    template: 'pages/index.ftl',
    jsonFile: '../data/index.json'
  },
  'GET /product' : {
    template: 'pages/product/index.ftl',
    jsonFile: '../data/product/index.json'
  }
};
