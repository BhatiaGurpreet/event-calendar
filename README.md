# event-calendar
Add Full Calendar with event display as React Component in your project.

<img src="https://firebasestorage.googleapis.com/v0/b/storeroom-72874.appspot.com/o/images%2Freact-calendar-image.PNG?alt=media&token=07ab03f4-98ca-4d06-b15c-fc5fbd5184be" alt="alt text" width="500px" height="400px">

<a href="https://bhatiagurpreet.github.io/react-calendar/">Click to go to live Demo</a>
<h2>Features</h2>

* Calendar fills the container in which it is added. So to resize the calendar, simply resize the container(modify calendar class in style.css)
* Format Week Day Names as you like by simply passing the array of names as property to Component<br>
  <code>&lt;Calendar weekdayFormat={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}>&lt;/Calendar></code>
  <br><code> &lt;Calendar weekdayFormat={["S", "M", "T", "W", "T", "F", "S"]}>&lt;/Calendar></code>
  <br><code> &lt;Calendar weekdayFormat={["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]}>&lt;/Calendar></code>
* Set the intitial date of Calendar simply by passing a valid date in <b>highlightDate</b> property
<br><code><Calendar highlightDate={new Date().setDate(21)}></code>
 
<h2>How To Integrate in non-react projects</h2>

* Download calendar.js and style.css
* Create a div container as shown below<br>
<code>&lt;div id="Calendar">&lt;/div></code>
* Add script tags for React,ReactDOM and babel CDN

<h2>How to Integrate in react projects</h2>

* Download calendar.js and style.css
* In Calendar.js, replace <code>ReactDOM.render(<Calendar></Calendar>,document.getElementById('Calendar'));</code> with <code>export default Calendar</code>
* Import calendar.js and style.css in your script file and render <code>&lt;Calendar>&lt;/Calendar></code>

<h2>To clone the repository run the below command</h2>
<h3><code> git clone https://github.com/BhatiaGurpreet/react-calendar.git </code><h3>
