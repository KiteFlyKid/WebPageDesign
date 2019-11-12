
function copyText1() {
    var text1 = document.getElementById("text1").innerText;
    var input1 = document.getElementById("input1");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function copyText2() {
    var text1 = document.getElementById("text2").innerText;
    var input1 = document.getElementById("input2");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function copyText3() {
    var text1 = document.getElementById("text3").innerText;
    var input1 = document.getElementById("input3");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function copyText4() {
    var text1 = document.getElementById("text4").innerText;
    var input1 = document.getElementById("input4");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function copyText5() {
    var text1 = document.getElementById("text5").innerText;
    var input1 = document.getElementById("input5");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function copyText6() {
    var text1 = document.getElementById("text6").innerText;
    var input1 = document.getElementById("input6");
    input1.value = text1; 
    input1.select();
    document.execCommand("copy"); 
    alert("复制成功");
    }
function niceIn(prop){
    prop.find('i').addClass('niceIn');
    setTimeout(function(){
        prop.find('i').removeClass('niceIn');	
    },1000);		
}
$(function () {
    $("#btn1").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
    
    $("#btn2").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
    
    $("#btn3").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
    
    $("#btn4").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
    
    $("#btn5").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
    $("#btn6").click(function () {
        $.tipsBox({
            obj: $(this),
            str: "+1",
            callback: function () {
            }
        });
        niceIn($(this));
    });
});
function click1 () {
    location.reload();
    }