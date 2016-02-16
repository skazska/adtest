/**
 * Created by ska on 2/16/16.
 */
'use strict';

angular.module('template')
    .angular.component('templateCanvas', {
        controller: function(){

        },
        templateUrl: 'templates/template-canvas.html',
        bindings: {
            template: '=',
            current­element­id: '='
        }

    });
