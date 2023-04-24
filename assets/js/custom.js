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
        }).done(function (data) {
            if(data.status==true){
                showMessage(data.message, 'success');
                $("#registration_form")[0].reset();
            }else{
                showMessage(data.message, 'danger');
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
        }).done(function (data) {
            if(data.status==true){
                showMessage(data.message, 'success');
                localStorage.setItem("token",data.token);
                redirectDashboard(data.token)
            }else{
                showMessage(data.message, 'danger');
            }
        });
        event.preventDefault();
    });

 


});

function showMessage(message, type){
    const alertPlaceholder = document.getElementById('SuccessFailureAlertWrapper')
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '</div>'
        ].join('')
      
    alertPlaceholder.append(wrapper)
}

function redirectDashboard(token){
    $.ajax({
        url: "/user/dashboard",
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-token', token);},
        success: function() { alert('Success!' + authHeader); }
     });
}