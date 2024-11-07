
// method to load json file, which contains data in JSON format. Then method waits for the
//data to load and then runs the function, passing the data from JSON file into it.
d3.json("albums.json").then(function (data) {
    console.log(data); //allows to see raw data format

let musikObject = []; //empty array is created. 
for (let i in data) { // loop iterates over each album in the data object
    let trackTitles = []; //
for (let j in data [i].trackList){
    trackTitles.push(data [i].trackList[j].trackTitle);
}
  let musik = new MUSIK( //MUSIk object is created for each album. Listed are what is needed for each album
    data[i].albumName,
    data[i].artistName,
    data[i].productionYear,
    data[i].trackList.length,
    trackTitles
  );
  musikObject.push(musik); // the obeject will be created to the array.
}

console.log(musikObject) //logs the array by having the albums in structured objects.

const table = d3.select("#albumTabel").append("table"); //this command will create the table with the set ID

    // Append a header row to the table. Funktionen søger for at overskrifterne følger vores data array.
    table.append("thead").append("tr") //table row
        .selectAll("th") //th betyder table header and the names from below will appear in the table
        .data(["Titel", "Kunstner", "Udgivelsesår", "Antal tracks", "Sangeliste"])
        .enter()
        .append("th")
        .text(function(column) { return column; });

    // Append a row for each album in the data, laver en række til hvert album
    const tbody = table.append("tbody");

    // Loop through each album in the data and append a row, udfydler hver album række, med oplysninger fra vores JSON dokument. Først laves rækkerne og efter udfyldes kolorner.
    tbody.selectAll("tr")
        .data(musikObject)
        .enter()
        .append("tr")
        .selectAll("td") //table cell
        .data(function(album) {
            return [album.title, album.artist, album.year, album.numberOfTracks, album.trackList];
        })
        .enter()
        .append("td")
        .text(function(d, i) { return (i< 4) ? d : " " ; })
        .filter (function(d,i) {
            return i === 4;}) // creates the button only in the last cell
        .append("button")
        .text("TRYK")
        .on("click", function (event, d){
            displayTrackTitles(d); // it is a function that will allow the track list to be visible when knappen er trykket.
        });
    


});
 //defineres MUSIK objekt, hvet album viser kun disse nedunder
function MUSIK(title, artist, year, numberOfTracks, trackList) {
    this.artist = artist;
    this.title = title;
    this.year = year;
    this.numberOfTracks = numberOfTracks;
    this.trackList = trackList;
}


// Show the popup - viser popup vindue
document.getElementById("trackPopup").style.display = "block";

function displayTrackTitles(trackList) {
    // Join track titles into a string denne tilføj track titles ind i string
    var trackTitles = trackList.join("\n");
    alert("Sangliste:\n" + trackTitles); // viser alert med sangliste
}
