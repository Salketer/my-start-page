if (Meteor.isClient) {
    Accounts.ui.config({
        passwordSignupFields: 'USERNAME_AND_EMAIL',
        requestOfflineToken: {
            google: false
        },
        requestPermissions: {
            facebook: ['user_friends']
        },
    })
}