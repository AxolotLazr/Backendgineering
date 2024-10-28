let viewport = document.getElementById('viewport');
print('Got viewport')
let infoport = document.getElementById('infoport');
print('Got infoport')
let AGUIport = document.getElementById('AGUIport');
print('Got AGUIport')

let rowsUsed = '';
let collumnsUsed = '';

document.getElementById('versionDisplay').innerText = '~V'+currentVersion;

assignWindow(viewport, 2, 2, true);
assignWindow(infoport, 2, 3, false);
assignWindow(AGUIport, 3, 2, false);

// useful functions
function assignWindow(object, row, collumn, open) {
    rowsUsed = rowsUsed + (row - 1);
    collumnsUsed = collumnsUsed + (collumn - 1);

    let rows = document.getElementsByClassName('row');

    for (i = 0; i < rows.length; i++){
        if (rowsUsed.includes(i)){
            if (rowsUsed.includes(i)){
                if (open){
                    rows[i].style.flexGrow = 1
                } else {
                    if (i == 1){rows[i].style.flexGrow = 1} else {rows[i].style.height = 'var(--wayOutGap)'}
                }
            }
        }
        let collumns = rows[i].getElementsByClassName('collumn');
        for (i2 = 0; i2 < collumns.length; i2++){
            if (collumnsUsed.includes(i2)){
                if (open){
                    collumns[i2].style.flexGrow = 1
                } else {
                    if (i2 == 1){collumns[i2].style.flexGrow = 1} else {collumns[i2].style.width = 'var(--wayOutGap)'}
                }
            }
        }
    }

    rows[row - 1].getElementsByClassName('collumn')[collumn - 1].appendChild(object);
}