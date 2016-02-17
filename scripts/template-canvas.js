/**
 * Created by ska on 2/16/16.
 */
'use strict';


function templateCanvasFactory(draggable){
  return {
    restrict: 'E',
    scope: {
      template: '=',
      currentElementId: '='
    },
    link: function(scope, element, attrs){

    },
    templateUrl: "templates/template-canvas.html"
  }
}

angular.module('template',['drag'])
    .angular.directive('templateCanvas', [ 'draggable', templateCanvasFactory ]);
