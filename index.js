//sidebar


const contactbtn=document.querySelector("#contactbtn");
const contactopt= document.querySelector("#scontactopt");
const servicebtn=document.querySelector("#servicebtn");
const serviceopt= document.querySelector("#sserviceopt");
const packagebtn=document.querySelector("#packagebtn");
const packageopt= document.querySelector(".packageopt");
const reviewbtn= document.querySelector("#reviewbtn");
const reviewcontainer= document.querySelector(".reviewcontainer");

reviewbtn.onclick=function(act){
    act.preventDefault();
    reviewcontainer.scrollIntoView({ behavior: "smooth", block: "start" });
    
    packageopt.style.display="none";
    serviceopt.style.display="none";
    contactopt.style.display="none";

}


packagebtn.onclick= function(act){
    
    act.preventDefault();
    serviceopt.style.display="none";
    contactopt.style.display="none";
    packageopt.style.display= packageopt.style.display==="flex"? "none":"flex";

}
servicebtn.onclick= function(act){
    act.preventDefault();
    contactopt.style.display="none";
    packageopt.style.display="none";
    serviceopt.style.display= serviceopt.style.display==="flex"? "none":"flex";
}
contactbtn.onclick= function(act){
    act.preventDefault();
    serviceopt.style.display="none";
    packageopt.style.display="none";
    contactopt.style.display= contactopt.style.display==="flex"? "none":"flex";
}

const offerbtn= document.querySelector("#offerbtn");
const offerconatainer= document.querySelector(".offercontainer");
offerbtn.onclick= function(act){
    act.preventDefault();
    offerconatainer.scrollIntoView({ behavior: "smooth", block: "start" });    

}
//sidebar finish

//navbar start
const navservicebtn=document.querySelectorAll("#navservicebtn");
const webdesignbtn= document.querySelectorAll("#webdesignbtn");
const webdevbtn= document.querySelectorAll("#webdevbtn");
const ecombtn= document.querySelectorAll("#ecombtn");
const webappbtn= document.querySelectorAll("#webappbtn");
const staticbtn= document.querySelectorAll("#staticbtn");
const brandidbtn= document.querySelectorAll("#brandidbtn");



const servicebox=document.querySelector(".servicecontainer");
const webdesignbox= document.querySelector(".webdesigncontainer")
const webdevbox= document.querySelector(".webdevcontainer")
const ecombox= document.querySelector(".eCommercecontainer")
const webappbox= document.querySelector(".appdevcontainer")
const staticbox= document.querySelector(".staticwebcontainer")
const brandidbox= document.querySelector(".identitycontainer")



navservicebtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        servicebox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
webdesignbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        webdesignbox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
webdevbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        webdevbox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
ecombtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        ecombox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
webappbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        webappbox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
staticbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        staticbox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})
brandidbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        brandidbox.scrollIntoView({ behavior: "smooth", block: "start" });
    }
})


const sidebar= document.querySelector(".sidebarbox");
const menubtn= document.querySelector("#menubtn");
menubtn.onclick= function(){
    sidebar.style.display= sidebar.style.display=== "flex"? "none": "flex"; 
}

document.querySelector("#navcontactbtn").onclick=function(act){
    act.preventDefault();
}

//navbar finish


//userbox show hide

const loginicon= document.querySelectorAll(".loginicon");
const usercontainer=document.querySelector(".usercontainer");
const userbox=document.querySelector(".userbox");
const signinbox=document.querySelector(".signinbox");
const gotosignup=document.querySelector("#gotosignup");
const gotosignin=document.querySelector("#gotosignin");
const signupbox=document.querySelector(".signupbox");
const xsigninup=document.querySelectorAll("#xsigninup");
xsigninup.forEach((button)=>{
    button.onclick=function(){
        usercontainer.style.display= "none";
        userbox.style.display= "none";
        signinbox.style.display= "none";
        signupbox.style.display="none";
        main.style.display= "flex";
    }
})
gotosignup.onclick= function(act){
    act.preventDefault();
    signupbox.style.display="flex";
    signinbox.style.display= "none";
}
gotosignin.onclick=function(){
    
    signupbox.style.display="none";
    signinbox.style.display= "flex";
}
loginicon.forEach((buttun)=>{
    buttun.onclick= function(act){
        act.preventDefault();
        usercontainer.style.display= "flex";
        userbox.style.display= "flex";
        signinbox.style.display= "flex";
        main.style.display= "none";

        
    }
})

//userbox  finish



const main= document.querySelector(".main")


// packages access

const webdesignpackbtn= document.querySelectorAll("#webdesignpackbtn");
const webdevpackbtn= document.querySelectorAll("#webdevpackbtn")
const ecompackbtn= document.querySelectorAll("#ecompackbtn")
const webapppackbtn= document.querySelectorAll("#webapppackbtn")
const staticpackbtn= document.querySelectorAll("#staticpackbtn")
const brandidpackbtn= document.querySelectorAll("#brandidpackbtn")


