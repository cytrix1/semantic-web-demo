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
            try {
		     show_img(req.responseXML, 1, 1); }
            catch(err) {
                alert("Check url of the image: " + err.mesaage); }
	    }
	 }
	return;
  };

  req.open("GET", q, false);
  req.send();
}

show_img = function(r, i, j) {
  if (document.getElementById('imagedisplay')) {
      document.body.removeChild(document.getElementById('imagedisplay'));
  }
  var ima1 = document.createElement('img');
  var ima2 = document.createElement('img');
  ima1.setAttribute("src", r.getElementsByName('url1')[i].childNodes[1].childNodes[0].data);
  ima2.setAttribute("src", r.getElementsByName('url2')[j].childNodes[1].childNodes[0].data);
  ima1.setAttribute('width', 550);
  ima2.setAttribute('width', 550);
  ima1.id = "img_url1_" + i;
  ima2.id = "img_url2_" + j; 
  var t = document.createElement('table');
  t.id = "imagedisplay";
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
  var bt = new Array();
  var ind = new Array();
  if (i == 1) {
      if (r.getElementsByName('url1').length > 2) {
          ind.push(2);   } }
  else if (i > 1 && i < r.getElementsByName('url1').length - 1) {
      ind.push(1); ind.push(2);   }
  else if (i == r.getElementsByName('url1').length - 1) {
      ind.push(1);   }
  else {
      alert("abnormal value of i");    }
  if (j == 1) {
      if (r.getElementsByName('url2').length > 2) {      
          ind.push(4);   }  }
  else if (j > 1 && j < r.getElementsByName('url2').length - 1) {
      ind.push(3); ind.push(4);    }
  else if (j == r.getElementsByName('url2').length - 1) {
      ind.push(3);  }
  else {
      alert("abnormal value of j");    }
  for (each in ind)  {
      var inn = ind[each];
      bt[inn] = document.createElement('button');
      bt[inn].id = inn;
      bt[inn].innerHTML = (inn % 2) ? "&lt;&lt;" : "&gt;&gt;";
      if (inn == 1 || inn == 2)  {
          cell1.appendChild(bt[inn]);  }
      else if (inn == 3 || inn ==4)  {
          cell2.appendChild(bt[inn]);  } 
      bt[inn].addEventListener("click", function (ev) {
          var evsrc = ev.target.id ;
          if (evsrc == 1) {
              --i;}
          else if (evsrc == 2) {
              ++i; }
          else if (evsrc == 3) {
              --j;  }
          else if (evsrc == 4) {
              ++j; }
          ev.preventDefault();
          document.body.removeChild(t);
          try { 
              show_img(r, i, j); }
          catch(err) {
              alert("Check url of the image: " + err.mesaage); }          
      });
  }

  document.body.appendChild(t);
}

