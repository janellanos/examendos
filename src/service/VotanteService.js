import axios from 'axios';

export class VotanteService {


    getVotante() {
        return axios.get('http://localhost:9090/api/v1.0/votante/').then(res => res.data.result);
    }

    putVotante(vot) {
        return axios.get('http://localhost:9090/api/v1.0/votante/'),vot;
    }
    postVotante(votan) {
        return axios.get('http://localhost:9090/api/v1.0/votante/'),votan;
    }

    deleteVotante(id) {
        return axios.get('http://localhost:9090/api/v1.0/votante/+id');
    }


}