var Middle = Middle || {};

Middle.new = (function(){

// hide all divs
function hideAll() {
  $('#loginDiv').hide();
  $('#signupDiv').hide();
  $('#aboutDiv').hide();
  $('#contactDiv').hide();
  $("#page-content-wrapper").hide();
}
// show function
  function showDiv(divName) {
  if (divName) {
    hideAll();
    $("#" + divName).show();
  }
}
// render user data and append to the div
var renderUserData = function(data) {
  $('#welcomename').html("Hello, " + data.name);
  $('#userDiv').html();
}
// render user pics and append to the div
var renderUserPics = function(data) {
  data.pictures.forEach(function(picture){
    $('#userDiv').add(picture.url).prependTo($('#userDiv'));
  });
}
// delete image data with image id
var deleteUserPic = function(id) {
  $("img[data-id='" + id + "']").remove();
};

return {
  hideAll: hideAll,
  showDiv: showDiv,
  renderUserData: renderUserData,
  renderUserPics: renderUserPics,
  deleteUserPic: deleteUserPic
}
})();
