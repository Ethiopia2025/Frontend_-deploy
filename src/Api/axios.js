import axios from "axios";

const axiosInstance = axios.create({


// backend localhost link
// baseURL: "http://127.0.0.1:5001/ethiopia-e67f1/us-central1/api"

//firebase backend deployed link
baseURL: "https://api-g7acqlzvrq-uc.a.run.app"

// backend by node js
//baseURL: "https://amazonapi-deploy-0pr2.onrender.com"
})

export default axiosInstance;