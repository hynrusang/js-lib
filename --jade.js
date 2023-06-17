const __$$IMPLEMENTHREF = "";
const __$$VERSIONINFO = {
    advanced: ["1.0.0", "1.1.0", "1.1.0"],
    dynamic: ["1.1.0", "1.2.0", "1.2.0"],
    livedata: ["1.1.0", "1.1.0", "1.2.0"],
    tagx: [null, null, "1.0.0"]
};
for (let data of document.querySelector(`script[src="https://hynrusang.github.io/js-lib/--jade.js"]`).innerHTML
    .replaceAll("\n", "")
    .replaceAll("\t", "")
    .split(" ").join("")
    .split(";")) {
    if (data != "") {
        const __$$ELEMENT = document.createElement("script");
        __$$ELEMENT.src = (data.split(",")[1] == "developer") ? `${__$$IMPLEMENTHREF}${__$$VERSIONINFO[data.split(",")[0]][2]}/${data.split(",")[0]}.js`
            :(data.split(",")[1] == "prerelease") ? `${__$$IMPLEMENTHREF}${__$$VERSIONINFO[data.split(",")[0]][1]}/${data.split(",")[0]}.js`
            : (data.split(",")[1] == "release") ? `${__$$IMPLEMENTHREF}${__$$VERSIONINFO[data.split(",")[0]][0]}/${data.split(",")[0]}.js`
            : `${__$$IMPLEMENTHREF}${data.split(",")[1]}/${data.split(",")[0]}.js`;
        __$$ELEMENT.async = false;
        document.body.appendChild(__$$ELEMENT);
    }
}
window.onload = () => {
    for (let data of document.querySelectorAll("jade")) {
        const __$$ELEMENT = document.createElement("script");
        if (data.attributes.src) __$$ELEMENT.src = data.attributes[0].value;
        else continue;
        __$$ELEMENT.async = false;
        document.body.appendChild(__$$ELEMENT);
        data.remove();
    }
    document.querySelector(`script[src="${__$$IMPLEMENTHREF}jade.js"]`).remove();
}
