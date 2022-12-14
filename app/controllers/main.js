//User Interface
var userservice=new userService();
function getEle(id){
    return document.getElementById(id);
};
function renderHTML(data){
    var content="";  
    var n=data.length;
    var count=0;
    for(var i=0;i<n;i++){
        if(data[i].loaiND==="GV"){
            count++;
        }
    }
    if(count<=3){
        data.forEach((user) => {
            if(user.loaiND==="GV"){
                content+=`
                <div class="card col-xl-${12/count} col-md-6" style="width: 18rem;">
                    <div class="card-content">
                        <img src="./../../images/${user.hinhAnh}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${user.ngonNgu}</h5>
                        <h3>${user.hoTen}</h3>
                        <p class="card-text">${user.moTa}</p>
                        </div>
                    </div>
                </div>  
                `;     
            }
               
        });        
    }
    else{
        data.forEach((user) => {
            if(user.loaiND==="GV"){
                content+=`
                <div class="card col-xl-4 col-md-6" style="width: 18rem;">
                    <div class="card-content">
                        <img src="./../../images/${user.hinhAnh}" class="card-img-top">
                        <div class="card-body">
                        <h5 class="card-title">${user.ngonNgu}</h5>
                        <h3>${user.hoTen}</h3>
                        <p class="card-text">${user.moTa}</p>
                        </div>
                    </div>
                </div>  
                `;     
            }
               
        });     
    }    
    console.log(content);
    getEle("listcard").innerHTML=content;
};
function getListCard(){
    userservice.getListUserAPI()
    .then((result)=>{
        renderHTML(result.data);
    })
    .catch((error)=>{
        console.log(error);
    })

};
getListCard();

//Admin Interface

