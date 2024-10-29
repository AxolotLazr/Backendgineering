let windowHolder = document.getElementById('viewSpaceHolder');
print('Got windowHolder');
let viewport = document.getElementById('viewport');
print('Got viewport')
let infoport = document.getElementById('infoport');
print('Got infoport')
let AGUIport = document.getElementById('AGUIport');
print('Got AGUIport')

let windows = [];
print('Made "windows" variable');

document.getElementById('versionDisplay').innerText = '~V'+currentVersion;
print('Set the version display')

assignWindow(viewport, 0, 0, true);
assignWindow(infoport, 1, 0, false);
assignWindow(AGUIport, 0, 1, false);

updateWindows();

// useful functions
function assignWindow(object, collumn, row, open) {
    object.classList.remove("open");
    if(open){object.classList.add("open")};
    
    windows.push([object, collumn, row, open]);
    print(windows);
}
function updateWindows() {
    windowHolder.innerHTML = '';

    let collumnsUsed = [];
    let rowsUsed = [];
    for (i = 0; i < windows.length; i++) {
        collumnsUsed.push(windows[i][1]);
    }
    for (i = 0; i < windows.length; i++) {
        rowsUsed.push(windows[i][2]);
    }
    let minCollumn = Math.min.apply(Math, collumnsUsed);
    let minRow = Math.min.apply(Math, rowsUsed);
    let maxCollumn = Math.max.apply(Math, collumnsUsed);
    let maxRow = Math.max.apply(Math, rowsUsed);
    for (i = 0; i < collumnsUsed.length; i++) {
        collumnsUsed[i] = collumnsUsed[i] - minCollumn;
    }
    for (i = 0; i < rowsUsed.length; i++) {
        rowsUsed[i] = rowsUsed[i] - minRow;
    }

    for (i = minRow; i <= maxRow; i++) {
        let newRow = document.createElement('span');
        newRow.classList = 'row';
        for (i2 = minCollumn; i2 <= maxCollumn; i2++) {
            let newCollumn = document.createElement('span');
            newCollumn.classList = 'collumn';
            newRow.appendChild(newCollumn);
        }
        windowHolder.appendChild(newRow);
    }
    for (i = 0; i < windows.length; i++) {
        document.getElementsByClassName('row')[rowsUsed[i]].getElementsByClassName('collumn')[collumnsUsed[i]].appendChild(windows[i][0]);
    }
}