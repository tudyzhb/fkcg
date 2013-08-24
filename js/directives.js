'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])

    .directive('dialog', [function(){
        return {
            restrict: 'E',
            compile: function(element, attrs)
            {
                var type = attrs.type || 'text';
                var required = attrs.hasOwnProperty('required') ? "required='required'" : "";
                var htmlText = '<div class="control-group">' +
                    '<label class="control-label" for="' + attrs.formId + '">' + attrs.label + '</label>' +
                        '<div class="controls">' +
                        '<input type="' + type + '" class="input-xlarge" id="' + attrs.formId + '" name="' + attrs.formId + '" ' + required + '>' +
                        '</div>' + attrs.name +
                    '</div>';
                element.replaceWith(htmlText);
            },
            controller: function($scope, $element){
                console.log($scope.name);
            }
        }
    }])
;
