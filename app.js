var request = require('request');
var parser = require('xml2js').Parser();

// your azure translator text API key
var azureClientSecret = '';

// default category
//var category =  'general';

// your category id from a deployed translator hub project
var category =  '';

// Text to be translated
var text = 'Ceci est un test';

var ilang = 'fr';
var olang = 'es';

// get Azure Cognitive Services Access Token for Translator APIs
request.post(
    {
        url: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
        headers: {
            'Ocp-Apim-Subscription-Key': azureClientSecret
        },
        method: 'POST'
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var accessToken = body;

            var url = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?' +
                'text=' +encodeURI(text)  +
                '&contentType=text/html' +
                '&from=' + ilang +
                '&to=' + olang +
                '&category=' + category;

            request.get({
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    method: 'GET'
                },

                function (error, response, body) {

                    parser.parseString(body, function(err, result){
                        console.log(result.string._);
                    });
                }
            );

        }
    }
);
