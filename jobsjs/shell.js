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
        { pattern: /^WELCOME/i, parser: 'screenMainMenu' },
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
            this.comWriten();
            break;
        case 1:
            this.comSales();
            break;
        case 2:
            this.comMarketing();
            break;
        case 3:
            this.comInterpreter();
            break;
        case 4:
            this.comInterpreter();
            break;
        case 5:
            this.comInterpreter();
            break;
        case 6:
            this.wopr();
            break;
        case 7:
            this.gtnw();
            break;
        default:
            OS.output.pushBuffer("FUNCTION NOT IMPLEMENTED\n");
            this.screenMainMenu();
    }

};


classShell.prototype.wopr = function() {
    OS.output.pushBuffer([
        ' ',
        'AN INTERESTING GAME.'
    ]);
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
        "      iTech Media's JOBS      ",
        "            (v1.0)            ",
        '------------------------------',
        '0) WRITER',
        '1) SALES LEAD',
        '2) MARKETING LEAD',
        ' '
    ];

    OS.output.pushBuffer( page0 );
    this.prompt();

};

classShell.prototype.comWriter = function() {

    window.open("/jobs/writer.html","_self");

    this.prompt();

};

classShell.prototype.comSales = function() {

    window.open("/jobs/sales.html","_self");

    this.prompt();

};

classShell.prototype.comMarketing = function() {

    window.open("/jobs/marketing.html","_self");

    this.prompt();

};

classShell.prototype.screenDisconnect = function() {
    OS.output.pushBuffer('CPE 1704 TKS ');
    for (var i=0;i<10;i++) {
        OS.output.pushBuffer(String.fromCharCode(Math.ceil(127*Math.random())));
    }
    OS.output.pushBuffer('NO CARRIER ');
    OS.output = null;
};

classShell.prototype.comInterpreter = function( args ) {
    try {
        // 1. Parse arguments
        var filename = args[1].toLowerCase();
        var extension = filename.split(/\./).pop();

        // 2. Load source code
        $.get('/code/'+filename, (function(extension,source) {
            // 3. Execute
            switch(extension) {
                case 'bas':
                    var BASIC = new classBASIC( OS );
                    BASIC.run( source, this.prompt.bind(this) );
                    break;
                case 'js':
                    OS.output.pushBuffer('JAVASCRIPT NOT RECOGNIZED (yet :)\n');
                    this.prompt();
                    break;
                default:
                    OS.output.pushBuffer('FILETYPE NOT RECOGNIZED.\n');
                    this.prompt();
            }
        }).bind(this,extension)
        ).fail( this.prompt.bind(this) );

    } catch (e) {
        this.prompt();
    }
};


classShell.prototype.comView = function( args ) {
    try {
        // 1. Parse arguments
        var filename = args[1].toLowerCase();
        var extension = filename.split(/\./).pop();

        // 2. Load source code
        $.get('/code/'+filename, (function(extension,source) {
            OS.output.pushBuffer("\n\n" + source + "\n\n");
            this.prompt();
        }).bind(this,extension));

    } catch (e) {
        this.prompt();
    }
};
