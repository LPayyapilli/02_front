$(document).ready(function() {


  function hideAll() {
    $('#loginDiv').hide();
    $('#signupDiv').hide();
    $('#aboutDiv').hide();
    $('#contactDiv').hide();
    $("#page-content-wrapper").hide();


  }
  function showDiv(divName) {
      if (divName) {
        hideAll();
        $("#" + divName).show();
      }
  }

   $("#signup").click(function(){showDiv("signupDiv");});
   $("#login").click(function(){showDiv("loginDiv");});
   $("#about").click(function(){showDiv("aboutDiv");});
   $("#contact").click(function(){showDiv("contactDiv");});


   $('#landing').click(function(){
    location.reload();
   });


  $("#signupbutton").click(function(){
    var username = $("#usernameform").val();
    var password1 = $("#passwordform").val();
    var first_name = $("#firstnameform").val();
    var last_name = $("#lastnameform").val();
    var password = $("#passwordform").val();
    var info = {user: {username: username,
          email: email,
          password1: password,
          first_name: first_name,
          last_name: last_name}}

    $.ajax({url: 'http://localhost:3000/signup',
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(info)
      }).done(function(data){
        console.log(data);
      }).fail(function(error){
        console.log('error in login ' + error);
    });
  });


  $("#loginbutton").click(function(){
    var email = $("#emailform").val();
    var password = $("#passwordformer").val();

    $.ajax({ url: 'http://localhost:3000/login',
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
          credentials: {
            email: email,
            password: password
          }
          })
    }).done(function(data){
      console.log(data);

    }).fail(function(error){
      console.log('error in login ' + error);
    });
  });





});

  // $("#session-destroy").on('click',function(){

  //   $.ajax().done().fail();
  // });


  // $("#user-index").on('click',function(){
  //   $.ajax({
  //     url: 'localhost:3000/users',
  //     type: 'GET'
  //   }).done(function(data){
  //     $("#content").html();     // Empty the 'content' div
  //     data = JSON.parse(data);  // Parse the JSON we get from our API
  //     data.forEach(function(user){ // Write HTML to our 'content' div for each user
  //       $("#content").append("<p>" + data + "</p>")
  //     });
  //   }).fail(function(err){
  //     console.error(err);
  //   });
  // })



  // $("#user-show").on('click',function(){
  //   $.ajax({
  //     url: 'localhost:3000/users/1',
  //     type: 'GET'
  //   }).done(function(data){
  //     $("#content").html();     // Empty the 'content' div
  //     user = JSON.parse(data);  // Parse the JSON we get from our API
  //     $("#content").append("<p>" + user.username + "</p>");
  //   }).fail(function(err){
  //     console.error(err);
  //   });
  // })



  // $("#user-create").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })
  // $("#user-update").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })
  // $("#user-destroy").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })
  // $("#photo-create").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })
  // $("#photo-update").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })
  // $("#photo-destroy").on('click',function(){
  //   $.ajax(

  //   ).done(function(data){

  //   }).fail(function(err){

  //   })
  // })






