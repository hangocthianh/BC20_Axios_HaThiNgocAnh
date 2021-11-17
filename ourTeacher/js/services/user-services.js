function UserServices(){
    this.getListUserAPI = function(){
        return axios({
            url: "https://6183cae791d76c00172d1b5d.mockapi.io/api/quanLyNguoiDung",
            method: "GET",
        });
    }
}