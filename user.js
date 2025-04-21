function signin(siginin) {
    let signinusername= document.querySelector("#signinusername").value;
    let signinpassword= document.querySelector("#signinpassword").value;
    let status =document.querySelector("#signinstatus");


    if(signinpassword==""|| signinusername==""){
        status.innerText="fill all the inputs";
    }
    else{
        status.innerText="checking info........"
    }
    console.log("sign in button clicked");
    
}


function signup(signup){
    let newname=document.querySelector("#newname").value;
    let newusername= document.querySelector("#newusername").value.toLowerCase();
    let newemail=document.querySelector("#newemail").value;
    let newdob= document.querySelector("#newdob").value;
    let newpassword= document.querySelector("#newpassword").value;
    let status =document.querySelector("#signupstatus");


    if(newname==""|| newdob==""|| newusername==""||newemail==""|| newpassword==""){
        status.innerText="fill all the inputs";
    }
    else if(newpassword.length<8){
        status.innerText="password must contain 8 digit";
    }
    else{
        status.innerText="storing info.....";
    }
    console.log("signup button clicked");



    
}


