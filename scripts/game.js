let loadStart = new Date().getTime();

let root = document.querySelector(':root');
log('Got root');
let head = document.querySelector('head');
log('Got head');
let body = document.querySelector('body');
log('Got body');

let AGUIport = document.getElementById('AGUIport');
log('Got AGUIport')

// Generalized Modding Format
let GMF = [];
GMF.separators = ['!', ';', ',', '(', ')', '[', ']', '='];
GMF.separators.regex = arrayToRegEx(['!', ';', ',', '\\(', '\\)', '\\[', '\\]', '=']);
GMF.openers = ['(', '['];
GMF.closers = [')', ']'];
GMF.continuers = [','];

// GMF functions
GMF.processFile = function (path) {
    let xhttp = new XMLHttpRequest();
    let readObj = [];
    
    xhttp.open('GET', path, false);
    xhttp.send();

    let file = xhttp.responseText;

    file = file.replaceAll(/\r?\n|\r/g, '').replaceAll(' ', '');

    // get resource type
    readObj.type = file.split('!')[0];
    file = file.split('!')[1].split(';');

    // construct resource data tree
    file.forEach(item => {
        // complex atributes
        if (item.includes('[')) {
            // complex atribute arrays
            if (item.includes('+')) {
                if (readObj[item.split('+=[')[0]] == null) {
                    readObj[item.split('+=[')[0]] = [];
                }
                readObj[item.split('+=[')[0]].push([]);
                
                item.replace(']', '').split('+=[')[1].split(',').forEach(item2 => {
                    if (item2.includes('{')) {
                        if (readObj[item.split('+=[')[0]][readObj[item.split('+=[')[0]].length - 1][item2.split('={')[0]] == null) {
                            readObj[item.split('+=[')[0]][readObj[item.split('+=[')[0]].length - 1][item2.split('={')[0]] = [];
                        }
                        readObj[item.split('+=[')[0]][readObj[item.split('+=[')[0]].length - 1][item2.split('={')[0]][item2.split('={')[1].split('=')[0]] = item2.replace('}', '').split('={')[1].split('=')[1];
                    } else if (item2.includes('(')) {
                        readObj[item.split('+=[')[0]][readObj[item.split('+=[')[0]].length - 1][item2.split('=(')[0]] = item2.replace(')', '').split('=(')[1].split(',')
                    } else {
                        readObj[item.split('+=[')[0]][readObj[item.split('+=[')[0]].length - 1][item2.split('=')[0]] = item2.split('=')[1];
                    };
                });
            }
            // normal complex atributes
            else {
                readObj[item.split('=[')[0]] = [];
            
                item.replace(']', '').split('=[')[1].split(',').forEach(item2 => {
                    // complex inner-atributes
                    if (item2.includes('{')) {
                        if (readObj[item.split('=[')[0]][item2.split('={')[0]] == null) {
                            readObj[item.split('=[')[0]][item2.split('={')[0]] = [];
                        }
                        readObj[item.split('=[')[0]][item2.split('={')[0]][item2.split('={')[1].split('=')[0]] = item2.replace('}', '').split('={')[1].split('=')[1];
                    }
                    // list inner-atributes
                    else if (item2.includes('(')) {
                        readObj[item.split('=[')[0]][item2.split('=(')[0]] = item2.replace(')', '').split('=(')[1].split(',')
                    }
                    // basic inner-atributes
                    else {
                        readObj[item.split('=[')[0]][item2.split('=')[0]] = item2.split('=')[1];
                    };
                });
            };

        }
        // list atributes
        else if (item.includes('(')) {
            readObj[item.split('=(')[0]] = item.replace(')', '').split('=(')[1].split(',')
        
        }
        // basic atributes
        else if (item.includes('=')) {
            readObj[item.split('=')[0]] = item.split('=')[1];
        };
    });

    return readObj;
};
GMF.storeRsrc = function (resource) {
    if (GMF.resources == null) {
        GMF.resources = [];
    }
    GMF.resources[resource.name] = resource;

    return GMF.resources;
};
GMF.loadResources = function () {
    getFolderDescenentFiles('resources').forEach(file => {
        GMF.storeRsrc(GMF.processFile(file));
    });
}
GMF.renderHitboxOf = function (resource) {
    log(resource.hitbox);
    if (resource.hitbox.length != 0) {
        resource.hitbox.forEach(hitbox => {
            let bottomHitSquare = document.createElement('div');
            bottomHitSquare.style.border = 'solid';
            bottomHitSquare.style.borderWidth = '1px';
            bottomHitSquare.style.borderColor = 'rgb(255,255,0)';
            bottomHitSquare.style.position = 'fixed';
            bottomHitSquare.style.left = '50%';
            bottomHitSquare.style.top = '50%';
            bottomHitSquare.style.width = (hitbox.width * 16) + 'px';
            bottomHitSquare.style.height = (hitbox.depth * 16) + 'px';
            document.getElementById('gameWindow').appendChild(bottomHitSquare);

            let leftHitSquare = document.createElement('div');
            leftHitSquare.style.border = 'solid';
            leftHitSquare.style.borderWidth = '1px';
            leftHitSquare.style.borderColor = 'rgb(255,255,0)';
            leftHitSquare.style.position = 'fixed';
            leftHitSquare.style.left = 'calc(50% - ' + (hitbox.width * 6) + 'px)';
            leftHitSquare.style.top = 'calc(50% - ' + (hitbox.height * 2) + 'px)';
            leftHitSquare.style.width = (hitbox.height * 16) + 'px';
            leftHitSquare.style.height = (hitbox.depth * 16) + 'px';
            leftHitSquare.style.transform = 'skewY(-0.12turn) scaleX(0.23)';
            document.getElementById('gameWindow').appendChild(leftHitSquare);
        });
    };
};

