
import axios from 'axios';

export class SexoService {


    getSexo() {
        return axios.get('http://localhost:9090/api/v1.0/sexo/').then(res => res.data.result);
    }

    putSexo(sx) {
        return axios.get('http://localhost:9090/api/v1.0/sexo/'),sx;
    }
    postSexo(sex) {
        return axios.get('http://localhost:9090/api/v1.0/sexo/'),sex;
    }

    deleteSexo(id) {
        return axios.get('http://localhost:9090/api/v1.0/sexo/+id');
    }


}