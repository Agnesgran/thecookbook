import axios from "axios" ;

axios.defaults.baseURL = "https://cookbookapi3-5d094bdeaa98.herokuapp.com/"
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true