const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/fastmockapi":{
        target:"https://www.fastmock.site/mock/1ad908f2e0c248e8f1168883296d9911/qsApi",
        changeOrigin:true,
        ws:true,
      }, 
      "/DataJson":{
        target:"http://localhost:3000/DataJson",
        changeOrigin:true,
        ws:true,
      }, 
      "/":{
        target:"http://localhost:3000",
        changeOrigin:true,
        ws:false,
      },
      
    }
   
  }
})
