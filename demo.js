xmlhttp.onreadystatechange = function() {  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {  alert(xmlhttp.responseText);  }  }

/*
select ?dn  ?url where { ?d  path:microURL  ?url  . ?d  rdfs:label  ?dn  . filter (?dn = "Oncocytoma in kidney" || ?dn = "ChromophobeRCC") }  

select%20%3Fdn%20%20%3Furl%20where%20%7B%20%3Fd%20%20path%3AmicroURL%20%20%3Furl%20%20.%20%3Fd%20%20rdfs%3Alabel%20%20%3Fdn%20%20.%20filter%20%28%3Fdn%20%3D%20%22Oncocytoma%20in%20kidney%22%20%7C%7C%20%3Fdn%20%3D%20%22ChromophobeRCC%22%29%20%7D
*/


var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/repositories/Pathology_demo?query=select%20%3Fdn%20%20%3Furl%20where%20%7B%20%3Fd%20%20path%3AmicroURL%20%20%3Furl%20%20.%20%3Fd%20%20rdfs%3Alabel%20%20%3Fdn%20%20.%20filter%20%28%3Fdn%20%3D%20%22Oncocytoma%20in%20kidney%22%20%7C%7C%20%3Fdn%20%3D%20%22ChromophobeRCC%22%29%20%7D", true);
xmlhttp.send();
var r = xmlhttp.responseXML;
var ima1 = document.createElement('img');
var ima2 = document.createElement('img');
ima1.setAttribute("src", r.getElementsByName('url')[1].childNodes[1].childNodes[0].data);
ima2.setAttribute("src", r.getElementsByName('url')[2].childNodes[1].childNodes[0].data);
document.body.appendChild(ima1);
document.body.appendChild(ima2);
