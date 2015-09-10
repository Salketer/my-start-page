Gridfully = {};
var loadedApis = {};
Gridfully.getGoogleAPI = function (api_name, version, options) {
    if(!loadedApis[api_name]){
        var self = this;
        if (typeof google === 'undefined') {
            $.ajax({
                url: 'http://www.google.com/jsapi',
                success: function () {
                    self.getGoogleAPI(api_name, version, options);
                },
                cache: true,
                dataType: 'script',
                method:'get'
            });
            return true;
        } else {
            google.load(api_name, version, options);
        }
        loadedApis[api_name]=true;
    }
};