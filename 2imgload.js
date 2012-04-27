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
		 show_img(req.responseXML, 1, 1);
	    }
	 }
	return;
  };

  req.open("GET", q, false);
  req.send();
}

show_img = function(r, i, j) {
  var ima1 = document.createElement('img');
  var ima2 = document.createElement('img');
  ima1.setAttribute("src", r.getElementsByName('url1')[i].childNodes[1].childNodes[0].data);
  ima2.setAttribute("src", r.getElementsByName('url2')[j].childNodes[1].childNodes[0].data);
  ima1.setAttribute('width', 550);
  ima2.setAttribute('width', 550);
  var t = document.createElement('table');
  var row = t.insertRow(0);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.appendChild(ima1);
  cell2.appendChild(ima2); //insert image to table

  row = t.insertRow(1);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  cell1.innerHTML = r.getElementsByName('dn1')[1].childNodes[1].childNodes[0].data;
  cell2.innerHTML = r.getElementsByName('dn2')[1].childNodes[1].childNodes[0].data; //insert label to table

  row = t.insertRow(2);
  cell1 = row.insertCell(0);
  cell2 = row.insertCell(1);
  bt1 = document.createElement('button');
  bt2 = document.createElement('button');
  bt3 = document.createElement('button');
  bt4 = document.createElement('button');
  bt1.innerHTML = "&lt;&lt;";
  bt2.innerHTML = "&gt;&gt";
  bt3.innerHTML = "&lt;&lt;";
  bt4.innerHTML = "&gt;&gt";
  cell1.appendChild(bt1);
  cell1.appendChild(bt2);
  cell2.appendChild(bt3);
  cell2.appendChild(bt4);
  bt1.addEventListener("click", function (ev) {
      ev.preventDefault();
      show_img(r, --i, j);
  });
  bt2.addEventListener("click", function (ev) {
      ev.preventDefault();
      show_img(r, ++i, j);
  });
  bt3.addEventListener("click", function (ev) {
      ev.preventDefault();
      show_img(r, i, --j);
  });
  bt4.addEventListener("click", function (ev) {
      ev.preventDefault();
      show_img(r, i, ++j);
  });
  


  document.body.appendChild(t);

  //document.body.appendChild(ima1);
  //document.body.appendChild(ima2);
}

