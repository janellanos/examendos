import axios from 'axios';
const url = "http://localhost:9090/api/v1.0/votante/";
export class VotanteService {
  /* getVotante() {
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
    }*/




    getVotantes(ruc, state) {
        return axios
            .get(url)
            .then((res) => {
                if (res.data.success) {
                    state(res.data.result.filter((item) => item.instituciones.ruc === ruc));
                }
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response.status;
                }
            });
    }

    getCodigo(id) {
        console.log(id);
        return axios
            .get(url + "codigo/" + id)
            .then((res) => {
                if (res.data.success) {
                    return res.data.result;
                }
            })
            .catch(function (error) {
                if (error.response) {
                    return error.response.status;
                }
            });
    }
    postVotante(data) {
        return axios.post(url, data).catch(function (error) {
            if (error.response) {
                return error.response.status;
            }
        });
    }
    updateVotante(data) {
        return axios.put(url, data, ).catch(function (error) {
            if (error.response) {
                return error.response.status;
            }
        });
    }
    deleteVotante(id) {
        return axios
            .delete(url + id,)
            .then((resp) => resp.data.success)
            .catch(function (error) {
                return error.response.data.status;
            });
    }
}

