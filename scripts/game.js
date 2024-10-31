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

// log(processFolder("resources"));

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

function css_set(variable, value, hide) {
    root.style.setProperty(variable, value);
    if(hide != true){log('Set ' + variable + ' to ' + value);}
}
function css_get(variable) {
    return(getComputedStyle(root).getPropertyValue(variable));
}
// function processFolder (folderPath) {
//     let rawFolder = fetch(folderPath).then((response) => response.text()).then((text) => {return text.split(/\r?\n|\r|\n/g)});
    
//     let xhttp = new XMLHttpRequest();
//     xhttp.open('GET', folderPath, true);
// }

function appendAtoB (elementA, elementB) {
    elementB.appendChild(elementA);
}

// conversions
function gall_to_M3 (input) {
    return(input/264.2)
}