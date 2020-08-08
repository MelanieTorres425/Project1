# HTML

(Mel & Joe)
When i open the page, then i see a search box and nav at the top

- nav at the top
- Search Box is in the center of the page
- about us / contact us (possible html file and/or add tab)
- footer

## <body>

In the Nav, i can see the Logo

- tabs for hotels, rests, attractions, weather, about us/contact . more - (optional)

- in <main>,
- search box with a drop down for tabs , and search button

### after search

- nav bar
- search bar top
- "jumbotron" & cards for displaying results
  - container with .restaurant information
  - main content container with city name and local weather
    - 5 day forecast , icons , temp, humidity, wind speed
  - container for attractions
  - container for local hotels

# CSS

## Using the materialize css framework

(Mel & Joe)

##<body>

- <nav> style, color, font, drop downs
- <main>: background photo, fonts
  -search bar:

# Javascript / API Integration

(Cristian)

## Regular Javascript

### What we will be using

- Will need jQuery, moment.js, materialize for javascripting, and APIs

### Variables we will need

- hold user search of city
- hold the lat and lon
- hold the date
- hold the API info but will most likely be held and displayed in there corresponding files
- hold the info needed to access the APIs

### Functions

- Weather API functions

  1. Get the current day forecast
  2. Display current forecast
  3. Get 5-Day forecast
  4. Display 5-Day forecast

- Hotel API functions

  1. Get hotels nearby
  2. Display the hotel names, possibly rating and other info wanted

- Zomato API functions
  1. Get info for nearby restaurants as well as rating and other info
  2. Display the info

### What event listeners do we need?

- Event listener for preventing the default of any buttons and submiting going to another unwanted page
- A event listener for the search bar (for whenever the user presses the enter key and possibly the search icon)
  - Get the city name from here and calls the weather function with the given bits of info
- ????? A event listener possibly for the checkboxes for the other selections if they want all of the info or not ????

## API Added

1. Weather API info

   - Grab current weather data
     - Temperature
     - icon & description of the weather
     - humidity
     - wind speed
     - lon
     - lat
   - Grab 5 day weather data
   - Date
   - temp
   - icon (With description)
   - humidity

2. Zomato API info

   - get lon and lat (either in weather api or other)
     - with **lon** and **lat** we can get the _geocode_
       - in geocode we will grab the entity_type and entity_id
     - With the type and id we will put it in the **location_details**
       - in here we will grab _best_rated_details_ , _reviews_, _ratings_, etc...

3. Hotel RapidApi

   - get location search just based on the city name given and then look for the _suggestions_ -> Which ever one that will give us the _hotel group_ -> **Names of hotels** and _other info_ that we can be given.
