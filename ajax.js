// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Javascript helper function for URKUND plugin
 *
 * @package   plagiarism-urkund
 * @copyright 2014 Dan Marsden <Dan@danmarsden.com>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

M.plagiarism_unplag = {};

M.plagiarism_unplag.init = function(Y, contextid) {

    var track_progress = function(Y, row, contextid) { 
        var rval = row.getAttribute('file_id');
      
        var parentdiv = row.ancestor('div');
        var url = M.cfg.wwwroot + '/plagiarism/unplag/track.php';
        var valid = '<span id="receivervalid" class="pathok">&#x2714;</span>';
        var invalid = '<span id="receivervalid" class="patherror">&#x2718;</span>';
        var config = {
            method: 'get',
            context: this,
            sync: false,
            data : {
                'sesskey' : M.cfg.sesskey,
                'cid' : rval,
                'c': contextid
            },
            on: {
                success: function(tid, response) {
                    var jsondata = Y.JSON.parse(response.responseText);
                     existing = Y.one('.un_progress_val');
                     
                    if(jsondata.progress == 100){
                        clearInterval(M.plagiarism_unplag.interv);
                        existing.setHTML(jsondata.progress+'% <a href="">'+jsondata.refresh+'</a>');
                    }
                    else{
                        existing.setHTML(jsondata.progress+'%');
                        
                    }
                    


                },
                failure: function(tid, response) {
                   
                }
            }
        };
        Y.io(url, config)
    }
  
    var row = Y.one('.un_progress');
    // Validate existing content.
    M.plagiarism_unplag.interv = setInterval(function(){
     
       track_progress(Y, row, contextid);
    }, 60000);
   
}