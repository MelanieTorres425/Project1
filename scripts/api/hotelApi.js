function getHotelInfo(city) {
  // Hotel api info
  let settings = {
    async: true,
    crossDomain: true,
    url:
      "https://hotels4.p.rapidapi.com/locations/search?locale=en_US&query=" +
      city,
    method: "GET",
    headers: {
      "x-rapidapi-host": "hotels4.p.rapidapi.com",
      "x-rapidapi-key": "5b3926684fmshb888e3231348c52p1496d1jsn3859b4010f0d",
    },
  };

  $.ajax(settings).done(function (response) {
    $(".hotel-card").removeClass("hide");
    hotelName = [];
    for (let i = 0; i < 3; i++) {
      hotelName.push(response.suggestions[3].entities[i].name); // name of the **suggested** hotels
    }

    $("#hotel-name").text(hotelName[0]); // Apply the first name of the hotel on the card

    // whenever the user click a hotel name then the text will change to the corresponding hotel
    $(document).on("click", ".hotel", (event) => {
      event.preventDefault();
      let hotelOption = event.target.textContent;

      if (hotelOption === "Hotel 1") {
        $("#hotel-name").text(hotelName[0]);
      } else if (hotelOption === "Hotel 2") {
        $("#hotel-name").text(hotelName[1]);
      } else {
        $("#hotel-name").text(hotelName[2]);
      }
    });
  });
}
