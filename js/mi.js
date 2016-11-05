var colClassName = document.querySelector('#col-class-name');
var colPoint = document.querySelector('#col-point');
var colCredit = document.querySelector('#col-credit');
var calculateBtn = document.querySelector('#calculate-btn');
var addNewBtn = document.querySelector('#add-new-btn');
var answearModel = document.querySelector('#calculateAnswear .modal-body p');
var titleModel = document.querySelector('#calculateAnswear .modal-title');
window.onload = function() {
    addNewBtn.addEventListener('click', addNewItem, false);
    calculateBtn.addEventListener('click', calculateGPA, false);
    colPoint.addEventListener('focusout', testPointInput, false);
    colCredit.addEventListener('focusout', testCreditInput, false);
}

function addNewItem() {
    var item1Str = colClassName.lastElementChild.firstElementChild.placeholder.substr(-1, 1);
    var item1 = document.createElement('div');
    item1.className = 'form-group has-feedback';
    item1.innerHTML = '<input type="text" class="form-control input-sm"' + 'placeholder="&#x8BFE;&#x7A0B;' + (parseInt(item1Str) + 1) + '">';
    var item2 = document.createElement('div');
    item2.className = 'form-group has-feedback';
    item2.innerHTML = '<input type="text" class="form-control input-sm"><span></span>';
    var item3 = document.createElement('div');
    item3.className = 'form-group has-feedback';
    item3.innerHTML = '<input type="text" class="form-control input-sm"><span></span>';
    colClassName.appendChild(item1);
    colPoint.appendChild(item2);
    colCredit.appendChild(item3);
    event.preventDefault();
}

function getGpaFromPoint(point) {
    var gpa = 0;
    switch (true) {
        case (point <= 100) && (point >= 90):
            gpa = 4;
            break;
        case (point < 90) && (point >= 85):
            gpa = 3.7;
            break;
        case (point < 85) && (point >= 82):
            gpa = 3.3;
            break;
        case (point < 82) && (point >= 78):
            gpa = 3;
            break;
        case (point < 78) && (point >= 75):
            gpa = 2.7;
            break;
        case (point < 75) && (point >= 72):
            gpa = 2.3;
            break;
        case (point < 72) && (point >= 68):
            gpa = 2;
            break;
        case (point < 68) && (point >= 66):
            gpa = 1.7;
            break;
        case (point < 66) && (point >= 64):
            gpa = 1.5;
            break;
        case (point < 64) && (point >= 60):
            gpa = 1;
            break;
        case (point < 60) && (point >= 0):
            gpa = 0;
            break;
        default:
            gpa = -1;
            break;
    }
    return gpa;
}

function testPointInput(event) {
    var e = arguments[0] || window.event,
        target = e.srcElement ? e.srcElement : e.target;
    //在这里是实际绑定的事件
    if (target.nodeName == "INPUT") {
        if (isNaN(parseInt(target.value)) || target.value < 0 || target.value > 100) {
            target.parentElement.className = 'form-group has-error has-feedback';
            target.parentElement.lastElementChild.className = 'glyphicon glyphicon-remove form-control-feedback';
        } else {
            target.parentElement.className = 'form-group has-feedback';
            target.parentElement.lastElementChild.className = '';
        }
    }
}

function testCreditInput(event) {
    var e = arguments[0] || window.event,
        target = e.srcElement ? e.srcElement : e.target;
    //在这里是实际绑定的事件
    if (target.nodeName == "INPUT") {
        if (isNaN(parseInt(target.value)) || target.value < 0 || target.value > 10) {
            target.parentElement.className = 'form-group has-error has-feedback';
            target.parentElement.lastElementChild.className = 'glyphicon glyphicon-remove form-control-feedback';
        } else {
            target.parentElement.className = 'form-group has-feedback';
            target.parentElement.lastElementChild.className = '';
        }
    }
}

function getCreditArr() {
    var creditInput = document.querySelectorAll('#col-credit input');
    var arr = [];
    for (var i = 0; i < creditInput.length; i++) {
        arr.push(parseInt(creditInput[i].value, 10));
    }
    return arr;
}

function getPointArr() {
    var pointInput = document.querySelectorAll('#col-point input');
    var arr = [];
    for (var i = 0; i < pointInput.length; i++) {
        arr.push(parseInt(pointInput[i].value, 10));
    }
    return arr;

}

function calculateGPA(event) {
    event.preventDefault();
    var i = 0;
    var flag = 1;
    var up = 0;
    var down = 0;
    var pointArr = getPointArr();
    var creditArr = getCreditArr();
    for (i = 0; i < colClassName.children.length; i++) {
        if (isNaN(parseInt(pointArr[i])) || isNaN(parseInt(creditArr[i]))) {
            flag = 0;
            break;
        }
        up += (getGpaFromPoint(pointArr[i]) * creditArr[i]);
        down += creditArr[i];
    }
    if (flag == 0 || isNaN(((up / down).toFixed(2)))) {
        titleModel.innerHTML = '查询失败';
        answearModel.innerHTML = '请检查您的数据的有效性';
    } else {
        titleModel.innerHTML = '查询成功';
        answearModel.innerHTML = '您的平均学分绩点为' + ((up / down).toFixed(2));
    }
    $('#calculateAnswear').modal('show');
}
