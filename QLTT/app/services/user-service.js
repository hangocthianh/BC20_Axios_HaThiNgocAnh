function UserServices(){
    this.getUserListAPI = function(){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung",
            method: "GET",
        });
    }
    this.deleteUserAPI = function(id){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung/" + id,
            method: "DELETE",
        });
    }
    this.addUserAPI = function(user){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung",
            method: "POST",
            data: user,
        });
    }
    this.getUserById = function(id){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung/" + id,
            method: "GET",
        })
    }
    this.updateUserAPI = function(user){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung/" + user.id,
            method: "PUT",
            data: user,
        })
    }
}