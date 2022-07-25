var request = require("request");
var auth = require("fs").readFileSync("auth.txt", "utf8");

setInterval(() => {
    request.post("https://4ae9.playfabapi.com/Client/ExecuteCloudScript", { body: `{
        "FunctionName":"RewardProcess",
        "FunctionParameter":null,
        "RevisionSelection":"Live",
        "SpecificRevision":null,
        "GeneratePlayStreamEvent":false
    }`, headers:{ "User-Agent": "UnityEngine-Unity; Version: 2018.4.26f1", "X-ReportErrorAsSuccess": true, "X-PlayFabSDK": "UnitySDK-2.20.170411", "X-Authorization": auth, "Content-Type": "application/json" } }, function(error, response, body) {
        if (error) {
            console.log(error);
        }
        else {
            var d_data = JSON.parse(body);
            console.log(d_data.data.Logs);
        }
    });
}, 3000);