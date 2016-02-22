/**
 * Created by ska on 2/21/16.
 */

angular.module('templateCanvas',[])
    .directive('templateCanvas', [ templateCanvasFactory ]);

function templateCanvasFactory(){
    return {
        restrict: 'E',
        scope: {
            template: '=',
            currentElementId: '='
        },
        link: function(scope, element, attrs){
            if (angular.isUndefined(scope.currentElementId) && !angular.isUndefined(scope.template.elements[0])) scope.currentElementId = scope.template.elements[0].id;
        },
        template:'<div></div>'
//    templateUrl: "templates/template-canvas.html"
    }
}

