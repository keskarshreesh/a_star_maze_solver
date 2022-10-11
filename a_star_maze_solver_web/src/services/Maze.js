import axios from 'axios';

export const getMaze =() => {

    return axios({
        method: 'get',
        url: "/maze"
    })
}