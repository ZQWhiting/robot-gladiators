// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "Lose" - Player robot's health is zero or less

// RNG Function
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}
// Set Name Function
var getPlayerName = function () {
    var name = "";
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}
// Fight or Skip Function
var fightOrSkip = function () {
    // Fight or Skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // Conditional recursive function call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    promptFight = promptFight.toLowerCase();
    // Condition is true = Skip & Penalty
    if (promptFight === "skip") {
        // Confirm skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // Money Penalty
            playerInfo.money = Math.max(0, playerInfo.money - 10);

            return true;
        }
        else {
            fightOrSkip();
        }
    }
    else if (!(promptFight === "fight")) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }
    else return false;
}
// Player Object
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
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

// startGame Function // For Loop
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

    // Check for high score.
    var highScore = localStorage.getItem("highscore");
    highScore = highScore || 0;
    // Win or Lose?
    // Win
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        // High Score
        if (playerInfo.money > highScore) {
            localStorage.setItem("highscore", playerInfo.money);
            localStorage.setItem("name", playerInfo.name);
            alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
        }
        else {
            alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
        }
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
// Fight
var fight = function (enemy) {
    // Who goes first?
    var isPlayerTurn = true;
    if (Math.random() >= 0.5) {
        isPlayerTurn = false;
    }
    // loop while both robots are alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        if (isPlayerTurn) {
            // fightOrSkip
            if (fightOrSkip()) {
                break;
            }
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
        } else {
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
        // switch turn order
        isPlayerTurn = !isPlayerTurn;
    }
};
// Shop
var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        // Refill Health
        case 1:
            playerInfo.refillHealth();
            //shop(); // Multiple Buy Option
            break;
        // Upgrade Attack
        case 2:
            playerInfo.upgradeAttack();
            //shop(); // Multiple Buy Option
            break;
        // Leave Shop
        case 3:
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