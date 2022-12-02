function Validation(){
    this.checkEmpty=function(value,spanId,message){
        if(value===""){
            getEle(spanId).style.display="block";            
            getEle(spanId).innerHTML=message;           
            return false;
        }
        else{
            getEle(spanId).style.display="none";
            getEle(spanId).innerHTML="";
            return true;
        }
    };
    this.checkConflict=function(value,data,spanId,message){        
        for (var i=0;i<data.length;i++){
            if (value===data[i].taiKhoan){
                getEle(spanId).innerHTML=message;
                getEle(spanId).style.display="block";
                return false;
            }  
            else{
                getEle(spanId).innerHTML="";
                getEle(spanId).style.display="none";
            }            
        }          
        return true;    
    }  
    this.checkString=function(value,spanId,message){
        var letter="^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if(value.match(letter)){
            getEle(spanId).innerHTML="";
            getEle(spanId).style.display="none";
            return true;
        }
        else{
            getEle(spanId).innerHTML=message;
            getEle(spanId).style.display="block";
            return false;
        }
    }
    this.checkSpecialPass=function(value,spanId,message){
        var letter=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if(value.match(letter)){
            getEle(spanId).innerHTML="";
            getEle(spanId).style.display="none";
            return true;
        }
        else{
            getEle(spanId).innerHTML=message;
            getEle(spanId).style.display="block";
            return false;
        }
    }
    this.checkValueLength=function(value,spanId,message,min,max){
        if(min<=value.length&&value.length<=max){
            getEle(spanId).innerHTML="";
            getEle(spanId).style.display="none";
            return true;
        }
        else{
            getEle(spanId).innerHTML=message;
            getEle(spanId).style.display="block";
            return false;
        }
    }
    this.checkEmail=function(value,spanId,message){
        var letter=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(value.match(letter)){
            getEle(spanId).innerHTML="";
            getEle(spanId).style.display="none";
            return true;
        }
        else{
            getEle(spanId).innerHTML=message;
            getEle(spanId).style.display="block";
            return false;
        }
    }
    this.checkChosen=function(selectId,spanId,message){
        if(getEle(selectId).selectedIndex!=0){
            getEle(spanId).innerHTML="";
            getEle(spanId).style.display="none";
            return true;
        }
        getEle(spanId).innerHTML=message;
        getEle(spanId).style.display="block";
        return false;
    }
}