const webdesignpack=document.querySelector("#webdesignpack");
const webdevpack= document.querySelector("#webdevpack")
const ecompack= document.querySelector("#ecompack")
const appdevpack= document.querySelector("#appdevpack")
const staticwebpack= document.querySelector("#staticwebpack")
const identitypack= document.querySelector("#identitypack")




brandidpackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        identitypack.style.display= identitypack.style.display== "flex"? "none": "flex";
        identitypack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})
staticpackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        staticwebpack.style.display= staticwebpack.style.display== "flex"? "none": "flex";
        staticwebpack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})
webapppackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        appdevpack.style.display= appdevpack.style.display== "flex"? "none": "flex";
        appdevpack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})
ecompackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        ecompack.style.display= ecompack.style.display== "flex"? "none": "flex";
        ecompack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})
webdevpackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        webdevpack.style.display= webdevpack.style.display== "flex"? "none": "flex";
        webdevpack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})
webdesignpackbtn.forEach((button)=>{
    button.onclick= function(act){
        act.preventDefault();
        webdesignpack.style.display= webdesignpack.style.display== "flex"? "none": "flex";
        webdesignpack.scrollIntoView({ behavior: "smooth", block: "start" });

    }
})



// webdesign pack access

const webdesbabtn=document.querySelector("#webdesbabtn");
const webdesstbtn=document.querySelector("#webdesstbtn");
const webdesprbtn= document.querySelector("#webdesprbtn");

const webdesbapack=document.querySelector("#webdesbapack")
const webdesstpack=document.querySelector("#webdesstpack")
const webdesprpack=document.querySelector("#webdesprpack")

webdesbabtn.onclick= function(){
    webdesbapack.style.display="flex";
    webdesstpack.style.display="none";
    webdesprpack.style.display="none";
    webdesbabtn.style.borderBottom= "2px solid black";
    webdesstbtn.style.borderBottom= "none";
    webdesprbtn.style.borderBottom= "none";

}
webdesstbtn.onclick= function(){
    webdesbapack.style.display="none";
    webdesstpack.style.display="flex";
    webdesprpack.style.display="none";
    webdesbabtn.style.borderBottom= "none";
    webdesstbtn.style.borderBottom= "2px solid black";
    webdesprbtn.style.borderBottom= "none";

}
webdesprbtn.onclick= function(){
    webdesbapack.style.display="none";
    webdesstpack.style.display="none";
    webdesprpack.style.display="flex";
    webdesbabtn.style.borderBottom= "none";
    webdesstbtn.style.borderBottom= "none";
    webdesprbtn.style.borderBottom= "2px solid black";

}


// web dev pack access
const webdevbabtn=document.querySelector("#webdevbabtn");
const webdevstbtn=document.querySelector("#wevdevstbtn");
const webdevprbtn= document.querySelector("#webdevprbtn");

const webdevbapack=document.querySelector("#webdevbapack")
const webdevstpack=document.querySelector("#webdevstpack")
const webdevprpack=document.querySelector("#webdevprpack")

webdevbabtn.onclick= function(){
    webdevbapack.style.display="flex";
    webdevstpack.style.display="none";
    webdevprpack.style.display="none";
    webdevbabtn.style.borderBottom= "2px solid black";
    webdevstbtn.style.borderBottom= "none";
    webdevprbtn.style.borderBottom= "none";

}
wevdevstbtn.onclick= function(){
    webdevbapack.style.display="none";
    webdevstpack.style.display="flex";
    webdevprpack.style.display="none";
    webdevbabtn.style.borderBottom= "none";
    webdevstbtn.style.borderBottom= "2px solid black";
    webdevprbtn.style.borderBottom= "none";

}
webdevprbtn.onclick= function(){
    webdevbapack.style.display="none";
    webdevstpack.style.display="none";
    webdevprpack.style.display="flex";
    webdevbabtn.style.borderBottom= "none";
    webdevstbtn.style.borderBottom= "none";
    webdevprbtn.style.borderBottom= "2px solid black";

}

// ecom packages access
const ecombabtn=document.querySelector("#ecombabtn");
const ecomstbtn=document.querySelector("#ecomstbtn");
const ecomprbtn= document.querySelector("#ecomprbtn");

const ecombapack=document.querySelector("#ecombapack")
const ecomstpack=document.querySelector("#ecomstpack")
const ecomprpack=document.querySelector("#ecomprpack")

