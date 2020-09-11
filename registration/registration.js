function validate() {

    var a = document.getElementById('username');
    var b = document.getElementById('password');
    var c = document.getElementById('first_name');
    var d = document.getElementById('last_name');
    var e = document.getElementById('date');
    var f = document.getElementById('address');
    var badColor = "#ff6666";


    if (!e.value || c.value === "" || d.value === "" || a.value.length < 6 || b.value.length < 6 ||
          f.value.length < 6) {
      if(a)
      {
        var message2 = document.getElementById('invalid-feedback2');
        if (a.value.length < 6) {
            message2.style.color = badColor;
            message2.innerHTML = "Username should contain at least 6 characters";
        }

        else {
          message2.innerHTML = "";
        }
      }

      if(b)
      {
        var message3 = document.getElementById('invalid-feedback3');
        if (b.value.length < 6) {
            message3.style.color = badColor;
            message3.innerHTML = "Password should contain at least 6 characters";
        }

        else {
          message3.innerHTML = "";
        }
      }

      if(c)
      {
        var message = document.getElementById('invalid-feedback');
        if (c.value === "") {
            message.style.color = badColor;
            message.innerHTML = "Invalid first name";
        }

        else {
          message.innerHTML = "";
        }
      }

      if(d)
      {
        var message1 = document.getElementById('invalid-feedback1');
        if (d.value === "") {
            message1.style.color = badColor;
            message1.innerHTML = "Invalid last name";
        }

        else {
          message1.innerHTML = "";
        }
      }

      if(e)
      {
        var message4 = document.getElementById('invalid-feedback4');
        if (!e.value) {
            message4.style.color = badColor;
            message4.innerHTML = "Please select valid date";
        }

        else {
          message4.innerHTML = "";
        }
      }

      if(f)
      {
        var message5 = document.getElementById('invalid-feedback5');
        if (f.value.length < 6) {
            message5.style.color = badColor;
            message5.innerHTML = "Enter valid address";
        }

        else {
          message5.innerHTML = "";
        }
      }

      var all = document.getElementsByClassName('row');
      for (var i = 0; i < all.length; i++) {
          all[i].style.paddingBottom = '5px';
       }
      return false;
    }

    else {
      return true;
    }

}

function openPage(pageURL)
{
  window.location.href = pageURL;
}
