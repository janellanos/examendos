import axios from 'axios';

const url="http://localhost:9090/api/v1.0/ciudad/";

export class CiudadService {


    getCiudad= async(state)=> {
        return axios.get(url).then((resp)=> state(resp.data.result));
    };

 


}