ecombabtn.onclick= function(){
    ecombapack.style.display="flex";
    ecomstpack.style.display="none";
    ecomprpack.style.display="none";
    ecombabtn.style.borderBottom= "2px solid black";
    ecomstbtn.style.borderBottom= "none";
    ecomprbtn.style.borderBottom= "none";

}
ecomstbtn.onclick= function(){
    ecombapack.style.display="none";
    ecomstpack.style.display="flex";
    ecomprpack.style.display="none";
    ecombabtn.style.borderBottom= "none";
    ecomstbtn.style.borderBottom= "2px solid black";
    ecomprbtn.style.borderBottom= "none";

}
ecomprbtn.onclick= function(){
    ecombapack.style.display="none";
    ecomstpack.style.display="none";
    ecomprpack.style.display="flex";
    ecombabtn.style.borderBottom= "none";
    ecomstbtn.style.borderBottom= "none";
    ecomprbtn.style.borderBottom= "2px solid black";

}


// appdev pack access

const appdevbabtn=document.querySelector("#appdevbabtn");
const appdevstbtn=document.querySelector("#appdevstbtn");
const appdevprbtn= document.querySelector("#appdevprbtn");
const appdevbapack=document.querySelector("#appdevbapack");
const appdevstpack=document.querySelector("#appdevstpack");
const appdevprpack=document.querySelector("#appdevprpack");

appdevbabtn.onclick= function(){
    appdevbapack.style.display="flex";
    appdevstpack.style.display="none";
    appdevprpack.style.display="none";
    appdevbabtn.style.borderBottom= "2px solid black";
    appdevstbtn.style.borderBottom= "none";
    appdevprbtn.style.borderBottom= "none";

}
appdevstbtn.onclick= function(){
    appdevbapack.style.display="none";
    appdevstpack.style.display="flex";
    appdevprpack.style.display="none";
    appdevbabtn.style.borderBottom= "none";
    appdevstbtn.style.borderBottom= "2px solid black";
    appdevprbtn.style.borderBottom= "none";

}
appdevprbtn.onclick= function(){
    appdevbapack.style.display="none";
    appdevstpack.style.display="none";
    appdevprpack.style.display="flex";
    appdevprbtn.style.borderBottom= "2px solid black";
    appdevbabtn.style.borderBottom= "none";
    appdevstbtn.style.borderBottom= "none";

}


// static web btn
const staticbabtn=document.querySelector("#staticbabtn");
const staticstbtn=document.querySelector("#staticstbtn");
const staticprbtn= document.querySelector("#staticprbtn");
const staticbapack=document.querySelector("#staticbapack");
const staticstpack=document.querySelector("#staticstpack");
const staticprpack=document.querySelector("#staticprpack");

staticbabtn.onclick= function(){
    staticbapack.style.display="flex";
    staticstpack.style.display="none";
    staticprpack.style.display="none";
    staticbabtn.style.borderBottom= "2px solid black";
    staticstbtn.style.borderBottom= "none";
    staticprbtn.style.borderBottom= "none";

}
staticstbtn.onclick= function(){
    staticbapack.style.display="none";
    staticstpack.style.display="flex";
    staticprpack.style.display="none";
    staticbabtn.style.borderBottom= "none";
    staticstbtn.style.borderBottom= "2px solid black";
    staticprbtn.style.borderBottom= "none";

}
staticprbtn.onclick= function(){
    staticbapack.style.display="none";
    staticstpack.style.display="none";
    staticprpack.style.display="flex";
    staticprbtn.style.borderBottom= "2px solid black";
    staticbabtn.style.borderBottom= "none";
    staticstbtn.style.borderBottom= "none";

}



//brand identity pack 
const idbabtn=document.querySelector("#idbabtn");
const idstbtn=document.querySelector("#idstbtn");
const idprbtn= document.querySelector("#idprbtn");
const idbapack=document.querySelector("#idbapack");
const idstpack=document.querySelector("#idstpack");
const idprpack=document.querySelector("#idprpack");

idbabtn.onclick= function(){
    idbapack.style.display="flex";
    idstpack.style.display="none";
    idprpack.style.display="none";
    idbabtn.style.borderBottom= "2px solid black";
    idstbtn.style.borderBottom= "none";
    idprbtn.style.borderBottom= "none";

}
idstbtn.onclick= function(){
    idbapack.style.display="none";
    idstpack.style.display="flex";
    idprpack.style.display="none";
    idbabtn.style.borderBottom= "none";
    idstbtn.style.borderBottom= "2px solid black";
    idprbtn.style.borderBottom= "none";

}
idprbtn.onclick= function(){
    idbapack.style.display="none";
    idstpack.style.display="none";
    idprpack.style.display="flex";
    idprbtn.style.borderBottom= "2px solid black";
    idbabtn.style.borderBottom= "none";
    idstbtn.style.borderBottom= "none";

}


