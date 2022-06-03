import axios from "axios";

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

class AuthService {
    registration(username, password){
        return instance.post('/rest-auth/registration/', {'username':username, 'password1':password, 'password2':password});
    }
    registration2(firstname, lastname, key){
        return instance.post('/univer/signup2/', {'firstname':firstname, 'lastname':lastname, 'key':key});
    }
    login(username, password){
        return instance.post('/rest-auth/login/', {'username':username, 'password':password});
    }
    getUser(key){
        return instance.post('/univer/user/', {'key':key})
    }
}
export default new AuthService();