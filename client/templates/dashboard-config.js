Template.dashboardConfig.helpers({
	currentSchema : function() {
		return new SimpleSchema({
            name : {
                type : String,
                label : "Grid Title",
                max:200
            },
            //background : {
            //    type : String,
            //    label : "Background Image",
            //    optional:true,
            //    autoform : {
            //        afFieldInput : {
            //            type : "fileUpload",
            //            collection : 'Images',
            //            accept: 'image/*'
            //        }
            //    }
            //},
            select_background:{
                type : String,
                label : "Background Image",
                optional:true,
                autoform : {
                    afFieldInput : {
                        type : "picture-select",
                        class: '',
                        'img-class':'img-thumbnail modal-select-thumb',
                        options:[
                            {label:'Background 1',value:'/images/grid_backgrounds/homeland.svg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'},
                            {label:'Background 1',value:'http://i.ytimg.com/vi/2XX5zDThC3U/maxresdefault.jpg'}
                        ]
                    }
                }
            }
		});
	},
	currentDocument : function() {
		return Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
	}
});
Template.dashboardConfig.rendered = function() {
	$('#backgroundConfig').modal({
		show : false
	});
};