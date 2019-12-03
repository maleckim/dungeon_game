let charStats = {
    'con': null,
    'str': null,
    'int': null,
    'snk': null,
    'dex': null,
    'luck': 1,

}

let charAlignment = {
    'good': null,
    'bad': null,
    'weird': null
}

let responses = {
    'wiseMan1': `<p>That's very strange, ol matty cat hasnt had a visitor in some time now. I wont keep you long, I think its best if you just get out there and have a look for yourself.</p>`,
    'wiseMan2': `<p>Ahh yes, a man of culture. Anyway this is was not a good time for you to show up. Theres not much I can do to explain, youll just have to go out and have a look.</p>`,
    'wiseMan3': `<p> I used to play this game where I would take 3 then see if i could... nevermind, there is pressing matters at hand...but can i have one? </p>`
}

let answers = {

    'wiseAnswer1': `<div class = 'responses'>
    <label>You:
            <input list="reply" class ='reply' /></label>
            <datalist id="reply">
              <option  value="1) You're right, point me in the right direction">
              <option  value="2) I don't think I want to help you">
              <option  value="3) Whatever lets do it">
            </datalist> 
            <button type='button' class ='response'>talk</button>

</div>`,

    'wiseAnswer2': `<div class = 'responses'>
<label>You:
        <input list="reply" class ='reply' /></label>
        <datalist id="reply">
        <option  value="1) You're right, point me in the right direction">
        <option  value="2) I don't think I want to help you">
        <option  value="3) Whatever lets do it">
        </datalist> 
        <button type='button' class ='response'>talk</button>

</div>`,

    'wiseAnswer3': `<div class = 'responses'>
    <label>You:
            <input list="reply" class ='reply' /></label>
            <datalist id="reply">
              <option  value="1) I dont think thats a good idea, I'm going to go check things out">
              <option  value="2) sure">
              <option  value="3) none left, imma head out">
            </datalist> 
            <button type='button' class ='response'>talk</button>

</div>`
}

let inventory = {
    'map': true,
}

let mapper = [
    ['x', 'x', 'x', 'X'],
    ['x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x'],
    ['0', 'x', 'x', 'x']
]




let purse = 0;
let equip = null;
let answersCount = 1;
let encounter = null;
let currentHealth = null;
let mAttack = null;
let pAttack = null;

let currentX = [3];
let currentY = [0];

function gameOver() {
    alert('you killed the dungeon master you bastard');
    window.location.reload();
}

function startGame() {
    $('.start').on('click', function (e) {
        $('.startGame').hide();
        $('.characterCreate').show();
    })
}

function stats() {

    $('.stats').on('click', function (e) {
        total = parseInt($('#con').val()) + parseInt($('#str').val()) + parseInt($('#int').val()) + parseInt($('#snk').val()) + parseInt($('#dex').val());
        $('.remain').html(`You've used ${total} of your 20 points`)
        charStats['con'] = parseInt($('#con').val())
        charStats['str'] = parseInt($('#str').val())
        charStats['int'] = parseInt($('#int').val())
        charStats['snk'] = parseInt($('#snk').val())
        charStats['dex'] = parseInt($('#dex').val())

        if (total > 20) {
            alert('only 20 please')
        } else if (total < 20) {
            alert('probably dont want to start with a handicap')
        } else {
            $('.characterCreate').hide();
            $('.firstEncounter').show();
            $('.status').show();

        }

    })

}

let wiseCount = 0;

function talkToWiseMan() {
    setting = '.wiseAnswer'
    encounter = '.firstEncounter'

    $('.firstEncounter').on('click', '.response', function (e) {
        reply = $('.reply').val();
        replyNum = reply[0];
        reply = responses[`wiseMan${replyNum}`]

        if (wiseCount < 1) {
            response(setting, reply);
            generateNewResponses(setting.slice(1), replyNum, encounter);
            console.log(wiseCount);
            wiseCount++;
        } else {
            (replyNum == 2 ? gameOver() : nextEncounter())
        }

    })

}

