var request = require("request");
var auth = require("fs").readFileSync("auth.txt", "utf8");
var bd_token = "";
var last_money = 0; // Fix Double Anjg
var bd_c_game = `{
    "FunctionName":"PlayCareer",
    "FunctionParameter":{
        "cities":[
            "PBR",
            "JMB",
        ]
    },
    "RevisionSelection":"Live",
    "SpecificRevision":null,
    "GeneratePlayStreamEvent":false
}`;

setInterval(() => {
    
    request.post("https://4ae9.playfabapi.com/Client/ExecuteCloudScript", { body: bd_c_game, headers:{ "User-Agent": "UnityEngine-Unity; Version: 2018.4.26f1", "X-ReportErrorAsSuccess": true, "X-PlayFabSDK": "UnitySDK-2.20.170411", "X-Authorization": auth, "Content-Type": "application/json" } }, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        else {
            var d_data = JSON.parse(body);
            bd_token = d_data.data.FunctionResult.careerSession.token;
            request.post("https://4ae9.playfabapi.com/Client/ExecuteCloudScript", { body: `{
                "FunctionName":"FarePayment",
                "FunctionParameter":{
                    "records":[
                        {
                            "Key":{
                                "sourceCity":"PBR",
                                "destinationCity":"JMB",
                                "routePassed":[
                                    "JMB",
                                    "PBR"
                                ],
                                "activityRewards":null
                            },
                            "Value":70
                        }
                    ],
                    "bonus":true,
                    "careerToken":"${bd_token}",
                    "activityRewardToken":{
                        "rewards":[
                            
                        ]
                    }
                },
                "RevisionSelection":"Live",
                "SpecificRevision":null,
                "GeneratePlayStreamEvent":false
            }`, headers:{ "User-Agent": "UnityEngine-Unity; Version: 2018.4.26f1", "X-ReportErrorAsSuccess": true, "X-PlayFabSDK": "UnitySDK-2.20.170411", "X-Authorization": auth, "Content-Type": "application/json" } }, function(error, response, body) {
                if (error) console.log(error);
                else {
                    request.post("https://4ae9.playfabapi.com/Client/ExecuteCloudScript", { body: `{
                        "FunctionName":"GetCash",
                        "FunctionParameter":null,
                        "RevisionSelection":"Live",
                        "SpecificRevision":null,
                        "GeneratePlayStreamEvent":false
                    }`, headers:{ "User-Agent": "UnityEngine-Unity; Version: 2018.4.26f1", "X-ReportErrorAsSuccess": true, "X-PlayFabSDK": "UnitySDK-2.20.170411", "X-Authorization": auth, "Content-Type": "application/json" } }, function(error, response, body) {
                        if (error) console.log(error);
                        else {
                            var d_data = JSON.parse(body);
                            if (d_data.data.FunctionResult != last_money) {
                                console.log("Uang Bertambah Sebanyak 210K");
                                console.log(`BUSSID Money ${d_data.data.FunctionResult.toLocaleString()}`);
                            }
                            last_money = d_data.data.FunctionResult;
                        }
                    });
                }
            });
            
        }
    });
}, 2500);

//Error handling
process.on('uncaughtException', function (err) {

});