/**
 * Created by ska on 2/21/16.
 */

angular.module('app', ['templateCanvas', 'editable'])
    .controller('TestController', ['$scope', testController]);

function testController($scope){
    $scope.props;
    $scope.template = {
        width: 1920,
        height: 1080,
        elements: [
            {
                id: 0,
                x: 0,
                y: 100,
                z: 50,
                width: 100,
                height: 200,
                text: "Sample text"
            },{
                id: 1,
                x: 10,
                y: 200,
                z: 40,
                width: 100,
                height: 200,
                text: "Sample text 2"
            },{
                id: 2,
                x: 100,
                y: 300,
                z: 150,
                width: 300,
                height: 200,
                text: "Sample text 3"
            }
        ]
    }
}