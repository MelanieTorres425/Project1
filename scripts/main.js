$(document).ready(function () {
  // This is the main logic (event listeners and storing data and calling the functions for the APIs)

  // Grabbing the values of the selected
  $("select").formSelect();

  // Get the current date for user
  let now = moment().format("LL");
  console.log("now", now);

  // hold the bool value of the check boxes (set to true in the beginning but can be switched to false if user unchecks the box)

  // Prevent the enter button from leading to a page not wanted
  $(document).on("submit", (event) => {
    event.preventDefault();
  });

  // When user presses enter they will start the chain of events
  $(document).on("submit", ".search-bar", () => {
    let cityName = $("#search").val();
    let choices = $("select").formSelect("getSelectedValues");
    let isHotelOn = false;
    let isRestaurantOn = false;
    choices.forEach((element) => {
      if (element === "hotelF") {
        isHotelOn = true;
      } else if (element === "restaurantF") {
        isRestaurantOn = true;
      } else {
        isHotelOn = false;
        isRestaurantOn = false;
      }
    });

    $(".hotel-card").addClass("hide");
    $(".restaurant-card").addClass("hide");
    console.log(isHotelOn);
    console.log(isRestaurantOn);
    console.log(cityName);
    getMainForecast(cityName, isHotelOn, isRestaurantOn);
  });
});
