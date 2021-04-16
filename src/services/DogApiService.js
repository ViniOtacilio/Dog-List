import http from "../http-common";

class ListaDataService {

    listAll(){
        return http.get("/list/all");
    }

    getByBreed(data) {
        return http.get(data + "images");
    }

    getBySubBreed(data) {
        return http.delete(data + "list");
    }
}

export default new ListaDataService();