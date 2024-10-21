let root = document.querySelector(':root');

// browser theme
let browser = getBrowser();
console.log('Browser Prediction: ' + browser);
let browserTheme = getBrowserTheme();
console.log('Browser Theme Prediction: ' + browserTheme);

// version
let currentVersion = '0.0.3';
console.log('App version estimation: ' + currentVersion);

// calculations
let liquidLoss = gall_to_M3(1000000000000)/4000000000000;
console.log('Liquid loss: ' + liquidLoss);

document.getElementById('versionDisplay').innerText = '~V'+currentVersion;

// root.style.setProperty('text-shadow', '0px 0px 0.4vmin var(--highlight0)' + ', 0px 0px 1vmin var(--highlight1)'.repeat(3) + ', 0px 0px 3vmin var(--highlight3)'.repeat(6))

fetch("../resources/base/burner.txt")
    .then((res) => res.text())
    .then((text) => {
        console.log(text);
    })
    .catch((e) => console.error(e));

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

function gall_to_M3(input){
    return(input/264.2)
}