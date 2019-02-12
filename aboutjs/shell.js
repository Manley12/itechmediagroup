var classShell = function() {

    this.PROMPT = ']';

    this.start = function() {
        this.screenMainMenu();
    };

    this.prompt = function() {
        OS.output.pushBuffer(this.PROMPT);
        OS.input.lineListeners.push( this.processMainMenu.bind(this) );
    };

    this.parsePatterns = [
        { pattern: /^\s*$/, parser: 'prompt' },
        { pattern: /^([0-9])$/, parser: 'comScreen' },
        { pattern: /^WELCOME/i, parser: 'screenMainMenu' }
    ];

};

classShell.prototype.processMainMenu = function( stdin ) {

    for (var i=0;i<this.parsePatterns.length;i++) {
        var matches = stdin.match(this.parsePatterns[i].pattern);
        if (matches) {
            this[this.parsePatterns[i].parser].call(this,matches);
            return;
        }
    }

    OS.output.pushBuffer("YOU MUST ENTER A VALID COMMAND, OR A NUMBER (0-6). PLEASE TRY AGAIN.\n");
    this.prompt();
    return;

};


classShell.prototype.comScreen = function( args ) {

    stdin = args[1];
    switch (parseInt(stdin)) {
        case 0:
            this.comDiscord();
            break;
        case 1:
            this.comAbout();
            break;
        case 2:
            this.comTurtle();
            break;
        case 3:
            this.comRaven();
            break;
        case 4:
            this.comNodes();
            break;
        case 5:
            this.comNanda();
            break;
        case 6:
            this.wopr();
            break;
        case 7:
            this.gtnw();
            break;
        case 8:
            this.jobs();
            break;
        default:
            OS.output.pushBuffer("FUNCTION NOT IMPLEMENTED\n");
            this.screenMainMenu();
    }

};


classShell.prototype.wopr = function() {
    OS.output.pushBuffer(['AN INTERESTING GAME.']);
    window.setTimeout( (function() {
        OS.output.pushBuffer(['THE ONLY WINNING MOVE IS NOT TO PLAY.\n']);
        this.prompt();
    }).bind(this), 2000);
};


classShell.prototype.gtnw = function() {
    OS.output.pushBuffer([
        '********* SELECT INITIAL STRATEGY ********',' ',
        '1. US first strike          21. Nicaraguan thrust ',
        '2. USSR first strike        22. Greenland domestic ',
        '3. NATO / Warsaw Pact       23. Iceland heavy ',
        '4. Far East strategy        24. Kenya option ',
        '5. US USSR escalation       25. Pacific defense',
        '6. Middle East war          26. Uganda maximum ',
        '7. USSR - China attack      27. Thai subversion ',
        '8. India Pakistan war       28. Romanian strike ',
        '9. Mediterranean war        29. Pakistan sovereignty ',
        '10. Hongkong variant        30. Afghan misdirection',
        '11. SEATO decapitating      31. Thai variation ',
        '12. Cuban provocation       32. Northern territorial ',
        '13. Inadvertent             33. Polish paramilitary ',
        '14. Atlantic heavy          34. S.African offensive ',
        '15. Cuban paramilitary      35. Panama misdirection',
        '16. Nicaraguan preemptive   36. Scandinavian domestic ',
        '17. Pacific territorial     37. Jordan preemptive ',
        '18. Burmese theatrewide     38. English thrust ',
        '19. Turkish decoy           39. Burmese maneuver ',
        '20. NATO recursion          40. Spain counter',
        ' '
    ]);
    this.prompt();
};

classShell.prototype.screenMainMenu = function() {

    var page0 = [
        ' ',
        '------------------------------',
        "  iTech Media's WEB TERMINAL  ",
        "            (v1.0)            ",
        '------------------------------',
        '0) HOME',
        '1) ',
        ' '
    ];

    OS.output.pushBuffer( page0 );
    this.prompt();

};
