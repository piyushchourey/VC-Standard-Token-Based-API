$(document).ready(function () {
    $("#registration_form").submit(function (event) {
        var formData = $(this).serialize();
        console.log('asdsa',formData)
        $.ajax({
            type: "POST",
            url: "/user/register",
            data: formData,
            dataType: "json",
            encode: true,
            success : function (data) {
                if(data.status==true){
                    showMessage(data.message, 'success');
                    setTimeout(()=>{
                        window.location.href='/login'
                    },2000)
                }
            },
            error : (data)=>{
                showMessage(data.responseJSON.message, 'error');
            }

        });
        event.preventDefault();
    });

    //Login submittion 
    $("#login_form").submit(function (event) {
        var formData = $(this).serialize();
        console.log('asdsa',formData)
        $.ajax({
            type: "POST",
            url: "/user/login",
            data: formData,
            dataType: "json",
            encode: true,
            success : function (data) {
                if(data.status==true){
                    showMessage(data.message, 'success');
                    localStorage.setItem("token",data.token);
                    document.cookie = `token=${data.token}`;
                    setTimeout(()=>{
                        window.location.href = "/user/dashboard";
                    },2000)
                }
            },
            error : (data)=>{
                showMessage(data.responseJSON.message, 'error');
            }
        });
        event.preventDefault();
    });

 


});

function showMessage(message, type){
    new Noty({
        theme:'relax',
        text:message,
        type:type,
        layout:'topRight',
        timeout:2000
    }).show();
}

function redirectDashboard(token){
    $.ajax({
        url: "/user/dashboard",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', token);},
        success: function() { alert('Success!' + authHeader); }
     });
}