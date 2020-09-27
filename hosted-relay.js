var lastResponse = "";

function sendCmd(cmd)
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  addResponse(this.responseText+"<br/>");
		  updateStatus();
		}
  	};
	var url = "/cmd?cmd=" + cmd;
  	xhttp.open("GET", url, true);
  	xhttp.send();
}

function parseCmd(cmd)
{
	$('#console_text').val('');
	sendCmd(cmd);
}

function getTemp()
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  document.getElementById("temp").innerHTML = "Temperature: "+this.responseText+"&deg;F";
		  addResponse(this.responseText+"&deg;F<br/>");
		}
  	};
	var url = "/cmd?cmd=t";
  	xhttp.open("GET", url, true);
  	xhttp.send();
}

function getHumidity()
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  document.getElementById("humidity").innerHTML = "Humidity: "+this.responseText+"%";
		  addResponse(this.responseText+"%<br/>");
		}
  	};
	var url = "/cmd?cmd=h";
  	xhttp.open("GET", url, true);
  	xhttp.send();
}

function getStatus()
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
		  	document.getElementById("humidity").innerHTML = "Humidity: "+data.humidity+"%";
		  	addResponse(data.humidity+"%<br/>");
			document.getElementById("temp").innerHTML = "Temperature: "+data.temp+"&deg;F";
		  	addResponse(data.temp+"&deg;F<br/>");
			relayStatus = parseInt(data.status);
			addResponse("Relay Status: "+relayStatus+"<br/>");
			if(relayStatus == 0)
			{
				updateAfterStatus("c1","c0");
			}
			else
			{
				updateAfterStatus("c0","c1");
			}
		}
  	};
	var url = "/get";
  	xhttp.open("GET", url, true);
  	xhttp.send();
}

function addResponse(response)
{
	document.getElementById("response").innerHTML += response;
	var elem = document.getElementById('response');
  	elem.scrollTop = elem.scrollHeight;	
}

function updateAfterStatus(c1,c2)
{
	$("#status").removeClass(c1);
	$("#status").addClass(c2);
}

function updateStatus()
{
	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			relayStatus = parseInt(this.responseText);
			addResponse("Relay Status: "+relayStatus+"<br/>");
			if(relayStatus == 0)
			{
				updateAfterStatus("c1","c0");
			}
			else
			{
				updateAfterStatus("c0","c1");
			}
		}
  	};
	var url = "/status";
  	xhttp.open("GET", url, true);
  	xhttp.send();	
}

function pageLoop()
{
	//getTemp();
	//getHumidity();
	getStatus();
}