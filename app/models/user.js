function User(_id,_username,_fullname,_password,_email,_usertype,_language,_description,_image){
    this.id=_id;
    this.taiKhoan=_username;
    this.hoTen=_fullname;
    this.matKhau=_password;
    this.email=_email;
    this.loaiND=_usertype;
    this.ngonNgu=_language;
    this.moTa=_description;
    this.hinhAnh=_image;
}