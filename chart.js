getCharacters();

function buildGraph( characterSTRING ) {
	const characters = JSON.parse( characterSTRING );
	var series     = [];

	if( characters != null && characters.length > 0 ){
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

	for( var character of characters ) {
		if( character.hogwartsStudent != null ) {
			character.hogwartsStudent 
				? students.push(character)
				: notStudents.push(character);
		}
	}

	return [ { name: 'students', data: [students.length] }, { name: 'non-students', data: [notStudents.length] } ];
}

function getCharacters() {
        const url          = "http://hp-api.herokuapp.com/api/characters";
	var characterJSON  = [];

	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.onreadystatechange = function(){
	    if ( xhttp.status == 200 ) {
		document.addEventListener( 'DOMContentLoaded', buildGraph( xhttp.responseText ) ); 
    	    }
	}
	xhttp.send();
}