function showStats() {
    currentHealth = charStats['con'] * 3
    equip = 'Ol\' Rusty'
    $('.status').html(`<ul><li>HP:${currentHealth}</li> <li>Money:${purse}</li><li>Weapon:${equip}</ul>`)
    // $('.status').html(`<ul><li>Constitution:${charStats['con']}</li> <li>Strength:${charStats['str']}</li> <li>Intellect:${charStats['int']}</li> <li>Sneak:${charStats['snk']}</li> Dexterity:${charStats['dex']}`)
}

function response(setting, reply) {

    $(setting).html(`${reply}`)

}



function generateNewResponses(setting, replyNum, encounter) {
    $('.responses').remove();
    $(encounter).append(answers[`${setting}${replyNum}`])

}

function nextEncounter() {
    $('.firstEncounter').hide();
    $('.openWorld').show();
    alert('the strange man left you with a map, coins and a rusty dagger')
    purse = purse + 100;
    inventory['Ol rusty'] = true;
    showStats();
}

function cont() {
    $('.continue').on('click', function (e) {
        $('.continue').hide();
        $('.storyLine').hide();
        $('.charHud').show();
    })
}

function charHud() {
    $('.inventory').on('click', function (e) {
        let x = Object.keys(inventory)
        alert(x)
    })

    for (let i = 0; i < mapper.length; i++) {
        $('.mapDiv').append(`${mapper[i]}<br>`)
    }

    if (currentX == 0 && currentY == 3) {
        alert('trouble!')
    }


    $('.up').on('click', function (event) {

        mapper[currentX][currentY] = 'x';
        currentX = (currentX != 0 ? currentX - 1 : currentX)
        currentY = currentY;
        mapper[currentX][currentY] = '0'
        updateMap();
    })

    $('.right').on('click', function (event) {
        mapper[currentX][currentY] = 'x';
        currentX = currentX;
        currentY = (parseInt(currentY) != 3 ? parseInt(currentY) + 1 : currentY)

        mapper[currentX][currentY] = '0'
        updateMap();
    })

    $('.left').on('click', function (event) {
        mapper[currentX][currentY] = 'x';
        currentX = currentX;
        currentY = (parseInt(currentY) != 0 ? parseInt(currentY) - 1 : currentY)

        mapper[currentX][currentY] = '0'
        updateMap();
    })

    $('.down').on('click', function (event) {

        mapper[currentX][currentY] = 'x';
        currentX = (currentX != 3 ? currentX + 1 : currentX)
        currentY = currentY;
        mapper[currentX][currentY] = '0'
        updateMap();
    })

}


function updateMap() {
    $('.mapDiv').html('');
    for (let i = 0; i < mapper.length; i++) {
        $('.mapDiv').append(`${mapper[i]}<br>`)
    }
    monsterFight();
}

function monsterFight() {
    if (currentX == 0 && currentY == 3) {
        alert('Weirdie Encounter!')
        $('.battle').show();
        $('.talk').show();
        $('.fight').show();
        $('.talk').on('click', function (e) {
            alert('he doesnt seem friendly.. you may have to fight this one')
        })

        $('.fight').on('click', function (e) {
            $('.enemy').html('');
            $('.fighter').show();
            $('.pound').show();
            $('.enemy').show();
            $('.enemy').append(`Health:${weirdieStats['health']} Attack:${weirdieStats['attack']} Defense:${weirdieStats['defense']}`)
        })

        $('.pound').on('click', function (e) {
            x = $('.fighter').val();

            if (x == 'Use a magic attack') {
                let x = weirdieStats['health'];
                mAttack = charStats['int'] * 2
                
                  
            }else if( x == 'Use a physical attack'){
                pAttack = charStats['str'] * 1.5
            }
        })
    }

    


}

let weirdieStats = {
    'health': 35,
    'attack': 6,
    'defense':10
}








function domHold() {
    $(monsterFight);
    $(startGame);
    $(stats);
    $(talkToWiseMan);
    $(cont);
    $(charHud);



}

$(domHold);