//每过1小时清理token
(function() {

    var token = sessionStorage.getItem("data_token");

    if (token === 'undefined' || token === null) {
        return;
    }

    // setTimeout(function() {
    //     sessionStorage.clear();
    //     window.parent.location.href = "/#/login";
    // }, 3600000);
})();
