function getEle(id){
    return document.getElementById(id);
}

var service = new UserServices();

function getList(){
    service
    .getListUserAPI()
    .then(function(result){
        renderTeacher(result.data);
    })
    .catch(function(error){
        console.log(error);
    })
}
getList();

function renderTeacher(data){
    var html = "";
    data.forEach(function(item){
        if(item.loaiND == "GV"){
            html += `
            <div class="col-6 col-lg-3">
                <div class="teacher__card card">
                    <img src="./images/${item.hinhAnh}" class="card-img-top" alt="teacher 1">
                    <div class="card-body">
                        <h5 class="card-title">${item.ngonNgu}</h5>
                        <h3>${item.hoTen}</h3>
                        <p class="card-text">${item.moTa}</p>
                    </div>
                </div>
            </div>
            `;
        }
    });
    getEle("teacher-content").innerHTML = html;
}