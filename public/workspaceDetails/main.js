var source = $('#details-template').html();
var template = Handlebars.compile(source);

var array = [];
var workspotDetails = {  
    "_id":"5a6726247a2f3ff46530c02e",
    "created_at":"2018-01-23T12:10:12.943Z",
    "updated_at":"2018-01-23T12:10:12.943Z",
    "description":{  
       "hasFood":true,
       "isFree":true,
       "isDogFriendly":false,
       "isQuiet":false,
       "type":"Coffee Shop",
       "websiteLink":"https://www.google.co.il/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiTwfXCg-7YAhWHERQKHRVjAXMQFggnMAA&url=http%3A%2F%2Fwww.kafe.co.il%2F&usg=AOvVaw2sxUuHygKu22U8d2Hq1s2w",
       "hours":"09:00-20:00 weekdays",
       "text":"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, commodi corporis eligendi eos in magni maiores minima molestiae necessitatibus, neque nobis odio officia provident reiciendis, sed sint soluta voluptatem voluptatibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, commodi corporis eligendi eos in magni maiores minima molestiae necessitatibus, neque nobis odio officia provident reiciendis, sed sint soluta voluptatem voluptatibus?",
       "_id":"5a6726247a2f3ff46530c032"
    },
    "photo":"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/275px-A_small_cup_of_coffee.JPG",
    "address":{  
       "text":"Some Street 7, Tel Aviv",
       "longitude":32,
       "latitude":35,
       "_id":"5a6726247a2f3ff46530c031"
    },
    "name":"some place",
    "__v":0,
    "rating":[  
       {  
          "created_at":"2018-01-23T12:10:12.942Z",
          "updated_at":"2018-01-23T12:10:12.942Z",
          "num":4,
          "text":"This Place is great",
          "_id":"5a6726247a2f3ff46530c030"
       },
       {  
          "created_at":"2018-01-23T12:10:12.943Z",
          "updated_at":"2018-01-23T12:10:12.943Z",
          "num":7,
          "text":"This Place is ok",
          "_id":"5a6726247a2f3ff46530c02f"
       }
    ]
 }

 for (var i =0; i<workspotDetails.rating.length; i++) {
        workspotDetails.rating[i].star_off_1 = workspotDetails.rating[i].num == 1;
        workspotDetails.rating[i].star_off_2 = workspotDetails.rating[i].num <= 2;
        workspotDetails.rating[i].star_off_3 = workspotDetails.rating[i].num <= 3;
        workspotDetails.rating[i].star_off_4 = workspotDetails.rating[i].num <= 4;
        workspotDetails.rating[i].star_off_5 = workspotDetails.rating[i].num <= 5;

     }
 
var newHTML = template(workspotDetails);

$('.workspot_details').append(newHTML);

