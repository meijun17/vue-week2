import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

createApp({
  data(){
    return{
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "shila-hexschool",
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    // 確認登入是否成功
    checkAdmin(){
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        // 登入成功獲取資料
        .then( ()  => {
          this.getData();
        })
        // 登入失敗轉回首頁
        .catch( (err) => {
          alert(err.data.message)
          window.location = 'index.html';
        } )
    },
    // 獲取產品資料
    getData(){
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((response) => {
          // 將資料存入 data 的 products
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.data.message);
        })
    },
    // 事件綁定  將事件觸發的商品存入 data 的 tempProduct
    openProduct(desert) {
      this.tempProduct = desert;
    }
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin()
  },
}).mount('#app');