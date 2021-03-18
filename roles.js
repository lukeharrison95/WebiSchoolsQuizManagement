const AccessControl = require("accesscontrol");

const ac = new AccessControl();

exports.roles =(function(){
    ac.grant("student")
        .readAny("quiz")

    ac.grant("teacher")
        .extend("student")

    ac.grant("quizmaster")
        .extend("teacher")
        .resource("quiz").createAny().updateAny().deleteAny();

    return ac;
})();