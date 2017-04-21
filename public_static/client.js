/**
 * Created by a.gupta1409 on 21-04-2017.
 */

function change(element) {
    console.log('change: ' + element.id);
    $.post('/addtocart',{id:element.id},function (data) {
        $('#cart').val = data + "items";
    })
}