N0 = {children:[], contents: {L:41, M:59}, classifier: "Mesan-IgG1", pos: []};
N1 = {children:[], classifier: "GCW-IgG2", contents: {L:10, M:55}, pos: []};
N2 = {classifier: "GCW-IgG2", contents: {L:1, M:45}, pos: []};
N3 = {children:[], classifier: "GCW-IgGG", contents: {L:9, M:10}, pos: []};
N4 = {contents: {L:7, M:0}, pos: []};
N5 = {contents: {L:2, M:10}, pos: []};
N6 = {contents: {L:31, M:4}, pos: []};
N0.children = [N1, N6];
N1.children = [N2, N3];
N3.children = [N4, N5];

S = [N0, N1, N2, N3, N4, N5, N6];
var setpos = function (N, po) {
    N.pos = po;
	if (N.hasOwnProperty("children")) {
	    setpos(N.children[0], [po[0] - 110, po[1] + 250]);
	    setpos(N.children[1], [po[0] + 110, po[1] + 250]);
	} 
}
setpos(N0, [400, 20]);	

var canvas = document.createElement("canvas");
canvas.height = 1500;
canvas.width = 1000;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

for (var ind in S) {
    ctx.strokeRect(S[ind].pos[0], S[ind].pos[1], 200, 150);
}

