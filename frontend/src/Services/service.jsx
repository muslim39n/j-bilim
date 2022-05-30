import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

class UniversityService {
    getUniversityList(){
        return instance.get('/univer');
    }

    getCityList(){
        return instance.get('/univer/cities');
    }

    getUniverDetail(id){
        return instance.get('univer/'+id)
    }

    getQueue(id, m, dy){
        return instance.get('univer/' + id + '/q/' + m + '/' + dy + '/');
    }

    choosePlace(id, m, dy, n, queue_id){
        return instance.post('univer/' + id + '/q/' + m + '/' + dy + '/', {"queue_id": queue_id, "fullname": "mal", "n": n})
    }
}
export default new UniversityService();