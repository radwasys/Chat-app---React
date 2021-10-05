let div;
document.addEventListener("DOMContentLoaded", function (e) {
  var alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  div = alertPlaceholder;
});

function alert(message, type) {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  div.append(wrapper);
}

export { alert };
