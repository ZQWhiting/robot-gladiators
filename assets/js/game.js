// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "Lose" - Player robot's health is zero or less

// RNG Function
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}
// Set Name Function
var getPlayerName = function() {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}
// Player Object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};
// Enemy Object
var enemyInfo = [
    {
        name: "Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// startGame Function
var startgame = function () {
    // Player Reset
    playerInfo.reset();
    // Game Start/Loop
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            // Round
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // New Enemy & Stats
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            // Fight!
            fight(pickedEnemyObj);
            // Shop!
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // Confirm
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        }
    }
    // Play again
    endGame();
};
// EndGame
var endGame = function () {
// Win or Lose?
    // Win + Score
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    // Lose
    else {
        window.alert("You've lost your robot in battle.");
    }
    // Play again?
    var playAgainConfirm = window.confirm("Would you like to play again?");
    // Play
    if (playAgainConfirm) {
        startgame();
    }
    // End
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
//Fight
var fight = function(enemy) {
    while (enemy.health > 0 && playerInfo.health > 0) {
        // Fight or Skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // Skip & Penalty
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                // Money Penalty
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money)
                break;
            }
        }
    // Fight!
        // Player attacks Enemy
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );
    // Enemy's health
        // Dead
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            // Award player money for winning
            playerInfo.money = playerInfo.money + 20;
            break;
        }
        // Alive
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        // Enemy attacks Player
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );
    // Player's health
        // Dead
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }
        // Alive
        else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};
//Shop
var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        // Refill Health
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            //shop(); // Multiple Buy Option
            break;
        // Upgrade Attack
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            //shop(); // Multiple Buy Option
            break;
        // Leave Shop
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        // Error
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

// start the game when the page loads
startgame();