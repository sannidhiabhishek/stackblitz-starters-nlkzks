function setForce(){
    //var forcecheck = localStorage.getItem('CalBaseForceCheck');
    //console.log(forcecheck == true);
    var setforcenumberdata = document.getElementById('forcenumberfield').value;
    localStorage.setItem('CalBaseForceNumber', setforcenumberdata);
    var settapholdtimedata = document.getElementById('tapholdtimefield').value;
    localStorage.setItem('CalBaseTapholdTime', settapholdtimedata);
    window.location.reload();
    /*if(forcecheck){
        var setforcenumberdata = document.getElementById('forcenumberfield').value;
        localStorage.setItem('CalBaseForceNumber', setforcenumberdata);
    }
    else{
        showSnackbar("Please select Force the number checkbox")
    }*/
}
$('#saveButton').click(function (){
    document.getElementById('HiddenScreen').style.zIndex = '-1';
});
function getForce(){
    var getforcenumberdata = localStorage.getItem('CalBaseForceNumber');
    document.getElementById('forcenumberfield').value = getforcenumberdata;
    var gettapholtimedata = localStorage.getItem('CalBaseTapholdTime');
    document.getElementById('tapholdtimefield').value = gettapholtimedata;
    //var getforcenumbercheck = localStorage.getItem('CalBaseForceCheck');
    /*console.log(getforcenumbercheck)
    var forcecheck = document.getElementById("forcecheckfield");
    if(getforcenumbercheck == true){
        forcecheck.setAttribute("checked", "");
    } else{
        forcecheck.removeAttribute("checked");
    }*/
    //document.getElementById("forcecheckfield").checked = getforcenumbercheck;
}

/*function showSnackbar(message) {
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function EnableDisableForceNumberField(){
    var forcecheck = document.forms["forceform"]["forcecheck"].checked;
    var forcenumberfield = document.forms["forceform"]["forcenumberfield"];
    if(forcecheck == true){
        forcenumberfield.removeAttribute("disabled");
        localStorage.setItem('CalBaseForceCheck', true);
    } else{
        forcenumberfield.setAttribute("disabled", "");
        localStorage.setItem('CalBaseForceCheck', false);
    }
    
}*/