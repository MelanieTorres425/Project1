function getRestaurantInfo(lat, lon) {
  // Zomato api info
  let zomatoSettings = {
    async: true,
    crossDomain: true,
    url:
      "https://developers.zomato.com/api/v2.1/geocode?lat=" +
      lat +
      "&lon=" +
      lon,
    method: "GET",
    headers: {
      Accept: "application/json",
      "user-key": "bffa959245d269c69eb15660012c5300",
    },
  };

  $.ajax(zomatoSettings).done(function (response) {
    $(".restaurant-card").removeClass("hide");
    // Give the title card the name of the city
    $("#restaurant-city").text(response.location.city_name);

    let restaurantArr = [];
    for (let i = 0; i < response.nearby_restaurants.length; i++) {
      let restaurantObject = {
        name: response.nearby_restaurants[i].restaurant.name,
        cuisines: response.nearby_restaurants[i].restaurant.cuisines,
        url: response.nearby_restaurants[i].restaurant.url,
        userRating:
          response.nearby_restaurants[i].restaurant.user_rating
            .aggregate_rating,
      };

      restaurantArr.push(restaurantObject);
    }
    console.log(restaurantArr);

    for (let i = 0; i < 3; i++) {
      $("#restaurant-name-" + i).text(restaurantArr[i].name);
      $("#rating-" + i).text(restaurantArr[i].userRating);
      $("#restaurant-cuisine-" + i).text(restaurantArr[i].cuisines);
      $("#restaurant-url-" + i).attr("href", restaurantArr[i].url);
      $("#restaurant-url-" + i).text("more info");
    }

    // event listener for the  for the restaurants
    $(document).on("click", ".restaurants", (event) => {
      event.preventDefault();
      let restaurantOption = event.target.textContent;

      if (restaurantOption === "Option 1") {
        for (let i = 0; i < 3; i++) {
          $("#restaurant-name-" + i).text(restaurantArr[i].name);
          $("#rating-" + i).text(restaurantArr[i].userRating);
          $("#restaurant-cuisine-" + i).text(restaurantArr[i].cuisines);
          $("#restaurant-url-" + i).attr("href", restaurantArr[i].url);
          $("#restaurant-url-" + i).text("more info");
        }
      } else if (restaurantOption === "Option 2") {
        for (let i = 3; i < 6; i++) {
          $("#restaurant-name-" + (i - 3)).text(restaurantArr[i].name);
          $("#rating-" + (i - 3)).text(restaurantArr[i].userRating);
          $("#restaurant-cuisine-" + (i - 3)).text(restaurantArr[i].cuisines);
          $("#restaurant-url-" + (i - 3)).attr("href", restaurantArr[i].url);
          $("#restaurant-url-" + (i - 3)).text("more info");
        }
      } else {
        for (let i = 6; i < 9; i++) {
          $("#restaurant-name-" + (i - 6)).text(restaurantArr[i].name);
          $("#rating-" + (i - 6)).text(restaurantArr[i].userRating);
          $("#restaurant-cuisine-" + (i - 6)).text(restaurantArr[i].cuisines);
          $("#restaurant-url-" + (i - 6)).attr("href", restaurantArr[i].url);
          $("#restaurant-url-" + (i - 6)).text("more info");
        }
      }
    });
  });
}
