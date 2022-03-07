const preloader = document.querySelector(".loading").style.display = "none";
// add event listener on enter button
document
  .getElementById("phoneInput")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      document.getElementById("submit").click();
    }
  });

const searchBox = document.querySelector("#phoneInput");
const btnSubmit = document.querySelector("#submit");
const allPhone = document.querySelector(".all-phone");
const phoneDetails = document.getElementById("details");
//Search Button Click Action
btnSubmit.addEventListener("click", (e) => {
  loading();
  const searchText = searchBox.value.toLowerCase();
  if (searchText !== "") {
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    )
      .then((res) => res.json())
      .then((data) => showPhones(data.data));
    showError();
  } else {
    showError("Please type a phone name first....!");
    // console.log('empty');
  }
  searchBox.value = "";
});
//Loding
const loading = () => {
  // showError();
  // document.querySelector(".loading").style.display = "block";
  // setTimeout(function () {
  //   document.querySelector(".loading").style.display = "none";
  // }, 100);
};
//Display Error
const showError = (errorText = "") => {
  const h3 = document.createElement("h3");
  h3.style.textAlign = "center";
  h3.style.color = "#ff014f";
  h3.innerText = errorText;
  phoneDetails.innerHTML = "";
  phoneDetails.appendChild(h3);
};
//Display Phone
const showPhones = (phonesInfo) => {
  allPhone.innerHTML = "";

  if (!(phonesInfo)) {
    //when array is empty
    showError("No Result Found!");
  }
  else if (phonesInfo.length === 0) {
    showError("No Result Found!");
  }
  //show only 20 items
  show20orMore(phonesInfo.slice(0, 20));
  //show more then 20 items
  if (phonesInfo.length > 20) {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "col-sm-4", "col-12", "my-2");
    div.setAttribute("id", "test");
    div.innerHTML = `
    <div class="d-flex align-items-center justify-content-center card-container show-more">
    <h3 class="dyanamic-text-color me-3">Show More</h3> 
        <div class="">  
            <i class="bi bi-arrow-right-square"></i>
        </div>
    </div>
  `;
    allPhone.appendChild(div);
    document.getElementById("test").addEventListener("click", (e) => {
      show20orMore(phonesInfo);
    });
  }
};
//showing phone info into ui
const show20orMore = (arr) => {
  // console.log(arr);
  allPhone.innerHTML = "";
  for (singlePhoneInfo of arr) {
    // console.log(singlePhoneInfo);
    const div = document.createElement("div");
    div.innerHTML = `
            <div class="card-container">
              <div class="card front">
                <div class="row">
                <div class="col-md-5">
                  <img class="img-fluid card-images" src="${singlePhoneInfo.image}" alt="">
                </div>
                <div class="col-md-7">
                  <h4><span class="dyanamic-text-color">${singlePhoneInfo.phone_name}</span></h4>
                  <h5><b>Brand:</b> <span class="dyanamic-text-color">${singlePhoneInfo.brand}</span></h5>
                  <p class="see-more"><i>See More <i class="bi bi-arrow-left-right"></i></i></p>
                </div>
                </div>
              </div>


              <div class="card back">
                <div class="row">
                    <div class="col-md-5">
                        <img class="img-fluid show-details-images" src="${singlePhoneInfo.image}" alt="">
                    </div>
                    <div class="col-md-7">
                        <button id="btn-details" onClick="showDetails('${singlePhoneInfo.slug}');">Show Details</button>
                    </div>
                </div>
              </div>
            </div>
            `;
    div.classList.add("col-sm-6", "col-md-4", "col-12", "my-2");
    allPhone.appendChild(div);
  }
  document.querySelector(".loading").style.display = "none";
};
const showDetails = (phoneID) => {
  loading();
  fetch(`https://openapi.programming-hero.com/api/phone/${phoneID}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.data);
      //scrole to top
      document.getElementById("details").scrollIntoView();
      //create element
      const div = document.createElement("div");
      div.classList.add(
        "row",
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "main-info"
      );
      div.innerHTML = `
      <div class="col-md-3">
        <h2>${data.data.name}</h2>
        <hr />
        <h4>${data.data.brand}</h4>
        <hr />
        <ul>
          <li>
            <i class="bi bi-calendar3"></i>
            <span>Released</span>
            <strong>${data.data.releaseDate != ""
          ? data.data.releaseDate
          : "Not Found!"
        }</strong>
          </li>
          <li>
            <i class="bi bi-phone"></i>
            <span>Display Size</span>
            <strong>${data.data.mainFeatures?.displaySize
          ? data.data.mainFeatures.displaySize
          : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-cpu"></i>
            <span>Chip Set</span>
            <strong>${data.data.mainFeatures?.chipSet
          ? data.data.mainFeatures.chipSet
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-sd-card"></i>
            <span>Memory</span>
            <strong>${data.data.mainFeatures?.memory
          ? data.data.mainFeatures.memory
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-eye"></i>
            <span>Sensors</span>
            <strong>${data.data.mainFeatures?.sensors.join(", ")}</strong>
          </li>
          <li>
            <i class="bi bi-wifi"></i>
            <span>WiFi</span>
            <strong>${data.data.others?.WLAN ? data.data.others.WLAN : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <div class="col-md-3">
        <img
          src="${data.data.image}"
          alt="" class="details-img"
        />
      </div>
      <div class="col-md-3">
        <ul>
          <li>
            <i class="bi bi-bluetooth"></i>
            <span>Bluetooth</span>
            <strong>${data.data.others?.Bluetooth
          ? data.data.others.Bluetooth
          : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-geo-alt"></i>
            <span>GPS</span>
            <strong>${data.data.others?.GPS ? data.data.others.GPS : "Not Available"
        }</strong>
          </li>
          <li>
            <i>N</i>
            <span>NFC</span>
            <strong>${data.data.others?.NFC ? data.data.others.NFC : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-broadcast"></i>
            <span>Radio</span>
            <strong>${data.data.others?.Radio ? data.data.others.Radio : "Not Available"
        }</strong>
          </li>
          <li>
            <i class="bi bi-usb-symbol"></i>
            <span>USB</span>
            <strong>${data.data.others?.USB ? data.data.others.USB : "Not Available"
        }</strong>
          </li>
        </ul>
      </div>
      <i class="bi bi-x-square" id="close-btn" onClick="closeBtn()"></i>
            `;
      phoneDetails.innerHTML = "";
      document.getElementById("details").style.display = "block";
      phoneDetails.appendChild(div);
      btnClose = document.querySelector("#close-btn");
    });
  // showError();
};
//Close Button
const closeBtn = (e) => {
  //   console.log(1);
  document.getElementById("details").style.display = "none";
};

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
  themeToggler.classList.toggle('fa-sun');
  if (themeToggler.classList.contains('fa-sun')) {
    document.body.classList.add('active');
  } else {
    document.body.classList.remove('active');
  }
}