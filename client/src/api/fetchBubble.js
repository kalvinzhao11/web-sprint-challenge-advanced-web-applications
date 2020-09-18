import {axiosWithAuth} from '../utils/axiosWithAuth'

export const fetchBubble = () => {
    return axiosWithAuth()
    .get('/api/colors')
    .then(res => {
        return res
    });
};