var req = new XMLHttpRequest();
var compare_img = function(d1, d2) {
  var q;
  q = '/repositories/Pathology_demo?query=' + escape([
      'SELECT ?dn1 ?url1 ?dn2 ?url2 WHERE {', 
        '{',  
	   '?d1 path:imageURL ?url1 . ',
	   '?d1 rdfs:label ?dn1 . ',
        'filter (?dn1 = "' + d1 + '")',
	'}',
        'UNION',
        '{',  
	  '?d2 path:imageURL ?url2 .',
	  '?d2 rdfs:label ?dn2 .',
          'filter (?dn2 = "' + d2 + '")',
	'}',
    '}'
  ].join(' '));
  req.onreadystatechange = function () {
	if (req.readyState === 4) {
         if (req.status === 200) {
		 show_img(req.responseXML);
	    }
	 }
	return;
  };

  req.open("GET", q, false);
  req.send();
}

show_img = function(r) {
  var ima1 = document.createElement('img');
  var ima2 = document.createElement('img');
  ima1.setAttribute("src", r.getElementsByName('url1')[1].childNodes[1].childNodes[0].data);
  ima2.setAttribute("src", r.getElementsByName('url2')[1].childNodes[1].childNodes[0].data);
  ima1.setAttribute('width', 550);
  ima2.setAttribute('width', 550);
  var t = document.createElement('table');
  var row = t.insertRow(0);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.appendChild(ima1);
  cell2.appendChild(ima2);

  document.body.appendChild(t);

  //document.body.appendChild(ima1);
  //document.body.appendChild(ima2);
}

