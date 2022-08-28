import axios from 'axios';

export class CandidatoService {


    getCandidato() {
        return axios.get('http://localhost:9090/api/v1.0/candidato/').then(res => res.data.result);
    }

    putCandidato(can) {
        return axios.get('http://localhost:9090/api/v1.0/candidato/'),can;
    }
    postCandidato(candi) {
        return axios.get('http://localhost:9090/api/v1.0/candidato/'),candi;
    }

    deleteCandidato(id) {
        return axios.get('http://localhost:9090/api/v1.0/candidato/+id');
    }


}