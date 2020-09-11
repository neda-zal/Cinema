function openPage(pageURL)
{
  window.location.href = pageURL;
}

function validate() {
  var badColor = "#ff6666";
  var message = document.getElementById('invalid-feedback2');
  message2.style.color = badColor;
  message2.innerHTML = "No such user";
}
