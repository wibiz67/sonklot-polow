/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/*
 * TERMS OF REPRODUCTION USE
 *
 * 1. Provide a link back to the original repository (this repository), as
 *      in, https://github.com/ohFRY/soundcloud-followers, that is well-visible
 *      wherever the source is being reproduced.  For example, should you
 *      display it on a website, you should provide a link above/below that
 *      which the users use, titled something such as "ORIGINAL AUTHOR".
 *
 * 2. Retain these three comments:  the GNU GPL license statement, this comment,
 *      and that below it, that details the author and purpose.
 *
 * Failure to follow these terms will result in me getting very angry at you
 * and having your software tweaked or removed if possible.  Either way, you're
 * still an idiot for not following such a basic rule, so at least I'll have
 * that going for me.
 */

/*
 * NOTE:  This is all procedural as hell because prototypes and any
 *          OOP techniques in Javascript are stupid and confusing.
 *
 * @author  Fry Falavel
 *
 * @version 0.1
 */
/*
 *
 * USAGE:   run this script when you are on https://soundcloud.com/{your username}/following
 */
(function () {


    function getUsername(){
        var a = location.pathname.split("/");
        if ( a.length > 1 ) { return a[1]; }
        return null;
    }

    function getMyTab(tab, offset){
    	var tabb;
    	$.ajax({
        	url: 'https://api.soundcloud.com/users/' + SoundcloudUsername + '/followers.json?limit=199&offset='+offset+'&client_id=c431d1033b896faa10f2f5c7eeb8bb9e',//2062cfeb34e8085370a13162c547f4cc',
            dataType: 'json',
            async: false,
            success: function(data) {
                tabb = $.merge(tab, data);
            }
        });
        return tabb;
    }

    function getMyTabs(){
        var flag = 0;
        var tabbb = [];

        while (flag < SoundcloudFollowers) {
            tabbb = getMyTab(tabbb, flag);
            flag = flag + 198; //limit 198 because of API limit in the results
        }
        return tabbb;
    }

    function findUnfollowers() {
        
        var thearray = $('.userBadge__usernameLink').text();

        $('.usersList__item').each(function(key, value) {
            var found = false;
            // browse list of followers
            for(var i = 0; i < tab.length; i++) {
                

                if(tab[i].username == $('.userBadge__usernameLink')[key].text) found = true;
            
            }
            if (!found) {
                $('.sc-truncate', value).append('<span style="color:#F33;size:small">not following back</span>');
            }
        });

    }


    var SoundcloudUsername = getUsername();
    var tab;
    var SoundcloudFollowers;
    $.ajax({
        url: 'https://api.soundcloud.com/users/'+SoundcloudUsername+'.json?&client_id=c431d1033b896faa10f2f5c7eeb8bb9e',//2062cfeb34e8085370a13162c547f4cc',
        dataType: 'json',
        async: false,
        success: function(data) {
            SoundcloudFollowers = data.followers_count;
        }
    });
    
    
    
    setTimeout(function() {
        tab = getMyTabs();

        if(tab.length >= SoundcloudFollowers) {
            
            setTimeout(findUnfollowers, 1000);
        }
    } ,1);

//    var worker = new Worker(setTimeout(findUnfollowers, 1000));


})();