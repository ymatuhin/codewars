// http://www.codewars.com/kata/53223653a191940f2b000877

function solve_graph(start, end, arcs) {
    if (start == end) return true;

    var i, out = false, lineList = {};

    for (i = 0; i < arcs.length; i++) {
        lineList[arcs[i].start] = lineList[arcs[i].start] || [];
        lineList[arcs[i].start].push(arcs[i].end);
    }

    nextStep(start);
    function nextStep (next) {
        var cur = lineList[next] || [];
        out = (cur.indexOf(end) !== -1) ? true : out;
        for (i = 0; i < cur.length; i++) {
            if (out || (cur[i] === start && start !== end)) return;
            nextStep(cur[i]);
        }
    }
    return out;
}