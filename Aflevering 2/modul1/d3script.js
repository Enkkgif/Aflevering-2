/*
let dataset = ["Enni","Sarah"]

d3.select("#d3test")
    .selectAll("p")
    .data(dataset)
    .enter()
    .append("p")
    .text(function (d) {
        return d;
    });
*/

 /*    d3.json("albums.json").then(function (data) {
        console.log(data);
      
  
       
     // Select the div with ID #d3test and append an h2 element with text "JSON Data:"
    d3.select("#d3test").append("h2").text("JSON Data:");
        
            // Create a table inside the #d3test div
            const table = d3.select("#d3test").append("table");
        
            // Append a row for each album in the data
            const tbody = table.append("tbody");
        
            // Loop through each album in the data and append a row with three cells
            tbody.selectAll("tr")
                .data(data)
                .enter()
                .append("tr")
                .selectAll("td")
                .data(function(album) {
                    return [album.artistName, album.albumName, album.trackList.length];
                })
                .enter()
                .append("td")
                .text(function(d) { return d; });
        });
*/
/*
const dataset = [5, 10, 15, 20];

const w = 500;
const h = 100;
const padding = 2;

const svg = d3.select("body")
.append("svg")
.attr("width", w)
.attr("height", h);

svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
//Bruges til at indsætte d ind på dens plads (i). Returnerer plads * (bredde/datasætlængde) --> fordeler søjlerne, så alle er lige brede
.attr("x", function(d,i) {
    return i * (w/dataset.length); })
//*4 kan laves om, dette er bare tilfældet i dette array
.attr("y", function (d){
    return h - d*5})
.attr("width", w/dataset.length - padding)
.attr("height", function (d) {
    return d*5;})
.attr("fill", "black")

*/

d3.json("albums.json").then(function (data) {

    let dataset = [];
      for (let i in data) {
        let cd = new CD(
          data[i].trackList.length,
          data[i].albumName
        );
        dataset.push(cd);
      }
    
    function CD(numberOfTracks, albumName) {
        this.numberOfTracks = numberOfTracks,
        this.albumName = albumName;
      }
    
      console.log(dataset);
    
      const w = 500;
      const h = 100;
      const padding = 2;
      
      const colorScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, d => d.numberOfTracks)]) // Map from 0 to the maximum number of tracks
      .range(["lightpink", "darkred"]); // Light color for low values and dark color for high values
    
    
      const svg = d3.select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
      
      svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      //Bruges til at indsætte d ind på dens plads (i). Returnerer plads * (bredde/datasætlængde) --> fordeler søjlerne, så alle er lige brede
      .attr("x", function(d,i) {
          return i * (w/dataset.length); })
      //*4 kan laves om, dette er bare tilfældet i dette array
      .attr("y", function (d){
          return h - d.numberOfTracks*5})
      .attr("width", w/dataset.length - padding)
      .attr("height", function (d) {
          return d.numberOfTracks*5;})
    .attr("fill", function(d) {
            return colorScale(d.numberOfTracks);})
    })
    