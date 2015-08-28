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
    //TODO add google username capture

    //TODO add twitter username capture

    return userDoc;
});