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
    var title="Thêm người dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML=title;

    var addButton=`<button class="btn btn-success" id="adduser" onclick="addUser()">Thêm</button>`;
    addButton+=`<button class="btn btn-danger" data-dismiss="modal" onclick="resetForm()">Đóng</button>`;
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
    
    //Kiểm tra tài khoản: không trống, không trùng.
    isValid&=valid.checkEmpty(taikhoan,"tbTaiKhoan","(*) Vui lòng nhập tài khoản")&&
    valid.checkConflict(taikhoan,dsuser,"tbTaiKhoan","(*) Tài khoản đã tồn tại");
    //Kiểm tra họ tên: không trống, không chứa số hoặc kí tự đặc biệt
    isValid&=valid.checkEmpty(hoten,"tbHoTen","(*) Vui lòng nhập họ tên")&&
    valid.checkString(hoten,"tbHoTen","(*) Vui lòng nhập lại họ tên: không chứa số hoặc kí tự đặc biệt");
    //Kiểm tra mật khẩu: không để trống, đúng format (có 1 kí tự hoa, 1 đặc biệt, 1 kí tự số và độ dài 6-8 kí tự)
    isValid&=valid.checkEmpty(matkhau,"tbMatKhau","(*) Vui lòng nhập mật khẩu")&&
    valid.checkSpecialPass(matkhau,"tbMatKhau","(*) Vui lòng nhập mật khẩu có 1 kí tự in hoa, 1 kí tự đặc biệt, 1 kí tự số và độ dài 6-8 kí tự")&&
    valid.checkValueLength(matkhau,"tbMatKhau","(*) Vui lòng nhập mật khẩu có 1 kí tự in hoa, 1 kí tự đặc biệt, 1 kí tự số và độ dài 6-8 kí tự",6,8);

    //Kiểm tra email: không trống, đúng format email
    isValid&=valid.checkEmpty(email,"tbEmail","(*) Vui lòng nhập email")&&
    valid.checkEmail(email,"tbEmail","(*) Vui lòng nhập email đúng định dạng @domainname(.com or .vn)");
    //Kiểm tra hình ảnh: không để trống
    isValid&=valid.checkEmpty(hinhanh,"tbHinhAnh","(*) Vui lòng nhập hình ảnh");
    //Kiểm tra người dùng: phải chọn
    isValid&=valid.checkChosen("loaiNguoiDung","tbLoaiND","(*) Vui lòng chọn người dùng");
    //Kiểm tra loại ngôn ngữ: phải chọn
    isValid&=valid.checkChosen("loaiNgonNgu","tbNgonNgu","(*) Vui lòng chọn ngôn ngữ");


    //kiểm tra mô tả: không trống, không quá 60 kí tự
    isValid&=valid.checkEmpty(mota,"tbMoTa","(*) Vui lòng nhập mô tả")&&
    valid.checkValueLength(mota,"tbMoTa","(*) Vui lòng nhập mô tả tối đa 60 kí tự",0,60);
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
    var edittitle="Sửa người dùng";
    document.getElementsByClassName("modal-title")[0].innerHTML=edittitle;

    var editButton=`<button class="btn btn-success" onclick="updateUser('${id}')" data-dismiss="modal">Cập nhật</button>`;
    editButton+=`<button class="btn btn-danger" onclick="resetForm()" data-dismiss="modal" >Đóng</button>`;
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