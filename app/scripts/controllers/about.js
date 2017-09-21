'use strict';

/**
 * @ngdoc function
 * @name muzicApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the muzicApp
 */
angular.module('muzicApp').controller('AboutCtrl', function ($scope) {    

	var objectUrl;	

	$('#file-upload-progress').progress({ percent: 0 });

	$('.upload-btn').on('click', function () {
    	$('#upload-input').click();
    	$('#file-upload-progress').progress({ percent: 0 });
	});

	function setMetaData(files) {
		var metadata = {};		
		id3(files[0], function(err, tags) {
			// tags now contains your ID3 tags
			console.log(tags);
			// if(tags.album !== '') { metadata.album = tags.album; }
			// if(tags.artist !== '') { metadata.artist = tags.artist; }
			// if(tags.title !== '') { metadata.title = tags.title; }
			// if(tags.year !== '') { metadata.year = tags.year; }
			// if(tags.genre !== '') { metadata.genre = tags.genre; }
			metadata.album = tags.album || null;
			metadata.artist = tags.artist || null;
			metadata.title = tags.title || null;	
			metadata.year = tags.v1.year || '';
			metadata.genre = tags.v2.genre || null;
			
			objectUrl = URL.createObjectURL(files[0]);
    		$("#audio").prop("src", objectUrl);

    		$("#audio").on("canplaythrough", function(e){
			    var seconds = e.currentTarget.duration;
			    var duration = moment.duration(seconds, "seconds");
			    
			    var time = "";
			    var hours = duration.hours();
			    if (hours > 0) { time = hours + ":" ; }
			    
			    time = time + duration.minutes() + ":" + duration.seconds();
			    console.log(time);
			    metadata.duration = time;
			    console.log(metadata);
			    uploadStart(files, metadata);
			    URL.revokeObjectURL(objectUrl);
			});			
	  	});
	  	
	}

	function uploadStart(files, metadata) {

		var formData = new FormData();

		// loop through all the selected files and add them to the formData object
	    for (var i = 0; i < files.length; i++) {
	      var file = files[i];	    
	      // add the files to formData object for the data payload
	      formData.append('metadata', JSON.stringify(metadata));
	      formData.append('uploads[]', file, file.name);
	    }

	    $.ajax({
	      // url: 'http://localhost:3000/api/user/upload',
	      url: 'http://localhost/music-api/Authentication/upload',
	      type: 'POST',
	      data: formData,
	      processData: false,
	      contentType: false,
	      success: function(data){
	          console.log('upload successful!\n');
	          console.log(data);
	      },
	      xhr: function() {
	        // create an XMLHttpRequest
	        var xhr = new XMLHttpRequest();

	        // listen to the 'progress' event
	        xhr.upload.addEventListener('progress', function(evt) {

	          if (evt.lengthComputable) {
	            // calculate the percentage of upload completed
	            var percentComplete = evt.loaded / evt.total;
	            percentComplete = parseInt(percentComplete * 100);

	            // update the Bootstrap progress bar with the new percentage
	            // $('.progress-bar').text(percentComplete + '%');
	            // $('.progress-bar').width(percentComplete + '%');
	            $('#file-upload-progress').progress({ percent: percentComplete });

	            // once the upload reaches 100%, set the progress bar text to done
	            if (percentComplete === 100) {
	            	console.log('Done');
	              	// $('.progress-bar').html('Done');
	              	// alert('Done');	
	            }

	          }

	        }, false);

	        return xhr;
	      }
	    });
	}

	$('#upload-input').on('change', function(){	  
	  	var files = $(this).get(0).files;	

	  	if (files.length > 0){
	    // create a FormData object which will be sent as the data payload in the
	    // AJAX request	    		   	  	
	  		setMetaData(files);
	  		return;	    	  
	  	}
	});
});
