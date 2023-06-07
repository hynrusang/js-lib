# ![JavaScript icon](https://github.com/hynrusang/js-lib/blob/main/resource/logo.png) Jade (Js Downloader)
- [before](https://github.com/hynrusang/js-lib)
- [Source Code](https://github.com/hynrusang/js-lib/blob/main/jade.js)
---

## Info
- This library can download other JavaScript programs from my website.
- It can be more helpful than the default HTML script tag.

## How it works
1. Inside the `<script src="https://hynrusang.github.io/js-lib/jade.js">` tag, scripts to include are separated by semicolons.
2. The first argument specifies the script name to include, and the second argument specifies the version.
2. The version can either specify a particular version (e.g. "1.0.0"), use **"release"** to automatically use the latest version that's almost stabilized,  
or use **"prerelease"** to automatically use the highly developed version , or use **"developer"** for a version specifically for developers.

## Note
1. To use this jade.js library, scripts in HTML must be written as **external scripts**, not internal scripts.
2. The version must either be a **valid version number**, **"release"**, or **"prerelease"**, or **"developer"**

## What is "release", "prerelease", "developer"?
1. release
- **Release** is a version that is officially supported as it **has reached an advanced stage** of development.  
(Stability: **Very High**, Development Frequency: **Very Low**)
2. prerelease
- **Prerelease** is a version that is **currently being developed** and officially supported, but it is still in the development stage.    
(Stability: **High**, Development Frequency: **Medium**)
3. developer
- **Developer** is **experimental version** release offered temporarily before the development stabilizes.  
(Stability: **Low**, Development Frequency: **High**)

### Example
```js
<script src="https://hynrusang.github.io/js-lib/jade.js">
    dynamic, prerelease;
    livedata, developer;
    advanced, 1.0.0;
</script>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></jade>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js"></jade>
<jade src="https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js"></jade>
<jade src="/resource/js/1.0.0/calculater.js"></jade>
<jade src="/resource/js/1.0.0/firebaseUtil.js"></jade>
<jade src="/resource/js/1.0.0/util.js"></jade>
```

### Result
```js
<script src="https://hynrusang.github.io/js-lib/1.2.0/dynamic.js"></script>
<script src="https://hynrusang.github.io/js-lib/1.2.0/livedata.js"></script>
<script src="https://hynrusang.github.io/js-lib/1.0.0/advanced.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js"></script>
<script src="/resource/js/1.0.0/calculater.js"></script>
<script src="/resource/js/1.0.0/firebaseUtil.js"></script>
<script src="/resource/js/1.0.0/util.js"></script>
```
