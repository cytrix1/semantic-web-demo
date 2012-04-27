function imgload(d1, d2) {
  var q = "SELECT ?dn ?url WHERE { ?d path:microURL ?url . ?d rdfs:label ?dn . filter (?dn = \"" + d1 + "\" || ?dn = \"" + d2 + "\" }";
  q = "/repositories/Pathology_demo?query=" + escape(q);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", q, true);
  xmlhttp.send();


  var r = xmlhttp.responseXML;
  var ima1 = document.createElement('img');
  var ima2 = document.createElement('img');
  ima1.setAttribute("src", r.getElementsByName('url')[1].childNodes[1].childNodes[0].data);
  ima2.setAttribute("src", r.getElementsByName('url')[2].childNodes[1].childNodes[0].data);
  document.body.appendChild(ima1);
  document.body.appendChild(ima2);
  

}