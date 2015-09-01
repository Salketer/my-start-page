Accounts.onCreateUser(function(options,userDoc){
    Dashboards.insert({
        name:'My First Dashboard',
        ownerid:userDoc._id,
        home:true
    });
    if(userDoc.services.facebook){
        if(userDoc.services.facebook.name){
            userDoc.username = userDoc.services.facebook.name;
        }
    }
    if(userDoc.services.google){
        if(userDoc.services.google.name){
            userDoc.username = userDoc.services.google.name;
        }
    }

    userDoc.profile = {name:userDoc.username};

    return userDoc;
});

Accounts.config({
    sendVerificationEmail:true
});
Accounts.emailTemplates.siteName = "Gridfully";
Accounts.emailTemplates.from = "no-reply@gridfully.net";


Accounts.emailTemplates.verifyEmail.subject = function (user) {
    return "Welcome to Gridfully, " + user.profile.name;
};
Accounts.emailTemplates.verifyEmail.text = function (user, url) {
    return "Hello "+user.profile.name+",\n\n"
        + " To activate your account, simply click the link below:\n\n"
        + url + "\n\n"
        + "Thank you and see you soon on Gridfully";
};
//Accounts.emailTemplates.resetPassword.subject = function (user) {
//    return "Welcome to Awesome Town, " + user.profile.name;
//};
//Accounts.emailTemplates.resetPassword.text = function (user, url) {
//    return "Hello "+user.profile.name+",\n\n"
//        + " To activate your account, simply click the link below:\n\n"
//        + url + "\n\n"
//        + "Thank you and see you soon on Gridfully";
//};