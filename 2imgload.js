var req = new XMLHttpRequest();
var compare_img = function(d1, d2) {
  var q;
  q = '/repositories/Pathology_demo?query=' + escape([
	'SELECT ?dn ?url WHERE {',
	'  ?d path:microURL ?url .',
	'  ?d rdfs:label ?dn .',
      '  filter (?dn = "' + d1 + '" || ?dn = "' + d2 + '")',
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
  ima1.setAttribute("src", r.getElementsByName('url')[1].childNodes[1].childNodes[0].data);
  ima2.setAttribute("src", r.getElementsByName('url')[2].childNodes[1].childNodes[0].data);
  ima1.setAttribute('width', 550);
  ima2.setAttribute('width', 550);
  document.body.appendChild(ima1);
  document.body.appendChild(ima2);
}

