N0 = {label:"Node 0", children:[], contents: {L:41, M:59}, classifier: "Mesan-C1", pos: []};
N1 = {label:"Node 1", children:[], classifier: "GCW-IgG4", contents: {L:20, M:58}, pos: []};
N2 = {label:"Node 2", children:[], classifier: "GCW-IgG2", contents: {L:19, M:9}, pos: []};
N3 = {label:"Node 3", children:[], classifier: "Mesan-IgG1", contents: {L:3, M:9}, pos: []};
N4 = {label:"Node 4", contents: {L:1, M:9}, pos: []};
N5 = {label:"Node 5", contents: {L:2, M:0}, pos: []};
N6 = {label:"Node 6", contents: {L:16, M:0}, pos: []};
N7 = {label:"Node 7", contents: {L:1, M:49}, pos: []};
N8 = {label:"Node 8", contents: {L:21, M:1}, pos: []};
N0.children = [N1, N8];
N1.children = [N2, N7];
N2.children = [N3, N6];
N3.children = [N4, N5];

S = [N0, N1, N2, N3, N4, N5, N6, N7, N8];
var setpos = function (N, po) {
    N.pos = po;
	if (N.hasOwnProperty("children")) {
	    setpos(N.children[0], [po[0] - 110, po[1] + 275]);
	    setpos(N.children[1], [po[0] + 110, po[1] + 275]);
	} 
}
setpos(N0, [450, 5]);	

var canvas = document.createElement("canvas");
canvas.height = 1500;
canvas.width = 1000;
canvas.style = 'background-color:white;';
var ctx = canvas.getContext("2d");
document.head.appendChild(canvas);

for (var ind in S) {
    ctx.fillStyle = "#000000";
    ctx.strokeRect(S[ind].pos[0], S[ind].pos[1], 200, 200);
	ctx.beginPath();
	ctx.moveTo(S[ind].pos[0] + 10, S[ind].pos[1] + 60);
	ctx.lineTo(S[ind].pos[0] + 190, S[ind].pos[1] + 60);
	ctx.moveTo(S[ind].pos[0] + 10, S[ind].pos[1] + 110);
	ctx.lineTo(S[ind].pos[0] + 190, S[ind].pos[1] + 110);
	ctx.stroke();
	ctx.closePath();
	ctx.font = '18px san-serif';
	ctx.textAlign = 'center';
	ctx.fillText(S[ind].label, S[ind].pos[0] + 100, S[ind].pos[1] + 18);
	ctx.textAlign = "left";
	ctx.fillText("Category          n", S[ind].pos[0] + 50 , S[ind].pos[1] + 50);
	ctx.fillText("MLN", S[ind].pos[0] + 50, S[ind].pos[1] + 78);
	ctx.fillText("PMN", S[ind].pos[0] + 50, S[ind].pos[1] + 102);
	ctx.fillText("Total", S[ind].pos[0] + 50, S[ind].pos[1] + 128);	
	ctx.textAlign = "right";
	ctx.fillText(S[ind].contents.L, S[ind].pos[0] + 173, S[ind].pos[1] + 78);
	ctx.fillText(S[ind].contents.M, S[ind].pos[0] + 173, S[ind].pos[1] + 102);	
	ctx.fillText(S[ind].contents.L + S[ind].contents.M, S[ind].pos[0] + 173, S[ind].pos[1] + 128);	
	ctx.fillStyle = "#00AAAA";
	ctx.fillRect(S[ind].pos[0] + 23, S[ind].pos[1] + 69, 10, 10);
	for (var i=0;i<S[ind].contents.L;++i) {
		xpos = i % 10;
		ypos = parseInt(i/10);
		ctx.fillRect(S[ind].pos[0] + 5 + 9*xpos, S[ind].pos[1] + 137 + 9*ypos, 7, 7);
	}
	ctx.fillStyle = "#AA0000";
	for (var i=0;i<S[ind].contents.M;++i) {
		xpos = i % 10;
		ypos = parseInt(i/10);
		ctx.fillRect(S[ind].pos[0] + 105 + 9*xpos, S[ind].pos[1] + 137 + 9*ypos, 7, 7);
	}	
	ctx.fillRect(S[ind].pos[0] + 23, S[ind].pos[1] + 91, 10, 10);
	
	if (S[ind].hasOwnProperty("children")) {
		ctx.fillStyle = "#000000";
		ctx.beginPath();
		ctx.moveTo(S[ind].pos[0] + 100, S[ind].pos[1] + 200);
		ctx.lineTo(S[ind].pos[0] + 100, S[ind].pos[1] + 210);
		ctx.moveTo(S[ind].pos[0] + 100, S[ind].pos[1] + 230);
		ctx.lineTo(S[ind].pos[0] + 100, S[ind].pos[1] + 250);
		ctx.moveTo(S[ind].children[0].pos[0] + 100, S[ind].children[0].pos[1]);
		ctx.lineTo(S[ind].children[0].pos[0] + 100, S[ind].children[0].pos[1] -25);
		ctx.moveTo(S[ind].children[1].pos[0] + 100, S[ind].children[1].pos[1]);
		ctx.lineTo(S[ind].children[1].pos[0] + 100, S[ind].children[1].pos[1] -25);
		ctx.moveTo(S[ind].children[1].pos[0] + 100, S[ind].children[1].pos[1] -25);
		ctx.lineTo(S[ind].children[0].pos[0] + 100, S[ind].children[1].pos[1] -25);
		ctx.closePath();
		ctx.stroke();
		ctx.font = '18px san-serif';
		ctx.textAlign = 'center';
		ctx.fillText(S[ind].classifier, S[ind].pos[0] + 100, S[ind].pos[1] + 225);
		ctx.fillText("= 0", S[ind].children[0].pos[0] + 100, S[ind].children[0].pos[1] - 28);
		ctx.fillText("> 0", S[ind].children[1].pos[0] + 100, S[ind].children[1].pos[1] - 28);
	}
}

var dataURL = canvas.toDataURL("image/png");
document.getElementById("canvasImg").src = dataURL;


