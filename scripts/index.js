// handling variables
let windowHolder = document.getElementById('viewSpaceHolder');
print('Got windowHolder');
let viewport = document.getElementById('viewport');
print('Got viewport')
let infoport = document.getElementById('infoport');
print('Got infoport')
let AGUIport = document.getElementById('AGUIport');
print('Got AGUIport')
let versport = document.getElementById('versport');
print('Got versport')
let windows = document.getElementsByClassName('window');
print('Got windows')

let windowArray = [];
print('Made "windowArray" variable');

// the MEAT
document.getElementById('versionDisplay').innerText = '~V'+currentVersion;
print('Set the version display')

assignWindow(viewport, 0, 0, true);
assignWindow(infoport, 1, 0, false);
assignWindow(AGUIport, 0, 1, false);
assignWindow(versport, 1, 1, false);

updateWindows();

windowClassesAdd('glow');

// useful functions
function windowClasses(items) {
    for (i = 0; i < windows.length; i++) {
        windows[i].classList = items;
    }
}
function windowClassesAdd(item) {
    for (i = 0; i < windows.length; i++) {
        windows[i].classList.add(item);
    }
}
function windowClassesRemove(item) {
    for (i = 0; i < windows.length; i++) {
        windows[i].classList.remove(item);
    }
}

function assignWindow(object, collumn, row, open) {
    // set open class
    object.classList.remove("open");
    if(open){object.classList.add("open")};
    
    // add window to array
    windowArray.push([object, collumn, row, open]);

    // closing log
    print('Assigned ' + object.id + ' window to (' + collumn + ', ' + row + ')');
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
    for (i = 0; i < windowArray.length; i++) {
        collumnsUsed.push(windowArray[i][1]);
        if (windowArray[i][3]){
            collumnsOpen.push(windowArray[i][1]);
        }
    }
    for (i = 0; i < windowArray.length; i++) {
        rowsUsed.push(windowArray[i][2]);
        if (windowArray[i][3]){
            rowsOpen.push(windowArray[i][2]);
        }
    }

    // set min col/row vars
    let minCollumn = Math.min.apply(Math, collumnsUsed);
    let minRow = Math.min.apply(Math, rowsUsed);

    // adjust col/row arrays to 0
    for (i = 0; i < windowArray.length; i++) {
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
    for (i = 0; i < windowArray.length; i++) {
        document.getElementsByClassName('row')[rowsUsed[i]].getElementsByClassName('collumn')[collumnsUsed[i]].appendChild(windowArray[i][0]);
        // print('Appended ' + windowArray[i][0].id + ' to window(' + collumnsUsed[i] + ', ' + collumnsUsed[i] + ')');
    }

    // closing log
    print('Windows updated');
}