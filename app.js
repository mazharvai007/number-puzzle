
let moves = 0;
let tbl, rows, cols;
// Move
function Move(d) {
    let cell = getCell(d);
    let row = getRow(cell);
    let ri = row.rowIndex;
    let ci = cell.cellIndex;
    let emptyCell;

    // Check row/cell empty or not
    if (ri > 0 && emptyCell == null) {
        if (isCellEmpty(tbl.rows[ri - 1].cells[ci])) {
            emptyCell = tbl.rows[ri - 1].cells[ci];
        }
    }

    if (ri < tbl.rows.length - 1 && emptyCell == null) {
        if (isCellEmpty(tbl.rows[ri + 1].cells[ci])) {
            emptyCell = tbl.rows[ri + 1].cells[ci];
        }
    }

    if (ci > 0 && emptyCell == null) {
        if (isCellEmpty(tbl.rows[ri].cells[ci - 1])) {
            emptyCell = tbl.rows[ri].cells[ci - 1];
        }
    }

    if (ci < row.cells.length - 1 && emptyCell == null) {
        if (isCellEmpty(tbl.rows[ri].cells[ci + 1])) {
            emptyCell = tbl.rows[ri].cells[ci + 1];
        }
    }

    // Check empty cell
    if (emptyCell == null) {
        d.style.backgroundColor = "#ff0000";
        d.style.color = "#fff";
        setTimeout("removeHighlight('" + d.id + "'); ", 500);
    } else {
        changeParent(d, emptyCell);
        moves++;
        document.getElementById("moves").innerHTML = moves;
        isInOrder();
    }
}

// Order
function isInOrder() {
    let arrDiv = document.getElementsByTagName("DIV");
    let inorder = true;

    for (let i = 0; i < arrDiv.length - 1; i++) {
        let n = parseInt(trim(arrDiv[i].innerHTML));
        let n1 = parseInt(trim(arrDiv[i + 1].innerHTML));
        if (n + 1 != n1) {
            inorder = false;
            break;
        }
    }

    if (inorder && isCellEmpty(tbl.rows[tbl.rows.length - 1].cells[cols - 1])) {
        for (let i = 0; i < arrDiv.length; i++) {
            arrDiv[i].style.backgroundColor = "#ffffcc";
        }

        alert("Perfect! It took you " + moves + " moves to solve it.");
    }
}

// Reset
function Reset() {
    // Get Move
    moves = 0;
    document.getElementById("moves").innerHTML = moves;

    // Get Rows
    rows = document.getElementById("rows").value;
    if (isNaN(rows) || rows < 0) {
        rows = 4;
    } else {
        rows = Math.round(document.getElementById("rows").value);
    }
    document.getElementById("rows").value = rows;

    // Get Cols
    cols = document.getElementById("cols").value;
    if (isNaN(cols) || cols < 0) {
        cols = 4;
    } else {
        cols = Math.round(document.getElementById("cols").value);
    }
    document.getElementById("cols").value = cols;
    
    // Get Table
    tbl = document.getElementById("tbl");
    while (tbl.rows.length > 0) {
        tbl.deleteRow(0);
    }
    
    // Rows * Cols - 1 (i.e., 4 x 4 - 1 = 15)
    let n = rows * cols - 1;
    let arrN = new Array();
    for (let i = 1; i <= n; i++) {
        arrN.push(i);
    }

    let inversions = 1;
    while (inversions % 2 == 1) {
        arrN = shuffle(arrN);
        inversions = 0;

        for (let i = 0; i < arrN.length; i++) {
            for (let j = i; j < arrN.length; j++) {
                if (arrN[i] > arrN[j])inversions++;
            }
        }
    }

    // Create rows inside table and cols inside rows.
    cellNum = 0;
    for (let i = 0; i < rows; i++) {
        tbl.insertRow(i);
        let tr = tbl.rows[i];

        for (let j = 0; j < cols; j++) {
            tr.insertCell(j);
            let td = tr.cells[j];
            td.className = "cell";

            // Check empty cell and increase cells
            if (i == rows - 1 && j == cols - 1) {
                td.innerHTML = "";
            } else {
                td.innerHTML = "<div id='cellNum" + arrN[cellNum] + "' class='num' onclick='Move(this)'>" + arrN[cellNum] + "</div>";
            }
            
            cellNum++;
        }
        
    }
}

// Shuffle
function shuffle(o) {
    for (let j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Empty Cell
function isCellEmpty(cell) {
    for (let i = 0; i < cell.childNodes.length; i++) {
        if (cell.childNodes[i].className == "num") {
            return false;
        }
        
    }
    return true;
}

// Remove Highlight
function removeHighlight(rh) {
    let moveD = document.getElementById(rh);
    moveD.style.backgroundColor = "#CCFFFF";
    moveD.style.color = "#0099ff";
}

// Get the Table
function getTable(t) {
    let c = t.parentNode;
    while (c.tagName != 'TABLE') {
        c = c.parentNode;
    }
    return c;
}

// Get Row
function getRow(r) {
    let row = r.parentNode;

    while (row.tagName != 'TR') {
        row = row.parentNode;
    }

    return row;
}

// Get Cell
function getCell(c) {
    let cell = c.parentNode;
    
    while (cell.tagName != "TD") {
        cell = cell.parentNode;
    }

    return cell;
}

// Row Index
function getRowIndex(a) {
    let c = a.parentNode;
    while (c.tagName != "TR") {
        c = c.parentNode;
    }
    return c.rowIndex;
}

// Cell Index
function getCellIndex(a) {
    let c = a.parentNode;
    while (c.tagName != "TD") {
        c = c.parentNode;
    }
    return c.cellIndex;
}

// Add Row
function addRow(tbl, i, numCells) {
    let r = tab.insertRow(i);
    for (let j = 0; j < numCells; j++) {
        let c = r.insertCell(j);
        c.className = "col" + (j + 1);
        c.innerHTML = "";
    }
}

function trim(str) {
    str = str.replace(/^\s+/, "");
    for (let i = 0; i < str.length; i++) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }        
    }
    return str;
}

function changeParent(sourceElement, targetElement) {
    let sourceElementParent = sourceElement.parentNode;
    sourceElementParent.removeChild(sourceElement);
    targetElement.appendChild(sourceElement);
}