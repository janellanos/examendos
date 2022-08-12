import axios from 'axios';

export class ProductService {


    getProvincia() {
        return axios.get('http://localhost:9090/api/v1.0/provincia/').then(res => res.data.result);
    }

    putProvincia() {
        return axios.get('http://localhost:9090/api/v1.0/provincia/').then(res => res.data.result);
    }
    postProvincia() {
        return axios.get('http://localhost:9090/api/v1.0/provincia/').then(res => res.data.result);
    }

    deleteProvincia() {
        return axios.get('http://localhost:9090/api/v1.0/provincia/').then(res => res.data.result);
    }


    getCiudad() {
        return axios.get('http://localhost:9090/api/v1.0/ciudad/').then(res => res.data.result);
    }
    putCiudad(ciud) {
        return axios.get('http://localhost:9090/api/v1.0/ciudad/',ciud);
    }
  
    }
