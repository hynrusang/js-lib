﻿/*
jade(js downloader) library
info:
This library can download other JavaScript programs from my website.
It can be more helpful than the default HTML script tag.

How it works:
Inside the <script src="https://hynrusang.github.io/js-lib/jade.js"> tag, scripts to include are separated by semicolons.
The first argument specifies the script name to include, and the second argument specifies the version.
The version can either specify a particular version (e.g. "1.0.0"), use "release" to automatically use the latest version, or use "developer" for a version specifically for developers.

Note:
1. To use this jade.js library, scripts in HTML must be written as external scripts, not internal scripts.
2. The version must either be a valid version number, "release", or "developer".

Example:
<script src="https://hynrusang.github.io/js-lib/jade.js">
    dynamic, release;
    livedata, 1.0.0;
    advanced, developer;
</script>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></jade>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js"></jade>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js"></jade>
<jade src="/resource/js/1.0.0/calculater.js"></jade>
<jade src="/resource/js/1.0.0/firebaseUtil.js"></jade>
<jade src="/resource/js/1.0.0/util.js"></jade>

Result:
<script src="https://hynrusang.github.io/js-lib/1.1.0/dynamic.js"></script>
<script src="https://hynrusang.github.io/js-lib/1.0.0/livedata.js"></script>
<script src="https://hynrusang.github.io/js-lib/1.0.0/advanced.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js"></script>
<script src="/resource/js/1.0.0/calculater.js"></script>
<script src="/resource/js/1.0.0/firebaseUtil.js"></script>
<script src="/resource/js/1.0.0/util.js"></script>
*/
const __$$IMPLEMENTHREF = "https://hynrusang.github.io/js-lib/";
const __$$VERSIONINFO = {
    advanced: ["1.0.0", "1.0.0"],
    dynamic: ["1.1.0", "1.2.0"],
    livedata: ["1.0.0", "1.1.0"]
};
for (let data of document.querySelector(`script[src="${__$$IMPLEMENTHREF}jade.js"]`).innerHTML
    .replaceAll("\n", "")
    .split(" ").join("")
    .split(";")) {
    if (data != "") {
        const __$$ELEMENT = document.createElement("script");
        __$$ELEMENT.src = (data.split(",")[1] == "developer") ? `${__$$IMPLEMENTHREF}${__$$VERSIONINFO[data.split(",")[0]][1]}/${data.split(",")[0]}.js`
            : (data.split(",")[1] == "release") ? `${__$$IMPLEMENTHREF}${__$$VERSIONINFO[data.split(",")[0]][0]}/${data.split(",")[0]}.js`
            : `${__$$IMPLEMENTHREF}${data.split(",")[1]}/${data.split(",")[0]}.js`;
        __$$ELEMENT.async = false;
        document.body.appendChild(__$$ELEMENT);
    }
}
window.onload = () => {
    for (let data of document.querySelectorAll("jade")) {
        const __$$ELEMENT = document.createElement("script");
        if (data.attributes[0] != null) __$$ELEMENT.src = data.attributes[0].value;
        else continue;
        __$$ELEMENT.async = false;
        document.body.appendChild(__$$ELEMENT);
        data.remove();
    }
    document.querySelector(`script[src="${__$$IMPLEMENTHREF}jade.js"]`).remove();
}
