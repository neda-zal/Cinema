//jshint esversion:6

const dataPanel = document.querySelector('#data-panel');
const dataPanel1 = document.querySelector('#datapanel');
const dataPanel2 = document.querySelector('#storage');
const data = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

(function () {

  displayDataList(data);

  //remove on button click
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-remove-favorite')) {
      removeFavoriteItem(event.target.dataset.id);
    }
  });

  dataPanel2.addEventListener('click', (event) => {
    if (event.target.matches('.storage')) {
      window.localStorage.clear();
    }
  });

  function displayDataList(data) {
    let htmlContent = '';
    data.forEach(function (item, index) {

      var today = new Date();

      var rand = Math.floor(Math.random()*12)*5;
      var myNumber = ('0' + rand.toString()).slice(-2);
      var a = '0' + (Math.floor(Math.random()*4)) + ':' + myNumber; // 0-4

      rand = Math.floor(Math.random()*12)*5;
      myNumber = ('0' + rand.toString()).slice(-2);
      var b = '0' + (Math.floor(Math.random()* (8 - 5 + 1) + 5)) + ':' + myNumber; // 5-8

      rand = Math.floor(Math.random()*12)*5;
      myNumber = ('0' + rand.toString()).slice(-2);

      var rand1 = Math.floor(Math.random()* (12 - 9 + 1) + 9);
      var myNumber1 = ('0' + rand1.toString()).slice(-2);
      var c = myNumber1 + ':' + myNumber; // 9-12

      rand = Math.floor(Math.random()*12)*5;
      myNumber = ('0' + rand.toString()).slice(-2);
      var d = (Math.floor(Math.random()* (16 - 13 + 1) + 13)) + ':' + myNumber; // 13-16

      rand = Math.floor(Math.random()*12)*5;
      myNumber = ('0' + rand.toString()).slice(-2);
      var e = (Math.floor(Math.random()* (20 - 17 + 1) + 17)) + ':' + myNumber; // 17-20

      rand = Math.floor(Math.random()*12)*5;
      myNumber = ('0' + rand.toString()).slice(-2);
      var f = (Math.floor(Math.random()* (24 - 21 + 1) + 21)) + ':' + myNumber; // 21-24

      htmlContent += `
        <tr class="d-flex">
          <td class="col-1 d-flex justify-content-center">${(index + 1)}</td>
          <td class="col-3 d-flex justify-content-center" id="title" name="title">
            <textarea name="title" rows="1" style="border: none; resize: none; width: 300px;" readonly>${item.title}</textarea>
          </td>
          <td class="col-2 d-flex justify-content-center time" id="time">
            <select id="mySelect" name="time">
              <option>${a}</option>
              <option>${b}</option>
              <option>${c}</option>
              <option>${d}</option>
              <option>${e}</option>
              <option>${f}</option>
            </select>
          </td>
          <td id="date" class="col-2 d-flex justify-content-center" name="date">${(today.toDateString())}</td>
          <td class="col-2 d-flex justify-content-center">
            <select id="selected" name="tickets">
              <option value="5" selected>Single ticket, 5€</option>
              <option value="15">Family ticket, 15€</option>
              <option value="23">Group ticket, 23€</option>
              <option value="3">Discount ticket, 3€</option>
            </select>
          </td>
          <td class="col-1">
            <select id="quantity" name="quantity">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </td>
          <td class="col-1 d-flex justify-content-center"><button class="btn btn-danger btn-remove-favorite" data-id="${item.id}">X</button></td>
        </tr>
      `;
    });
    $('tbody').append(htmlContent);
  }

  function removeFavoriteItem(id) {
  const index = data.findIndex(item => item.id === Number(id));
   if (index === -1) return;
   data.splice(index, 1);
   localStorage.setItem('favoriteMovies', JSON.stringify(data));
    // refresh
    window.location.reload(true);
    displayDataList(data);
  }

})();

// get total price
dataPanel1.addEventListener('click', (event) => {
    if (event.target.matches('.price')) {
      var price = 0;
      $('#basket tbody tr').each(function() {
      var tdObject = $(this).find('td:eq(4)');
      var selectObject = tdObject.find("select");
      var selCntry = selectObject.val();

      var quantcolumn = $(this).find('td:eq(5)');
      var selected = quantcolumn.find("select");
      var value = selected.val();

      price += (parseInt(selCntry) * value);
      document.getElementById('totalprice').innerHTML = price + '€';
      //console.log(selCntry, value, price);
  });
  }
});
