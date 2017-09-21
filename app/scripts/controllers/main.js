'use strict';

/**
 * @ngdoc function
 * @name muzicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the muzicApp
 */
angular.module('muzicApp').controller('MainCtrl', function ($rootScope, $scope) {

    $('.ui.dropdown').dropdown();        

    $scope.songList = [
        {
            id: "1",
            title: "Coming back to Life",
            artist: "Pink Floyd",
            cover_art_url: "http://www.billboard.com/files/styles/900_wide/public/media/Pink-Floyd-Dark-Side-of-the-Moon-album-covers-billboard-1000x1000.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "2",
            title: "Comfortably numb",
            artist: "Pink Floyd",
            cover_art_url: "https://s-media-cache-ak0.pinimg.com/originals/65/0e/11/650e11af0608196605b22874167cb01d.jpg",
            url: "http://mp3.progarchives.com/StreamMP3.asp?id=4351",
            rating: 5
        },
        {
            id: "3",
            title: "Fix you",
            artist: "Coldplay",
            cover_art_url: "https://qph.ec.quoracdn.net/main-qimg-b8c2e29281ae366b5b48ed773428bb05-c",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "4",
            title: "Hey Jude",
            artist: "Beatles",
            cover_art_url: "http://ultimateclassicrock.com/files/2012/03/Beatles-Hey-Jude-adobe1.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "5",
            title: "Stairway to Heaven",
            artist: "Led Zepplin",
            cover_art_url: "http://img03.deviantart.net/0a56/i/2011/101/7/7/zeppelin_stairway_to_heaven_by_aerokay-d3bcfj0.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "6",
            title: "Romeo Juliet",
            artist: "Dire Straits",
            cover_art_url: "http://www.efeeme.com/wp-content/uploads/dire-straits-15-10-14-c.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "7",
            title: "Here comes the Sun",
            artist: "George Harrison",
            cover_art_url: "https://i.ytimg.com/vi/24Y1cxJQ43U/maxresdefault.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        },
        {
            id: "8",
            title: "Bohemian Rhapsody",
            artist: "Queen",
            cover_art_url: "https://queenvinyls.files.wordpress.com/2008/04/image-epson-225.jpg",
            url: "http://www.gracehalabi.com/06_-_Coming_Back_To_Life.mp3",
            rating: 4
        }        
    ];        

    $scope.doComplete = function() {
        $('.image').dimmer({ on: 'hover'});
        $('.ui.rating').rating();        
    };        

    $scope.getRating = function(num) {
        return new Array(num);
    };      
})
.directive('myPostRepeatDirective', function() {
    return function(scope, element, attrs) {
      if (scope.$last) {
            scope.$eval('doComplete()');
      }
    };
}).directive('playlistLoadCompleteDirective', function() {
    return function(scope, element, attrs) {
        if (scope.$last) {
            scope.$eval('playlistLoadComplete()');
        }
    };
});