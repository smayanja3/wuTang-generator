const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');


const names = {
    a: {
        first: [
            'Iron', 'Deadly', 'Ruthless', 'Midnight', 'Savage'
        ],
        last: [
            'Dragon', 'Assassin', 'Stallion', 'Bandit', 'Hammer'
        ]
    },
    b: {
        first: [
            'Shalion', 'Golden', 'Silent', 'Crimson', 'Wandering'
        ],
        last: [
            'Monk', 'Sword', 'Lotus', 'Crane', 'First'
        ]
    },
    c: {
        first: [
            'Cold', 'Phantom', 'Venom', 'Shadow', 'Grandmaster'
        ],
        last: [
            'Chessmaster', 'Rambo', 'Cipher', 'Viper', 'Scholar'
        ]
    }
}
/// we have not created this yet
function listTaker(list){ ///<- list === an array
    return list[Math.floor(Math.random() * list.length)] /// <- randomize a number out of this jawn

}
 // learning to make counts count how many times a,b,c show up and retutn the highest count wins

 function mostPicked(answered){ //<- only gives us ONE letter the winner
    const counts = {
        a: 0,
        b: 0,
        c: 0,
    };
    answered.forEach(function(answer){ ///<- this is not the moment 
        if(counts[answer] !== undefined){
            counts[answer] +=1 //<- count how many times each a,b,c comes in
        }
    });
    let winner = 'a';
    if(counts.b > counts[winner]) winner = 'b';
    if(counts.c > counts[winner]) winner = 'c';  //<- possible switch for later 
    return winner
 }


const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }else if(page == '/api'){
        const answer = [params.q1, params.q2, params.q3, params.q4, params.q5]
        const letter = mostPicked(answer)
        const group = names[letter]
        const name = `${listTaker(group.first)} ${listTaker(group.last)}`

        res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({name: name}));
    }
    else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);
// does not have to be 8000 but must be between 1-65535
