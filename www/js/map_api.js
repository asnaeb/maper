/***
** map js api
***/

var deviceid = device.uuid;

var baseUri = "http://10.10.0.103:3000/v1/";

var errorCode = {
	"101": "Network error",
	"102": "User not exsit",
	"103": "Create game error",
	"104": "Get tasks error",
	"105": "Create task error",
	"106": "Finish task error",
	"900": "Unknown reason"
};

var succCode = {
	"201": "Login successful",
	"202": "Register successful",
	"203": "Create game successful",
	"204": "Get tasks successful",
	"205": "Create tasks successful",
	"206": "Finish task successful",
	"900": "Other"
};

var header = "";

var mapapi = {
	getUserName : function(){
		$.ajax({
        type:'POST',
        url: baseUri+'token',
        dataType:'json',
        data: {'uuid': deviceid},
        timeout: 5000,
        cache: true,
        async: true,
        success: function(data, textStatus, HRX){
            if (data){
            	if (data.error){
            		errorHandler("900", data.error);
            	}else {
            		succHandler("201", data, HRX);
            	}
            }else {
            	errorHandler("102");
            }
        },
    	error: function(err){
    			errorHandler("102");
    		}
    	});
	},

	regester : function(username){
		$.ajax({
	        type:'POST',
	        url: baseUri+'users/register',
	        dataType:'json',
	        data: {'uuid': deviceid, "username": username},
	        timeout: 5000,
	        cache: true,
	        async: true,
	        success: function(data){
	        	console.log(data)
	            if (data){
	            	if (data.error){
	            		errorHandler("900", data.error);
	            	}else {
	            		succHandler("202", data, HRX);
	            	}
	            }else {
	            	errorHandler("102");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},
	//key Authorization value "bearer uuid"
	createGame : function(gameName, description, reward, username){
		var param = {"game_name" : gameName,
					
					"description": description,
					"reward": reward,
					"username": username};
		$.ajax({
	        type:'POST',
	        url: baseUri+'games',
	        dataType:'json',
	        data: param,
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
	            		errorHandler("900", data.error);
	            	}else {
	            		succHandler("203", data);
	            	}
	            }else {
	            	errorHandler("103");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	getTasks : function(username, task){
		$.ajax({
	        type:'GET',
	        url: baseUri + username + "/" + task,
	        dataType:'json',
	        data: "",
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){//{'create':[], 'join':[]}
	            if (data){
	            	if (data.error){
	            		errorHandler("900", data.error);
	            	}else {
	            		succHandler("204", data);
	            	}
	            }else {
	            	errorHandler("104");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	createTask : function(game_name, task_name, description, reward, point, rule, type, end_time){
		var params = {
			"game_name":game_name,
			"task_name":task_name,
			"description":description,
			"reward":reward,
			"point":point,
			"rule":rule,
			"type":type,
			"end_time":end_time
		};
		$.ajax({
	        type:'POST',
	        url: baseUri+'tasks',
	        dataType:'json',
	        data: params,
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
	            		errorHandler("900", data.error);
	            	}else {
	            		succHandler("205", data);
	            	}
	            }else {
	            	errorHandler("105");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	},

	finishTask : function(task_name){
		$.ajax({
	        type:'PUT',
	        url: baseUri+'tasks/' + task_name,
	        dataType:'json',
	        data: "",
	        timeout: 5000,
	        cache: true,
	        async: true,
	        headers: {
	        	"Authorization" : "bearer " + deviceid
	        },
	        success: function(data){
	            if (data){
	            	if (data.error){
	            		errorHandler("900", data.error);
	            	}else {
	            		succHandler("206", data);
	            	}
	            }else {
	            	errorHandler("106");
	            }
	        },
	    	error: function(err){
	    			errorHandler("102");
	    		}
	    	});
	}

};

function succHandler(code, data, msg){
	console.log(data)
	switch (code){
		case "201" :
			break; 
		case "202" :
			break;
		case "203" :
			break;
		case "204" :
			break;
		case "205" :
			break;
		case "206" :
			break;
		default:
			break;
	}
}

function errorHandler(code, msg){
	console.log(msg)
	switch (code) {
		case "101" :
			break
		case "102" :
			break;
		case "103" :
			break;
		case "104" :
			break;
		case "105" :
			break;
		case "106" :
			break;
		default:
			break;
	}
}