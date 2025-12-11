"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            return;
        } else {
            saveLocalStorage();
        }

    }, false
);

function saveLocalStorage() {
    const save = document.getElementById("save");

    save.addEventListener("click",
     function (e) {
        e.preventDefault();

        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMeno").value;

        if (key =="" || value =="") {
            window.alert("Key, Meno はいずれも必須です。");
            return;
        } else {
            localStorage.setItem(key, value);
            let w_msg = "LocalStorageに " + key + " : " + value + " を保存しました。";
            window.alert(w_msg);

            document.getElementById("textKey").value = "";
            document.getElementById("textMeno").value = "";
        }

    }, false);
}

