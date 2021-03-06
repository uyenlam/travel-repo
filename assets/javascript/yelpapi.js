    function cb(data) {
        // console.log("cb: " + JSON.stringify(data));
        // console.log("==================cb data============");
        for (i = 0; i < 6; i++) {

            var businessDiv = $('<div class="businessDiv">');

            // Retrieves the Rating Data
            var busName = data.businesses[i].name;
            //console.log("Rating : "+ rating);
            var rating = data.businesses[i].rating;
            var phone = data.businesses[i].phone;
            var snippet = data.businesses[i].snippet_text;
            var isClosed = data.businesses[i].is_closed;

            // console.log(busName);
            // console.log(rating);
            // console.log(phone);
            // console.log(snippet);
            // console.log(isClosed);
            if (isClosed === "false") {
                var pClosed = $('<p class= "isClosed">').text("Its Closed Now !!");
            } else {
                pClosed = $('<p class= "isClosed">').text("Its Open Now !!");
            }

            // Creates an element to have the rating displayed
            var pOne = $('<p class= "business">').text(busName);
            var pThree = $('<p class= "snippet">').text("Recent Review:" + snippet);
            var pTwo = $('<p class= "phone">').text(phone);
            var pFour = $('<p class= "phone">').text(phone);
            var img = $('<img id="imgBus">');
            var img_url = data.businesses[i].image_url;
            // console.log("======= " + img_url);
            img.attr({
                'src': img_url
            });


            // Displays the rrating

            businessDiv.append(pOne);
            businessDiv.append(img);
            businessDiv.append(pThree);
            businessDiv.append(pTwo);

            var imgRat = $('<img id="ratingurl">');
            imgRat.attr({
                'src': data.businesses[i].rating_img_url,
            });
            businessDiv.append(imgRat);

            businessDiv.append(pFour);
            businessDiv.append(pClosed);
            $('.yelpBusiness').prepend(businessDiv);
        }
    }

    var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey: "Y6QjPZLYHJbMDYsEpHeMoA",
        consumerSecret: "xf8rW-beX_ZUmAr9obxI9xlzhhA",
        accessToken: "xpZ2l6Pp-9gkGFtWuJULv9maTfi9ibfE",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret: "__tuB-bp3QpqaVpHrn6jyFNqtEI",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };

    var terms = 'food';
    // var near = $('#autocomplete');
    var near = "Paris";
    // var near = $('#location-input');
    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };

    var parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action': 'https://api.yelp.com/v2/search',
        'method': 'GET',
        'parameters': parameters
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);

    $.ajax({
            'url': message.action,
            'data': parameterMap,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'cache': true
        })
        .done(function(data, textStatus, jqXHR) {
            // console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
            // console.log("***********jqhhr*********");
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
        });
