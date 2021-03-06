/*! angular-trix - v1.0.2 - 2017-03-17
* https://github.com/sachinchoolur/angular-trix
* Copyright (c) 2017 Sachin; Licensed MIT */
// https://github.com/sachinchoolur/angular-trix
(function() {
    'use strict';
    angular.module('angularTrix', []).directive('angularTrix', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                trixInitialize: '&',
                trixChange: '&',
                trixSelectionChange: '&',
                trixFocus: '&',
                trixBlur: '&',
                trixFileAccept: '&',
                trixAttachmentAdd: '&',
                trixAttachmentRemove: '&'
            },
            link: function(scope, element, attrs, ngModel) {

                element.on('trix-initialize', function() {
                    if (ngModel.$modelValue) {
                        element[0].editor.loadHTML(ngModel.$modelValue);
                    }
                });

                ngModel.$render = function() {
                    if (element[0].editor) {
                        element[0].editor.loadHTML(ngModel.$modelValue);
                    }

                    element.on('trix-change', function() {
                        ngModel.$setViewValue(element[0].inputElement.value);
                    });
                };

                var registerEvents = function(type, method) {
                    element[0].addEventListener(type, function(e) {
                        if (type === 'trix-file-accept' && attrs.preventTrixFileAccept === 'true') {
                            e.preventDefault();
                        }

                        scope[method]({
                            e: e,
                            editor: element[0].editor
                        });
                    });
                };

                registerEvents('trix-initialize', 'trixInitialize');
                registerEvents('trix-change', 'trixChange');
                registerEvents('trix-selection-change', 'trixSelectionChange');
                registerEvents('trix-focus', 'trixFocus');
                registerEvents('trix-blur', 'trixBlur');
                registerEvents('trix-file-accept', 'trixFileAccept');
                registerEvents('trix-attachment-add', 'trixAttachmentAdd');
                registerEvents('trix-attachment-remove', 'trixAttachmentRemove');

            }
        };
    });

}());
