function userService(){
    this.getListUserAPI=function(){
        return axios({
            url:"https://638715e7e399d2e473f4089c.mockapi.io/api/products",
            method:"GET",
        });
    };
    this.addUserAPI=function(user){
        return axios({
            url:"https://638715e7e399d2e473f4089c.mockapi.io/api/products",
            method:"POST",
            data: user,
        });
    };
    this.deleteUserAPI=function(id){
        return axios({
            url: `https://638715e7e399d2e473f4089c.mockapi.io/api/products/${id}`,
            method: "DELETE",

        });
    };
    this.getUserAPIbyId=function(id){
        return axios({
            url: `https://638715e7e399d2e473f4089c.mockapi.io/api/products/${id}`,
            method:"GET",
        });
    };
    this.updateUserAPI=function(user){
        return axios({
            url: `https://638715e7e399d2e473f4089c.mockapi.io/api/products/${user.id}`,
            method:"PUT",
            data: user,
        });
    };
}