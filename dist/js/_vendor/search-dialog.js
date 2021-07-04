$(document).ready(function () {
    openSearchDialog();
    closeSearchDialog();
});
function openSearchDialog() {
    $('#btnSearchOpen').click(function () {
        $(body).attr('style', 'overflow:hidden');
        $('#searchDiolog').addClass('active');
    })
}

function closeSearchDialog() {
    var closeDiolog = function () {
        $(body).attr('style', '');
        $('#searchDiolog').removeClass('active');
    }
    $('#btnSearchClose').click(function () { closeDiolog(); })
    $('#btnSearchSubmit').click(function () { closeDiolog(); })
}