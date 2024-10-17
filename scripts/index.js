let root = document.querySelector(':root');

let browser = getBrowser();
let browserTheme = getBrowserTheme();

let currentVersion = '0.0.3';

console.log('Browser Prediction: ' + browser);
console.log('Browser Theme Prediction: ' + browserTheme);

console.log('App version estimation: ' + currentVersion)
document.getElementById('versionDisplay').innerText = '~V'+currentVersion;

// root.style.setProperty('text-shadow', '0px 0px 0.4vmin var(--highlight0)' + ', 0px 0px 1vmin var(--highlight1)'.repeat(3) + ', 0px 0px 3vmin var(--highlight3)'.repeat(6))

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