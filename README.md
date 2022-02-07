<h2>Weathern</h2>
<p>It is an weather application. User can get his current location's weather updates, also he can get any city's
    weather information from the search bar.</p>
<h2>How to run the app</h2>
<ul>
    <li>Download the file as zip & extract it</li>
    <li>Open the folder into any code editor(sublime/vs code/bracket/notepad++). I prefer using Vs Code editor
    </li>
    <li>Open the index.html file into the vs code</li>
    <li>Open the file into your live server & use the app</li>
</ul>
<h2>Live Link: <a href="https://weathernz.netlify.app/" style="font-size: 18px;">Demo</a></h2>
<h2>Technology Used</h2>
<ul>
    <li>Html</li>
    <li>Css</li>
    <li>Css Animation</li>
    <li>Sass</li>
    <li>Bootstrap</li>
    <li>Jquery</li>
    <li>Javascript</li>
    <li>Javascript Api</li>
    <li>Axios Library</li>
    <li>Scroll Up Plugin</li>
    <li>Teleport Autocomplete Widget</li>
</ul>
<h2>Features</h2>
<ul>
    <li>Animated Preloader</li>
    <li>Responsive Layout</li>
    <li>Cross browser compatible design</li>
</ul>
<h2>Future Features</h2>
<ul>
    <li>Code will be more optimized</li>
    <li>Design will be updated</li>
</ul>
<h2>Files Used</h2>
<table>
    <tr>
        <th>File Name</th>
        <th>Description</th>
        <th>Location</th>
    </tr>
    <tr>
        <td>style.scss</td>
        <td>For styling the website</td>
        <td>assets/css/style.scss</td>
    </tr>
    <tr>
        <td>app.js</td>
        <td>For rendering data through api</td>
        <td>assets/js/app.js</td>
    </tr>
</table>
<h2>Work Description</h2>
<ul>
    <li>
        <p><b>Initial Stage:</b> Initially it will ask for the user's current location by <b>geolocation</b> api.
            If user denies, then it will invoke <b>onError</b> function. This will invoke the <b>fetchDate</b>
            function with a user predefined city name. It'll then show the data according it.</p>
        <p>If user gives access to his current location, then it'll invoke <b>onSuccess</b> function & show the current city's weather information.</p>
    </li>
    <li>
        <b>Search by city:</b> It will first initialize <b>TeleportAutocomplete</b> widget that will show
        suggestion of many cities. Then the input field will take user input, split the input until first comma(,) &
        then normalize any special character like 'ā,Ł,ó,d,ź' into english alphabets. Then it will invoke <b>fetchDate</b> function with the input field url.
    </li>
    <li>
        <b>Fetch Date:</b> This function will fetch data through api by using <b>Axios</b> library.
        It will then print the city name into the DOM & invoke the <b>fetchLocation</b> function with its resulting latitude and longitude coordinates.
    </li>
    <li>
        <p><b>Render Date:</b> It will print the data of the current & upcoming 6 days. To print current day's sunrise, sunset & time, it will invoke <b>convertTime</b> function. To print current date & the upcoming 6 days it'll call <b>convertDate</b> function. </p>
        <p>The resultant data have total 8 days weather information including the current date. So the first index(0) & the last index(7) is skipped to print only 6 days data.</p>
        <p>While rendering data, the weather icons & background images are changed according to the weather description.</p>
    </li>
    <li>
        <b>Weather Icon:</b> The api provides a certain amount of icons for each weather description. It is then
        converted into custom icons through <b>iconValue</b> function. This function will take an icon code(from
        render data) as an argument. It will then check the code & generate a custom icons according to the
        conditions & return the value to the <b>renderDate</b> function.
    </li>
    <li>
        <b>Background Image:</b> At first, a set of images are stored in an array(<b>images</b>). Initially the
        background image variable(<b>bgImg</b>) will take the first image of the array & print the background
        according to it. While rendering data, it will invoke the <b>changeBg</b> function that sets the background
        image according to the weather condition.
    </li>
    <li>
        <b>Convert Time & Convert Date:</b> Both functions take two parameters- time & timezone. Time is first multiplied by 1000 to get the unit in milliseconds. Then toLocaleString() method is used to convert the data into readable string. For <b>convertDate</b> function, 'timeZone & dateStyle' properties are used to have the desirable date format. For <b>convertTime</b> function, 'timeZone & timeStyle' properties are used to have the desirable time format. TimeZone property's values are generated from the api.
    </li>
</ul>
<h2>Api Used</h2>
<p>
    Open Weather Map Api
    <ul>
        <li>Current Weather Data</li>
        <li>One Call API</li>
    </ul>
</p>
<h2>Challenges</h2>
<ul>
    <li>Calculating Date & Time from the data</li>
    <li>Customizing Icons</li>
    <li>Implementing Autocomplete Input Fields</li>
    <li>Converting Special Character to Natural Alphabets</li>
</ul>
