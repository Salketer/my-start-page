IN_MODIFICATION_STATE = 'started_modifications';
Session.setDefault(IN_MODIFICATION_STATE, false);

CURRENT_DASHBOARD = 'dashboard_displayed';
Template.appBody.helpers({
    gridname: function () {
        var dashboard = Dashboards.findOne(Session.get(CURRENT_DASHBOARD));
        if (!dashboard) {
            return 'Select a grid';
        }
        return dashboard.name;
    },
    hasGrids: function () {
        var dashboard = Dashboards.findOne();
        return dashboard ? true : false;
    },
    user_dashboards: function () {
        var dashboards = Dashboards.find({ownerid: Meteor.userId()});
        return dashboards;
    },
    label: function(){
        label = {};
        if(this.public && this.ownerid === Meteor.userId()){
            label.class = 'public-text';
            label.text = 'Public';
        }else if(this.public && this.ownerid !== Meteor.userId()){
            label.class = 'favorite-text';
            label.text = 'Favorite';
        }else{
            label.class = 'private-text';
            label.text = 'Private';
        }
        return label;
    },
    dashboard_public: function () {
        if (Dashboards.find(Session.get(CURRENT_DASHBOARD)).count() > 0) {
            return Dashboards.find(Session.get(CURRENT_DASHBOARD)).fetch()[0].public == 1;
        }
    },
    gridlist_attr: function () {
        if (Meteor.userId()) {
            return {class: "dropdown"};
        }
        return {};
    },
    gridname_attr: function () {
        if (Meteor.userId()) {
            return {
                'class': "dropdown-toggle navbar-text",
                'data-toggle': "dropdown",
                'role': "button",
                'aria-haspopup': "true",
                'aria-expanded': "false"
            }
        } else {
            return {
                'class': "navbar-text"
            }
        }
    },
    user_is_owner: function () {
        return Dashboards.find({_id: Session.get(CURRENT_DASHBOARD), ownerid: Meteor.userId()}).count() > 0;
    },
    dashboard_view: function () {
        return Session.get(CURRENT_DASHBOARD) !== false;
    }

});
Template.appBody.events({
    'click #modification_toggle': function () {
        Session.set(IN_MODIFICATION_STATE, !Session.get(IN_MODIFICATION_STATE));
    },
    'click #change_background': function () {
        $('#backgroundConfigModal').modal('show');
    },
    'click #add_widget': function () {
        var $modal = $('#widgetAddModal');
        $modal.find('[data-toggle="tooltip"]').tooltip();
        $modal.modal('show');
    },
    'click #toggle_share': function () {
        var $modal = $('#shareToggleModal');
        $modal.modal('show');
    },
    'click #add_grid': function () {
        Dashboards.insert({
            name: 'My new grid',
            ownerid: Meteor.userId()
        }, function new_grid_callback(error, _id) {
            if (!error) {
                FlowRouter.go('/g/' + _id);
                $('#backgroundConfigModal').modal('show');
            }
        });
    }
});

Template.registerHelper('in_modification_state', function () {
    return Session.get(IN_MODIFICATION_STATE);
});
Template.registerHelper('momentFromNow', function (time) {
    return moment(time).fromNow();
});
Template.registerHelper('formattedDate', function (time) {
    return moment(time).format('LLLL');
});
Template.registerHelper('absoluteUrl', function (path) {
    return Meteor.absoluteUrl(path);
});