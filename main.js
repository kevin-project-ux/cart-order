
let db;
let firebaseRefFuncs;
let result;

$(function () {
    $('#bottomNav').load('bottom-nav.html', function () {

        const page = $('body').data('page');

        $('.nav-item').removeClass('active');
        $('.nav-item[data-page="' + page + '"]').addClass('active');

        initFirebase();
    });
});

async function initFirebase() {
    // Firebase 8.x CDN
    await import('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
    await import('https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js');

    // Firebase 初始化
    const firebaseConfig = {
        apiKey: "AIzaSyC8m836pO-wSSshMj3tx_C3FPLCmPF4O6Y",
        authDomain: "fir-55dbc.firebaseapp.com",
        databaseURL: "https://fir-55dbc-default-rtdb.firebaseio.com",
        projectId: "fir-55dbc",
        storageBucket: "fir-55dbc.appspot.com",
        messagingSenderId: "545726793239",
        appId: "1:545726793239:web:94567930a3b2a55d5efe52",
        measurementId: "G-R5XS993882"
    };

    firebase.initializeApp(firebaseConfig);
    db = firebase.database(); // 全域 db
    // firebaseRefFuncs = firebase.database; // 全域 ref / push / set 等方法
}

async function postGAS( data, opts={} ){

    var successMsg = opts['successMsg'] ?? false;
    var errorMsg   = opts['errorMsg'];
    var $modalHide = opts['modalHide'] ?? '';
    var $reload    = opts['reload'] ?? true;
    var $return    = opts['return'] ?? false;

    try {
        mask.style.display = 'flex';
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(data)
        });

        result = await response.json();
        // console.log(result);

        if (result[0].status == 'success') {
            if( $modalHide ){ $modalHide.modal('hide'); }
            if( successMsg ){ Swal.fire({ icon: 'success', title: successMsg, text: result[0].alert }); }
            if( $reload ){ await fetchData(); } // 重新載入品項、口味資料
        } else {
            Swal.fire({ icon: 'error', title: errorMsg, text: result[0].alert || '請稍後再試' });
        }
        if( $return ){ return result; }
    } catch (err) {
        // console.log(err);
        Swal.fire({ icon: 'error', title: '系統異常' });
    } finally {
        mask.style.display = 'none';
    }
}