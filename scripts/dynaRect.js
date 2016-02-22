/**
 * Created by ska on 2/16/16.
 */

angular.module('dynaRect', []).directive('dynaRect', ['$document', dynaRectFactory]);

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
        link: function(scope, element, attr, ctrl, transcludeFn) {
            var transcludedContent;
            var transclusionScope;
            var startX = 0, startY = 0, x = scope.drLeft, y = scope.drTop;
            element.css({
                position: 'absolute',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
                cursor: 'pointer',
                display: 'block',
                width: scope.drWidth+'px',
                height: scope.drHeight+'px',
                top: scope.drTop+'px',
                left: scope.drLeft+'px'
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
                y = event.screenY - startY;
                x = event.screenX - startX;
                element.css({
                    top: y + 'px',
                    left:  x + 'px'
                });

            }

            function mouseup() {
                scope.$apply(function(){
                    scope.drLeft = x;
                    scope.drTop = y;
                });

                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    };
}

