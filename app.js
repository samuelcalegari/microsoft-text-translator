var request = require('request');

var azureClientSecret = '';
var category =  'c3608a00-9933-4e6c-b0b8-3aea47aa1262_ARTSENT';
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
            var url = 'http://api.microsofttranslator.com/v2/Http.svc/Translate?' + 'text=' +encodeURI(text) + '&from=' + ilang + '&to=' + olang + '&category=' + category;
            console.log(url);

            request.get({
                    url: url,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    method: 'GET'
                },

                function (error, response, body) {
                console.log(body)
                }
            );

        }
    }
);
