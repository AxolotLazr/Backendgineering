// handling variables
let windowHolder = document.getElementById('viewSpaceHolder');
log('Got windowHolder');
let viewport = document.getElementById('viewport');
log('Got viewport')
let infoport = document.getElementById('infoport');
log('Got infoport')
let AGUIport = document.getElementById('AGUIport');
log('Got AGUIport')
let versport = document.getElementById('versport');
log('Got versport')
let windowUIHolder = document.getElementById('windowUIHolder');
log('Got windowUIHolder')

let windows = [];
log('Made "windows" variable');

// the MEAT
document.getElementById('versionDisplay').innerText = '~V'+currentVersion;
log('Set the version display')

assignWindow(viewport, 0, 0, true);
assignWindow(infoport, 1, 0, false);
assignWindow(AGUIport, 0, 1, false);
assignWindow(versport, 1, 1, false);

updateWindows();
updateWindowUI();

windowClassesAdd('glow');

body.onmousemove = updateMouse;

// general functions
function assignWindow(object, collumn, row, open) {
    // set open class
    object.classList.remove("open");
    if(open){object.classList.add("open")};
    
    // add window to array
    windows.push([object, collumn, row, open]);

    // closing log
    log('Assigned ' + object.id + ' window to (' + collumn + ', ' + row + ')');
}

// specific functions
function windowClasses(items) {
    for (i = 0; i < windows.length; i++) {
        windows[i][0].classList = items;
    }
}
function windowClassesAdd(item) {
    for (i = 0; i < windows.length; i++) {
        windows[i][0].classList.add(item);
    }
}
function windowClassesRemove(item) {
    for (i = 0; i < windows.length; i++) {
        windows[i][0].classList.remove(item);
    }
}

// function windowPreview() {}
function windowPreview(source) {
    let windowPreview = document.getElementById('windowPreview');
    windowPreview.innerHTML = '';
    windowPreview.appendChild(source.cloneNode(true));
}
function updateMouse(event) {
    css_set('--mh', event.clientX + 'px', true);
    css_set('--mv', event.clientY + 'px', true);
}

function updateWindows() {
    // clear window holder
    windowHolder.innerHTML = '';

    // create col/row arrays
    let collumnsUsed = [];
    let rowsUsed = [];
    let collumnsOpen = [];
    let rowsOpen = [];

    // define col/row arrays
    for (i = 0; i < windows.length; i++) {
        collumnsUsed.push(windows[i][1]);
        if (windows[i][3]){
            collumnsOpen.push(windows[i][1]);
        }
    }
    for (i = 0; i < windows.length; i++) {
        rowsUsed.push(windows[i][2]);
        if (windows[i][3]){
            rowsOpen.push(windows[i][2]);
        }
    }

    // set min col/row vars
    let minCollumn = Math.min.apply(Math, collumnsUsed);
    let minRow = Math.min.apply(Math, rowsUsed);

    // adjust col/row arrays to 0
    for (i = 0; i < windows.length; i++) {
        collumnsUsed[i] = collumnsUsed[i] - minCollumn;
        rowsUsed[i] = rowsUsed[i] - minRow;
    }
    for (i = 0; i < rowsOpen.length; i++) {
        collumnsOpen[i] = collumnsOpen[i] - minCollumn;
        rowsOpen[i] = rowsOpen[i] - minRow;
    }

    // set max col/row arrays
    let maxCollumn = Math.max.apply(Math, collumnsUsed);
    let maxRow = Math.max.apply(Math, rowsUsed);

    // create col/row divs
    for (i = 0; i <= maxRow; i++) {
        let newRow = document.createElement('span');
        newRow.classList = 'row';

        if(rowsOpen.includes(i)){newRow.style.flexGrow = 1;}

        for (i2 = 0; i2 <= maxCollumn; i2++) {
            let newCollumn = document.createElement('span');
            newCollumn.classList = 'collumn';

            if(collumnsOpen.includes(i2)){newCollumn.style.flexGrow = 1;}

            newRow.appendChild(newCollumn);
        }

        windowHolder.appendChild(newRow);
    }

    // append windows to col/rows
    for (i = 0; i < windows.length; i++) {
        windowHolder.getElementsByClassName('row')[rowsUsed[i]].getElementsByClassName('collumn')[collumnsUsed[i]].appendChild(windows[i][0]);
    }

    // closing log
    log('Windows updated');
}
function updateWindowUI() {
    // clear window holder
    windowUIHolder.innerHTML = '';

    // create col/row arrays
    let collumnsUsed = [];
    let rowsUsed = [];
    let collumnsOpen = [];
    let rowsOpen = [];

    // define col/row arrays
    for (i = 0; i < windows.length; i++) {
        collumnsUsed.push(windows[i][1]);
        if (windows[i][3]){
            collumnsOpen.push(windows[i][1]);
        }
    }
    for (i = 0; i < windows.length; i++) {
        rowsUsed.push(windows[i][2]);
        if (windows[i][3]){
            rowsOpen.push(windows[i][2]);
        }
    }

    // set min col/row vars
    let minCollumn = Math.min.apply(Math, collumnsUsed);
    let minRow = Math.min.apply(Math, rowsUsed);

    // adjust col/row arrays to 0
    for (i = 0; i < windows.length; i++) {
        collumnsUsed[i] = collumnsUsed[i] - minCollumn;
        rowsUsed[i] = rowsUsed[i] - minRow;
    }
    for (i = 0; i < rowsOpen.length; i++) {
        collumnsOpen[i] = collumnsOpen[i] - minCollumn;
        rowsOpen[i] = rowsOpen[i] - minRow;
    }

    // set max col/row arrays
    let maxCollumn = Math.max.apply(Math, collumnsUsed);
    let maxRow = Math.max.apply(Math, rowsUsed);

    // create col/row divs
    for (i = 0; i <= maxRow; i++) {
        let newRow = document.createElement('span');
        newRow.classList = 'row';

        if(rowsOpen.includes(i)){newRow.style.flexGrow = 1;}

        for (i2 = 0; i2 <= maxCollumn; i2++) {
            let newCollumn = document.createElement('span');
            newCollumn.classList = 'collumn glass inset';

            newCollumn.onmousedown = function(){windowPreview(this)};

            if(collumnsOpen.includes(i2)){newCollumn.style.flexGrow = 1;}

            newRow.appendChild(newCollumn);
        }

        windowUIHolder.appendChild(newRow);
    }

    // assign classes to col/rows in windowUI
    for (i = 0; i < windows.length; i++) {
        windowUIHolder.getElementsByClassName('row')[rowsUsed[i]].getElementsByClassName('collumn')[collumnsUsed[i]].classList.add(windows[i][0].classList[1]);
    }

    // closing log
    log('WindowUI updated');
}