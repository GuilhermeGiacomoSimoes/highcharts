document.addEventListener('DOMContentLoaded',  buildGraph() );

function buildGraph() {
	const characters = getCharacters();
	const series = [];

	if(characters != null && characters.length > 0){
		series = getSeriesBy( characters );
	}
	else {
		alert ('error on get data');
		return;
	}
 
	 var myChart = Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'number of students and non-students'
            },
            xAxis: {
                categories: ['students', 'non-students']
            },

            series: series 
        });

}

function getSeriesBy( characters ) {
	var students    = [];
	var notStudents = [];

	for( const character of characters ) {
		character.hogwartsStudent 
			? students.append(character)
			: notStudents.append(character);
	}

	return [ students, notStudents ];
}

function getCharacters() {
        const url = "http://hp-api.herokuapp.com/api/characters";
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, true);
	xhttp.send();
	
	xhttp.onreadystatechange = () => {
	 	 return ( xhttp.status == 200 )
			? xhttp.responseText
			: null;
	}
}
