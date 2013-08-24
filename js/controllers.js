'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
//    .controller('MyCtrl1', ['$scope', function($scope) {
//        $scope.name="my name";
//    }])
//    .controller('MyCtrl2', [function() {
//
//    }])
    .controller('MainCtrl', function($scope) {
        // 初始化
        $scope.customer = '';
        $scope.answers = [];
        $scope.databases = databases;
        $scope.database_name="fengkuangcaige";
        $scope.table_index = 0;

        $scope.$watch("customer", function(newVal, oldVal){
            // console.log(newVal, oldVal);
            if (newVal && newVal!=oldVal){

                var keys = {};
                angular.forEach(newVal, function(word){                             // 将备选字存入字典
                    if (word){ keys[word] = true; }
                });
                // console.log(keys);

                var answers = {};
                var answers_lis = [];
                angular.forEach($scope.children_lis, function(words){               // 遍历备选答案
                    var match_times = 0;
                    angular.forEach(words, function(word){
                        if (keys[word]){ match_times += 1; }
                    });
                    if (match_times){
                        answers[words] = match_times;
                        answers_lis.push(words);
                    }
                });
                // console.log(answers);
                answers_lis.sort(function(a, b){ return answers[b] - answers[a]; });
                // console.log(answers_lis);

                var ret = [];
                angular.forEach(answers_lis, function(word){
                    ret.push({word: word, times: answers[word]});
                });
                $scope.answers = ret;
                // console.log($scope.answers);
            }

        });

        $scope.$watch("children", function(newVal, oldVal){                         // 用户定义答案库
            if (newVal!=oldVal){ $scope.initalize_children(); }
        });

        $scope.initalize_children = function(){                                     // 将答案库切为数组
            $scope.children_lis = $scope.children.trim().split('\n');
            $scope.table.data = $scope.children;
            $scope.answers = [];
            // console.log($scope.children_lis);
        };

        $scope.initalize_database = function(){
            $scope.database = $scope.databases[$scope.database_name];
            $scope.table = $scope.database.collection[$scope.table_index];
            $scope.children = $scope.table.data;
            $scope.initalize_children();
        };

        $scope.$watch('database_name', function(newVal, oldVal){
            if (newVal!=oldVal){
                $scope.table_index = 0;
                $scope.initalize_database();
            }
        });

        $scope.$watch('table_index', function(newVal, oldVal){
            if (newVal!=oldVal){ $scope.initalize_database(); }
        });

        $scope.initalize_database();
    });