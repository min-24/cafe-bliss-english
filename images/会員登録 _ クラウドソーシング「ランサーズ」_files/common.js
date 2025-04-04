// JavaScript Document

$(function() {
    // アンカーリンクスクロール
    // idとname属性に対応
    // aタグに以下の属性を付与することで挙動を調整できる
    // data-no-anchor-scroll属性をtrueにすることで、アンカースクロールを無効に
    // data-tolerance属性を付与することで指定した値分移動座標を調整

    $(".js-smooth-scroll").on('click', function() {
        var speed = 500;
        var href= $(this).attr("href");
        if(href == "#" || href == "") {
            $("html,body").animate({scrollTop:0},'slow');
            return false;
        }
        var target = $(href);

        // リンクにdata-no-anchor-scroll属性が存在し値がtrueであればスクロールしない
        if ($(this).data('no-anchor-scroll') === true) {
            return;
        } else {
            var position = target.offset().top;

            // ヘッダーが固定にされていれば高さ分引く
            // TODO: 固定判定をCSSのプロパティ名で見ているがクラス名にしたい
            var header = $('.js-lancers-header header');
            var headerHeight = header.height();

            // アプリのWebview等はヘッダーの高さ取得不可
            if (isFinite(headerHeight)) {
                position = position - headerHeight;
            }

            // リンクにdata-tolerance属性が存在すればその値分調整する
            if ($(this).data('tolerance')) {
                position += $(this).data('tolerance');
            }

            $("html, body").animate({scrollTop:position}, speed, "swing");
            return false;
        }
    });

});

/**
 * 入力可能文字数リマインダー
 * idはJquery形式で#をつける 例: #id_name
 * @params string ta_id テキストエリアのid
 * @params int limit 制限文字数
 * @params string re_id 制限文字数表示エリアのid
 * @return void
 */
function reminder_num_check(ta_id, limit ,re_id) {
    var cnt = 0;
    var t_cnt = 0;
    var ta = $(ta_id)[0];
    cnt = str_width(ta.value);
    t_cnt = limit-cnt; //文字数制限から入力文字数を引いた計算 (整数にする)
    re = $(re_id)[0];
    re.removeChild(re.firstChild);
    re.appendChild(document.createTextNode(t_cnt)); //残りの文字数
    if(t_cnt < 0){
        $(re_id).css({color:'#d91c0b'});
    } else {
        $(re_id).css({color:'inherit'});
    }

}
/* 文字数カウンター */
function str_width(str){
    str = str.replace(/[\n\r]/g,''); // 改行をカウントしない
    return str.length;
}

/**
 * 文字数カウントしたものを表示する
 * idはJquery形式で#をつける 例: #id_name
 * @params string ta_id テキストエリアのid
 * @params int limit 制限文字数
 * @params string re_id 文字カウント数表示エリアのid
 * @return void
 */
function reminder_num_count(ta_id, limit, re_id) {
    var cnt = 0;
    var ta = $(ta_id)[0];
    cnt = str_width(ta.value);
    re = $(re_id)[0];
    re.removeChild(re.firstChild);
    re.appendChild(document.createTextNode(cnt));
    if (limit < cnt) {
        $(re_id).css({color:'#d91c0b'});
    } else {
        $(re_id).css({color:'inherit'});
    }
}

/* 数値フォーマット */
function number_format(num) {
    if (typeof num == 'number') {
        return num.toString().replace( /([0-9]+?)(?=(?:[0-9]{3})+$)/g , '$1,');
    } else {
        return num;
    }
}

function add(el, none, none2){
    $(none).css('display', 'none');
    $(none2).css('display', 'none');
    $(el).css('display', 'block');
}

function change_disabled_attr(move_el, change_el, attr, data){
    if($(move_el).prop(attr) == data){
        $(change_el).removeProp("disabled");
    }else{
        $(change_el).prop("disabled", "disabled");
    }
}

/* 画面遷移時に確認ポップアップを出す(submit時以外) */
function on_before_unload(el, message) {
    var unload = true;
    $(el).on('click', function(){
        unload = false;
    });
    $('form').on('submit', function(){
        unload = false;
    });
    $('form').on('keyup', function(){
        unload = true;
    });
    $('body').on('mouseover', function(){
        unload = true;
    });
    $("#no-navigation-logo").on('click', function(){
        unload = true;
    });
    window.onbeforeunload = function(){
        if (document.payment) {
            unload = false; // 決済フォームは確認画面があるので出さない
        }

        if (unload) {
            return message;
        }
    }
}
