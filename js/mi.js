var checkGrade = function(rules, value, callback) {
    var grade = parseInt(value, 10);
    setTimeout(function() {
        if (!Number.isInteger(grade) && value != '') {
            callback(new Error('请输入数字值'));
        } else {
            if (grade > 100 || grade < 0) {
                callback(new Error('必须介于0～100'));
            } else {
                callback();
            }
        }
    }, 800);
};
var checkCredit = function(rules, value, callback) {
    var credit = parseInt(value, 10);
    setTimeout(function() {
        if (!Number.isInteger(credit) && value != '') {
            callback(new Error('请输入数字值'));
        } else {
            if (credit > 10 || credit < 0) {
                callback(new Error('必须介于0～10'));
            } else {
                callback();
            }
        }
    }, 800);
};
var app = new Vue({
    el: '#app',
    data: {
        rowNum: 5,
        stopRemove: false,
        input: [{
            index: 1,
            courseName: '',
            grade: '',
            credit: ''
        }, {
            index: 2,
            courseName: '',
            grade: '',
            credit: ''
        }, {
            index: 3,
            courseName: '',
            grade: '',
            credit: ''
        }, {
            index: 4,
            courseName: '',
            grade: '',
            credit: ''
        }, {
            index: 5,
            courseName: '',
            grade: '',
            credit: ''
        }],
        queryResult: {
            dialogVisible: false,
            title: '',
            content: ''
        },
        queryQuestion: {
            dialogVisible: false,
            gridData: [{
                grade: '90―100',
                credit: 4
            }, {
                grade: '85―89.9',
                credit: 3.7
            }, {
                grade: '82―84.9',
                credit: 3.3
            }, {
                grade: '78―81.9',
                credit: 3
            }, {
                grade: '75―77.9',
                credit: 2.7
            }, {
                grade: '72―74.9',
                credit: 2.3
            }, {
                grade: '68―71.9',
                credit: 2
            }, {
                grade: '66―67.9',
                credit: 1.7
            }, {
                grade: '64―65.9',
                credit: 1.5
            }, {
                grade: '60―63.9',
                credit: 1
            }, {
                grade: '60分以下',
                credit: 0
            }]
        },
        queryDeveloper: {
            dialogVisible: false

        },
        rules: {
            grade: [{
                validator: checkGrade,
                trigger: 'change,blur'
            }],
            credit: [{
                validator: checkCredit,
                trigger: 'change,blur'
            }]

        }
    },
    methods: {
        addItem: function() {
            if (this.stopRemove = true) {
                this.stopRemove = false;
            }
            this.input.push({
                index: this.rowNum + 1,
                courseName: '',
                grade: '',
                credit: ''
            });
            this.rowNum++;
        },
        removeItem: function() {
            if (this.rowNum <= 2) {
                this.stopRemove = true;
            }
            this.input.pop();
            this.rowNum--;
        },
        resetInput: function() {
            for (var i = 0; i < this.input.length; i++) {
                this.input[i].courseName = '';
                this.input[i].grade = '';
                this.input[i].credit = '';
            }
        },
        getGpaFromPoint: function(point) {
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
        },
        calculateGPA: function() {
            var i = 0;
            var flag = 1;
            var up = 0;
            var down = 0;
            var input = this.input;
            var getGpaFromPoint = this.getGpaFromPoint;
            for (i = 0; i < this.rowNum; i++) {
                if (input[i].grade == '' && input[i].credit == '') {
                    continue;
                }
                if ((parseInt(input[i].grade, 10) >= 0 && parseInt(input[i].grade, 10) <= 100) && (parseInt(input[i].credit, 10) >= 0 && parseInt(input[i].credit, 10) <= 10)) {
                    up += (getGpaFromPoint(parseInt(input[i].grade, 10)) * parseInt(input[i].credit, 10));
                    down += parseInt(input[i].credit, 10);
                } else {
                    flag = 0;
                    break;
                }
            }
            if (flag === 0) {
                this.queryResult.title = '查询失败';
                this.queryResult.content = '请检查您的数据有效性';
                this.queryResult.dialogVisible = true;
            } else if (isNaN(up / down)) {
                this.queryResult.title = '查询失败';
                this.queryResult.content = '请不要提交空表';
                this.queryResult.dialogVisible = true;
            } else {
                this.queryResult.title = '查询成功';
                this.queryResult.content = '您的平均学分绩点为' + ((up / down).toFixed(2));
                this.queryResult.dialogVisible = true;
            }
        }
    }
});