// browser theme
let browser = getBrowser();
log('Browser Prediction: ' + browser);
let browserTheme = getBrowserTheme();
log('Browser Theme Prediction: ' + browserTheme);

// version
// let currentVersion = '0.0.3';
// console.log('App version estimation: ' + currentVersion);

// calculations
let liquidLoss = gall_to_M3(1000000000000)/4000000000000;


GMF.loadResources();

log(GMF.resources);

GMF.renderHitboxOf(GMF.resources.Burner);


// game user action functions
function tryToPlace () {

};
function createMachine (name, coords, rotation) {

};

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
};
function getBrowserTheme () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    } else {
        return 'light';
    }
};

// incredibly useful functions
function log (content) {
    console.log(content);
};
function doneLoading () {
    log('Load time: ' + (new Date().getTime() - loadStart) + 'ms');
    document.getElementById('loadCover').style.opacity = '0';
    document.getElementById('loadCover').style.pointerEvents = 'none';

    body.style.transitionDuration = '0.2s';
};

function css_set (variable, value, hide) {
    root.style.setProperty(variable, value);
    if(hide != true){log('Set ' + variable + ' to ' + value);}
};
function css_get (variable) {
    return(getComputedStyle(root).getPropertyValue(variable));
};

// files
function loadStyles (subFolder) {
    let styles = getFolderDescenentFiles('styles/' + subFolder);
    styles.forEach(file => {
        if (file.split('.')[file.split('.').length - 1] == 'css') {
            let newStyleLink = document.createElement('link');
            newStyleLink.id = 'style-' + file.split('/')[3].split('.')[0];
            newStyleLink.rel = 'stylesheet';
            newStyleLink.href = file;
            head.appendChild(newStyleLink);
        } else if (file.split('.')[file.split('.').length - 1] == 'js') {
            let newStyleScript = document.createElement('script');
            newStyleScript.id = 'styleScript-' + file.split('/')[3].split('.')[0];
            newStyleScript.src = file;
            body.appendChild(newStyleScript);
        };
    });
};

function getFolderChildren (folderPath) {
    let xhttp = new XMLHttpRequest();

    if (window.location.hostname.includes('github.io')) {
        xhttp.open('GET', window.location.hostname + '/backendgineering/' + folderPath, false);
    } else {
        xhttp.open('GET', folderPath, false);
    }
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
};
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
};
function getFolderDescenentFiles (folderPath) {
    let allDescendents = getFolderDescenents(folderPath);
    let files = [];

    allDescendents.forEach(i => {if (i[i.length - 1] != '/'){
            files.push(i);            
        }
    });

    return files;
};

function appendAtoB (elementA, elementB) {
    elementB.appendChild(elementA);
};

// conversions
function gall_to_M3 (input) {
    return(input/264.2)
};
function arrayToRegEx (input) {
    if (Array.isArray(input)) {
        return RegExp(input.join('|'), 'g')
    } else {
        return 'ERROR: Not an array';
    };
}