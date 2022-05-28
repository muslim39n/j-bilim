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
}
export default new UniversityService();