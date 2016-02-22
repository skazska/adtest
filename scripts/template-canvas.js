/**
 * Created by ska on 2/16/16.
 */
'use strict';

angular.module('templateCanvas',['editable'])
    .directive('dynaRect', ['$document', dynaRectFactory])
    .directive('templateCanvas', [ templateCanvasFactory ]);

function templateCanvasFactory(){
  return {
    restrict: 'E',
    scope: {
      template: '=',
      currentElementId: '='
    },
    templateUrl: "templates/template-canvas.html",
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){
      $element.addClass('template-canvas');
      $element.css({
        width: $scope.template.width+'px',
        height: $scope.template.height+'px'
      });

      if (angular.isUndefined($scope.currentElementId) && !angular.isUndefined($scope.template.elements[0])) $scope.currentElementId = $scope.template.elements[0].id;

      this.bounds = function(){
        return getOffsetRect($element[0]);
      };

      this.checkBounds = function(left, top, width, height){
        var bounds = this.bounds();
        return (left >= 0) && (top >= 0) && (left+width <= bounds.width) && ( top+height <= bounds.height);
      }
    }]
  }
}

function dynaRectFactory($document) {
  return {
    restrict: 'E',
    scope: {
      drTop:'=',
      drLeft:'=',
      drWidth:'=',
      drHeight:'='
    },
    transclude: true,
    require: '^^templateCanvas',
    link: function(scope, element, attr, ctrl, transcludeFn) {
      var transcludedContent;
      var transclusionScope;
      var bounds = ctrl.bounds();
      var startX = 0, startY = 0, x = bounds.left + scope.drLeft, y = bounds.top + scope.drTop;
      element.addClass('dyna-rect')
      element.css({
        position: 'absolute',
        display: 'block',
        width: scope.drWidth+'px',
        height: scope.drHeight+'px',
        top: y+'px',
        left: x+'px'
      });

      transcludeFn(function(clone, scope) {
        element.append(clone);
        transcludedContent = clone;
        transclusionScope = scope;
      });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        //event.preventDefault();   but it prevents contenteditable to work
        startX = event.screenX - x;
        startY = event.screenY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      scope.$on("$destroy", function() {
        transcludedContent.remove();
        transclusionScope.$destroy();
      });

      function mousemove(event) {
        var dy = event.screenY - startY;
        var dx = event.screenX - startX;
        if (ctrl.checkBounds(dx - bounds.left,dy - bounds.top, scope.drWidth, scope.drHeight)){
          x = dx; y = dy;
          element.css({
            top: y + 'px',
            left:  x + 'px'
          });
        }
      }

      function mouseup() {
        scope.$apply(function(){
          scope.drLeft = x - bounds.left;
          scope.drTop = y - bounds.top;
        });

        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}


function getOffsetRect(elem) {
  var box = elem.getBoundingClientRect()
  var body = document.body
  var docElem = document.documentElement
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
  var clientTop = docElem.clientTop || body.clientTop || 0
  var clientLeft = docElem.clientLeft || body.clientLeft || 0
  var top  = box.top +  scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft
  return { top: Math.round(top), left: Math.round(left), height: box.height, width: box.width }
}
