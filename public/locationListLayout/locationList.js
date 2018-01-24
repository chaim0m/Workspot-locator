let LocationList = function () {
  let $cards = $('.workspot-list');
  var temp = {
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

 let tempData = {
   name: temp.name,
   address: temp.address.text,
   type: temp.description.type
 }

function renderTest() {
  for(let i=0; i<11; i++) {
    _renderCards();
  }
}


  function _renderCards() {
   // $cards.empty();
    var source = $('#card-template').html();
    var template = Handlebars.compile(source);
      var newHTML = template(tempData);
      $cards.append(newHTML);
      
  }

  return {
    renderCards: renderTest
  }

}

let list = LocationList();

list.renderCards();
