let root = document.querySelector(':root');
log('Got root')
let body = document.querySelector('body');
log('Got body')

// browser theme
let browser = getBrowser();
log('Browser Prediction: ' + browser);
let browserTheme = getBrowserTheme();
log('Browser Theme Prediction: ' + browserTheme);

// version
let currentVersion = '0.0.3';
console.log('App version estimation: ' + currentVersion);

// calculations
let liquidLoss = gall_to_M3(1000000000000)/4000000000000;
console.log('Liquid loss: ' + liquidLoss);

getFolderDescenentFiles('../resources').forEach(file => {
    log(readResourceFile(file));
});

// GUA functions
function createMachine() {

}

// specific functions
function getBrowser () {
    if ((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0){
        return 'Opera';
    } else if (typeof InstallTrigger !== 'undefined') {
        return 'Firefox';
    } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification))) {
        return 'Safari';
    } else if (/*@cc_on!@*/false || !!document.documentMode) {
        return 'Internet Explorer';
    } else if ((!(/*@cc_on!@*/false || (!!document.documentMode) && !!window.StyleMedia)) || ((!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) && (navigator.userAgent.indexOf("Edg") != -1))) {
        return 'Microsoft Edge';
    } else if (!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)) {
        return 'Google Chrome';
    } else {
        return 'unknown';
    }
}
function getBrowserTheme () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else {
        return 'light';
    }
}

// incredibly useful functions
function log (content) {
    console.log(content);
}

function css_set (variable, value, hide) {
    root.style.setProperty(variable, value);
    if(hide != true){log('Set ' + variable + ' to ' + value);}
}
function css_get (variable) {
    return(getComputedStyle(root).getPropertyValue(variable));
}

function getFolderChildren (folderPath) {
    let xhttp = new XMLHttpRequest();

    xhttp.open('GET', folderPath, false);
    xhttp.send();

    let folder = xhttp.responseText;
    let folderLines = folder.split(/\r?\n|\r|\n/g);
    let usefulLines = [];
    for (i = 0; i < folderLines.length; i++){
        if (folderLines[i].includes('<a href="\\')){
            usefulLines.push(folderLines[i])
        }
    }
    let folderContents = [];
    for (i = 0; i < usefulLines.length; i++){
        if (!usefulLines[i].split('"')[1].replaceAll('\\','/').replace('/','../').includes('NOREAD')) {
            folderContents.push(usefulLines[i].split('"')[1].replaceAll('\\','/').replace('/','../'));
        }
    }

    return folderContents;
}
function getFolderDescenents (folderPath, filter = 'none') {
    let folderContents = getFolderChildren(folderPath);
    
    for (i = 0; i < folderContents.length; i++){
        if (folderContents[i][folderContents[i].length - 1] == '/'){
            let firstDescendents = getFolderChildren(folderContents[i]);
            for (i2 = 0; i2 < firstDescendents.length; i2++) {
                folderContents.push(firstDescendents[i2]);
            }
        }
    }

    return folderContents;
}
function getFolderDescenentFiles (folderPath) {
    let allDescendents = getFolderDescenents(folderPath);
    let files = [];

    allDescendents.forEach(i => {if (i[i.length - 1] != '/'){
            files.push(i);            
        }
    });

    return files;
}
function readResourceFile (filePath) {
    let xhttp = new XMLHttpRequest();
    let readObj = [];

    xhttp.open('GET', filePath, false);
    xhttp.send();

    let file = xhttp.responseText;

    file = file.replaceAll(/\r?\n|\r/g, '').replaceAll('    ', '');
    let fileChunks = file.split('!');
    readObj.push(fileChunks[0]);

    fileChunks = fileChunks[1].split(';');

    fileChunks.forEach(chunk => {
        if (chunk.includes('[')) {
            chunk = chunk.replace(']', '').split('[');
        } else {
            chunk = chunk.replace(')', '').split('(');
        }


        readObj.push(chunk);
    })

    return readObj;
}

function appendAtoB (elementA, elementB) {
    elementB.appendChild(elementA);
}

// conversions
function gall_to_M3 (input) {
    return(input/264.2)
}