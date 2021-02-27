class Game{
    constructor(){

    }

    //reading the gamestate
    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data){ //function with no name is called an anonymous function
            gameState = data.val(); //data.val() gives the data in JSON format
        })
    }

    update(state){
        database.ref("/").update({
            gameState: state
        })
    }

    start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }
    }

    play(){
        form.hide();
        textSize(30)
        text("Game Start", 120, 100);

        Player.getPlayerInfo();
        
        //allPlayers =>
        //player1: {distance:0,name:"NAme1"}
        //player2: {distance:0, name:"Name2"}
        if(allPlayers!== undefined){//when there is information inside the "players" node
            var display_position = 130;
            
            for(var plr in allPlayers){ //plr: player1,player2,player3,player4
                if(plr === "player" + player.index){
                    fill("red")
                }
                else{
                    fill("black")
                }
                textSize(15)
                text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position)
                display_position = display_position + 20;
            }
        }

        if(keyDown(UP_ARROW) && player.index!== null){
            player.distance = player.distance + 50
            player.update();
        }
    }
}