"use strict";

window.addEventListener("DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはlocalStorage機能が実装されていません")
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            dellLocalStorage();
            allClearLocalStorage();
            selectTable();
        }

    }, false
);
//2.
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;

            if (key == "" || value == "") {
                Swal.fire({
                    title: "Memo app"
                    , html: "Key、Memoはいずれも必須です。"
                    , type: "error"
                    , allowOutsideClick: false

                });
                return;
            } else {
                let w_msg = "LocalStorageに\n「" + key + " " + value + "」\nを保存（save）しますか？";
                Swal.fire({
                    title: "Memo app"
                    , html: w_msg
                    , type: "question"
                    , showCancelButton: true
                }).then(function (result) {
                    if (result.value === true) {
                        localStorage.setItem(key, value);
                        viewStorage();
                        let w_msg = "LocalStorageに" + key + " " + value + "を保存（ほぞん）しました。";
                        Swal.fire({
                            title: "Memo app"
                            , html: w_msg
                            , type: "success"
                            , allowOutsideClick: false

                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }
        }, false
    );
};

//3. localStorageから１件削除
function dellLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let chkbox1 = document.getElementById("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");
            if (w_cnt >= 1) {
                let w_msg = "localStorageから選択されている" + w_cnt + "件をを除(削delete) しますか？"
                Swal.fire({
                    title: "Meno app",
                    html: w_msg,
                    type: "question",
                    showCancelButton: true
                }).then(function (result) {
                    if (result.value) {
                        for (let i = 0; i < chkbox1.length; i++) {
                            if (chkbox1[i].checked) {
                                localStorage.removeItem(table1.rows[i + 1].cells[1].firstChild.data);
                            }
                        }
                        viewStorage();
                        let w_msg = "LocalStorageから" + w_cnt + "件をを除(削delete) しました。"
                        Swal.fire({
                            title: "Meno app",
                            html: w_msg,
                            type: "success",
                            showCancelButton: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    }
                });
            }

        }, false
    );
};
//4.
function allClearLocalStorage() {
    const del = document.getElementById("allClear");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_msg = "LocalStorageのデータをすべて削除（all clear）します。\nよろしいですか？";
            Swal.fire({
                title: "Memo app"
                , html: w_msg
                , type: "question"
                , showCancelButton: true
            }).then(function (result) {
                if (result.value) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータをすべて削除（all clear）しました。";
                    Swal.fire({
                        title: "Memo app"
                        , html: w_msg
                        , type: "success"
                        , allowOutsideClick: false
                    });
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            });
        }, false
    );
}
//5.
function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select"); //テーブルからデータ選択

        }, false
    );
};
//データから選択
function selectCheckBox(mode) {
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textKey = "";
    let w_textMemo = "";
    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textKey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textKey").value = w_textKey;
    document.getElementById("textMemo").value = w_textMemo;
    if (mode == "select") {
        if (w_cnt === 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "１つ選択（select）してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
    if (mode === "del") {
        if (w_cnt >= 1) {
            return w_cnt;
        } else {
            Swal.fire({
                title: "Memo app"
                , html: "１つ以上選択（select）してください。"
                , type: "error"
                , allowOutsideClick: false
            });
        }
    }
};



//localStrorage
function viewStorage() {
    const list = document.getElementById("list");
    list.innerHTML="";
    //localStrorage table に追加
    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        //
        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
    }
    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}

