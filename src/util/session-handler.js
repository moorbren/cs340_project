global.sessionTable = new Object();


const session_timeout = 12 * 60 * 60; //12 hours in seconds

/**
 * This lookups a sessior object in the table and returns true if it is, otherwise returns false. 
 * 
 * @param username Username of session
 * @param uuid ID of session. 
 */ 
exports.isValidSession = function(uuid, username){

    //pulling username out of the table by inserting the uuid as a key
    var session = global.sessionTable[uuid];

    //seeing if username matches the session
    if(session && session.username === username){
        if(session.time > session_timeout){
            delete global.sessionTable[uuid];
            return false;
        }

        return true;
    }

    return false;
};

exports.addSession = function(uuid, new_username){
    global.sessionTable[uuid] = {
        username: new_username, 
        time: new Date().getTime()
    };
}

exports.removeSession = function(uuid, username) {
    //pulling username out of the table by inserting the uuid as a key
    var session = global.sessionTable[uuid];
    
   //seeing if username matches the session
    if(session && session.username === username){
        delete global.sessionTable[uuid];
    }
}

