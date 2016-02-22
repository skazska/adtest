/**
 * Created by ska on 2/16/16.
 */
'use strict';

angular.module('templateCanvas',['editable'])
    .directive('templateCanvas', [ templateCanvasFactory ]);

function templateCanvasFactory(){
  return {
    restrict: 'E',
    scope: {
      template: '=',
      currentElementId: '='
    },
    link: function(scope, element, attrs){
      element.css({
        border: '1px solid red',
        display: 'block',
        width: scope.template.width+'px',
        height: scope.template.height+'px'
      });

      if (angular.isUndefined(scope.currentElementId) && !angular.isUndefined(scope.template.elements[0])) scope.currentElementId = scope.template.elements[0].id;


    },
//    template:'<div></div>'
    templateUrl: "templates/template-canvas.html"
  }
}

