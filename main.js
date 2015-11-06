if (Meteor.isClient) {
    Tracker.autorun(function () {
        if (Meteor.userId()) {
            dashboards = Meteor.subscribe('user-dashboards');
        }
        current_widgets = Meteor.subscribe('current_widgets', Session.get(CURRENT_DASHBOARD));
        images = Meteor.subscribe('user-images', Session.get(CURRENT_DASHBOARD));
        if (!Meteor.userId()) {
            current_widgets.stop();
            images.stop();
            if (typeof dashboards !== 'undefined') {
                dashboards.stop();
            }

            if(Dashboards.find(Session.get(CURRENT_DASHBOARD)).count()<1){
                FlowRouter.go('/');
            }

        }
    });

    //TODO use Template.autorun
    Template.body.rendered = function () {
        Tracker.autorun(function () {
            var dashboard = Dashboards.find({_id: Session.get(CURRENT_DASHBOARD)}).fetch();
            if (dashboard[0] && Images.find().count() > 0 && Images.findOne(dashboard[0].background)) {
                $('body').css('background-image', 'url(' + Images.findOne(dashboard[0].background).url() + ')');
            } else if(dashboard[0] && dashboard[0].select_background){
                $('body').css('background-image', 'url(' + dashboard[0].select_background + ')');
            } else {
                $('body').css('background-image', '');
            }
        });
    };
    Accounts.onLogin(function () {
        if (!Session.get(CURRENT_DASHBOARD)) {
            var home_dashboard = Dashboards.findOne({
                ownerid: Meteor.userId(), home: true
            });
            if (!home_dashboard) {
                home_dashboard = Dashboards.findOne({
                    ownerid: Meteor.userId()
                });
                Dashboards.update(home_dashboard._id, {
                    $set: {home: 1}
                });
            }
            FlowRouter.go('/g/' + home_dashboard._id);
        }
    });
}