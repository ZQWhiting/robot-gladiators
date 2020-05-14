// Game States
// "WIN" - Player robot has defeated all enemy robots
//      * Fight all enemy robots
//      * Defeat each enemy robot
// "Lose" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];

//StartGame
var startgame = function () {
    // Player Stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    // Game Start/Loop
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            // Round
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            // New Enemy & Stats
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            enemyAttack = randomNumber(10, 14);
        debugger;
            // Fight!
            fight(pickedEnemyName);
            // Shop!
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
//EndGame
var endGame = function () {
// Win or Lose?
    // Win + Score
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {
        // Fight or Skip
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // Skip & Penalty
        if (promptFight === "skip" || promptFight === "SKIP") {
            // Confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + " has decided to skip this fight. Goodbye!");
                // Money Penalty
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney)
                break;
            }
        }
    // Fight!
        // Player attacks Enemy
        var damage = randomNumber(playerAttack - 3, playerAttack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
    // Enemy's health
        // Dead
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            // Award player money for winning
            playerMoney = playerMoney + 20;
            break;
        }
        // Alive
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }
        // Enemy attacks Player
        var damage = randomNumber(enemyAttack - 3, enemyAttack);
        playerHealth = Math.max(0, playerHealth - damage);
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        );
    // Player's health
        // Dead
        if (playerHealth <= 0) {
            window.alert(playerName + " has died!");
            break;
        }
        // Alive
        else {
            window.alert(playerName + " still has " + playerHealth + " health left.");
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
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                //shop(); // Multiple Buy Option
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        // Upgrade Attack
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
                //shop(); // Multiple Buy Option
            }
            else {
                window.alert("You don't have enough money!");
            }
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

// RNG
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
}

// start the game when the page loads
startgame();