//Get info on admin page
function renderInfoUser(data){
    var contentAdmin="";
    data.forEach((user) => {
        contentAdmin+=`
        <tr>
            <td>${user.id}</td>
            <td>${user.taiKhoan}</td>
            <td>${user.matKhau}</td>
            <td>${user.hoTen}</td>
            <td>${user.email}</td>
            <td>${user.ngonNgu}</td>
            <td>${user.loaiND}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="getDetailUser('${user.id}')">Edit</button>
                <button class="btn btn-danger" onclick="deleteUser('${user.id}')">Delete</button>
            </td>
        </tr>
        `;        
    });
   
    getEle("tblDanhSachNguoiDung").innerHTML=contentAdmin;

}
function getListUser(){
    userservice.getListUserAPI()
    .then((result)=>{
        renderInfoUser(result.data);
    })
    .catch((error)=>{
        console.log(error);
    })

};
getListUser();
function getArray(){
    var promise=new Promise((resolve,reject)=>{
        userservice.getListUserAPI()
        .then((result)=>{
            resolve(result.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
    return promise;
};


//reset form
function resetForm(){
    getEle("input-form").reset();
    getEle("tbTaiKhoan").style.display="none";
    getEle("tbHoTen").style.display="none";
    getEle("tbMatKhau").style.display="none";
    getEle("tbEmail").style.display="none";
    getEle("tbHinhAnh").style.display="none";
    getEle("tbLoaiND").style.display="none";
    getEle("tbNgonNgu").style.display="none";
    getEle("tbMoTa").style.display="none";
}
//Add User
function addUserButton(){
    var title="Th??m ng?????i d??ng";
    document.getElementsByClassName("modal-title")[0].innerHTML=title;

    var addButton=`<button class="btn btn-success" id="adduser" onclick="addUser()">Th??m</button>`;
    addButton+=`<button class="btn btn-danger" data-dismiss="modal" onclick="resetForm()">????ng</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML=addButton;
}
async function addUser(){
    var taikhoan=getEle("TaiKhoan").value;
    var hoten=getEle("HoTen").value;
    var matkhau=getEle("MatKhau").value;
    var email=getEle("Email").value;
    var loaiND=getEle("loaiNguoiDung").value;
    var ngonngu=getEle("loaiNgonNgu").value;
    var mota=getEle("MoTa").value;
    var hinhanh=getEle("HinhAnh").value;
    var dsuser=await getArray();    
    var isValid=true;
    var valid=new Validation();        
    
    //Ki???m tra t??i kho???n: kh??ng tr???ng, kh??ng tr??ng.
    isValid&=valid.checkEmpty(taikhoan,"tbTaiKhoan","(*) Vui l??ng nh???p t??i kho???n")&&
    valid.checkConflict(taikhoan,dsuser,"tbTaiKhoan","(*) T??i kho???n ???? t???n t???i");
    //Ki???m tra h??? t??n: kh??ng tr???ng, kh??ng ch???a s??? ho???c k?? t??? ?????c bi???t
    isValid&=valid.checkEmpty(hoten,"tbHoTen","(*) Vui l??ng nh???p h??? t??n")&&
    valid.checkString(hoten,"tbHoTen","(*) Vui l??ng nh???p l???i h??? t??n: kh??ng ch???a s??? ho???c k?? t??? ?????c bi???t");
    //Ki???m tra m???t kh???u: kh??ng ????? tr???ng, ????ng format (c?? 1 k?? t??? hoa, 1 ?????c bi???t, 1 k?? t??? s??? v?? ????? d??i 6-8 k?? t???)
    isValid&=valid.checkEmpty(matkhau,"tbMatKhau","(*) Vui l??ng nh???p m???t kh???u")&&
    valid.checkSpecialPass(matkhau,"tbMatKhau","(*) Vui l??ng nh???p m???t kh???u c?? 1 k?? t??? in hoa, 1 k?? t??? ?????c bi???t, 1 k?? t??? s??? v?? ????? d??i 6-8 k?? t???")&&
    valid.checkValueLength(matkhau,"tbMatKhau","(*) Vui l??ng nh???p m???t kh???u c?? 1 k?? t??? in hoa, 1 k?? t??? ?????c bi???t, 1 k?? t??? s??? v?? ????? d??i 6-8 k?? t???",6,8);

    //Ki???m tra email: kh??ng tr???ng, ????ng format email
    isValid&=valid.checkEmpty(email,"tbEmail","(*) Vui l??ng nh???p email")&&
    valid.checkEmail(email,"tbEmail","(*) Vui l??ng nh???p email ????ng ?????nh d???ng @domainname(.com or .vn)");
    //Ki???m tra h??nh ???nh: kh??ng ????? tr???ng
    isValid&=valid.checkEmpty(hinhanh,"tbHinhAnh","(*) Vui l??ng nh???p h??nh ???nh");
    //Ki???m tra ng?????i d??ng: ph???i ch???n
    isValid&=valid.checkChosen("loaiNguoiDung","tbLoaiND","(*) Vui l??ng ch???n ng?????i d??ng");
    //Ki???m tra lo???i ng??n ng???: ph???i ch???n
    isValid&=valid.checkChosen("loaiNgonNgu","tbNgonNgu","(*) Vui l??ng ch???n ng??n ng???");


    //ki???m tra m?? t???: kh??ng tr???ng, kh??ng qu?? 60 k?? t???
    isValid&=valid.checkEmpty(mota,"tbMoTa","(*) Vui l??ng nh???p m?? t???")&&
    valid.checkValueLength(mota,"tbMoTa","(*) Vui l??ng nh???p m?? t??? t???i ??a 60 k?? t???",0,60);
    if(!isValid) return;
    var user=new User("",taikhoan,hoten,matkhau,email,loaiND,ngonngu,mota,hinhanh);
    userservice.addUserAPI(user)
    .then((result)=>{
        alert("Add Successfully"); 
        getListUser();
        getListCard();
    })
    .catch((error)=>{
        console.log(error);
    })
}
//Edit User
function getDetailUser(id){
    var edittitle="S???a ng?????i d??ng";
    document.getElementsByClassName("modal-title")[0].innerHTML=edittitle;

    var editButton=`<button class="btn btn-success" onclick="updateUser('${id}')" data-dismiss="modal">C???p nh???t</button>`;
    editButton+=`<button class="btn btn-danger" onclick="resetForm()" data-dismiss="modal" >????ng</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML=editButton;

    userservice.getUserAPIbyId(id)
        .then((result)=>{
            var user=result.data;
            getEle("TaiKhoan").value=user.taiKhoan;
            getEle("HoTen").value=user.hoTen;
            getEle("MatKhau").value=user.matKhau;
            getEle("Email").value=user.email;
            getEle("loaiNguoiDung").value=user.loaiND;
            getEle("loaiNgonNgu").value=user.ngonNgu;
            getEle("MoTa").value=user.moTa;
            getEle("HinhAnh").value=user.hinhAnh;
        })
        .catch((error)=>{
            console.log(error);
        });
}
function updateUser(id){
    var taikhoan=getEle("TaiKhoan").value;
    var hoten=getEle("HoTen").value;
    var matkhau=getEle("MatKhau").value;
    var email=getEle("Email").value;
    var loaiND=getEle("loaiNguoiDung").value;
    var ngonngu=getEle("loaiNgonNgu").value;
    var mota=getEle("MoTa").value;
    var hinhanh=getEle("HinhAnh").value;

    var user=new User(id,taikhoan,hoten,matkhau,email,loaiND,ngonngu,mota,hinhanh);
   
    userservice.updateUserAPI(user)
    .then((result)=>{  
        alert("Update Successfully");      
        getListUser();        
    })
    .catch((error)=>{
        console.log(error);
    });
    getListCard();
}

//Delete User
function deleteUser(id){
    userservice.deleteUserAPI(id)
    .then((result)=>{
        alert("Delete Successfully");
        getListUser();
        
    })
    .catch((error)=>{
        console.log(error);
    });
    getListCard();
}