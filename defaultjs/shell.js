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
        { pattern: /^HELP/i, parser: 'comHelp' },
        { pattern: /^WELCOME/i, parser: 'screenMainMenu' },
        {pattern: /^ADMIN/i, parser: 'admin' },
        {pattern: /^TURTLE ADMIN/i, parser: 'comTurtleAdmin' },
        {pattern: /^RAVEN ADMIN/i, parser: 'comRavenAdmin' },
        {pattern: /^DISCORD/i, parser: 'comDiscord' },
        {pattern: /^DISCORD CHANNEL/i, parser: 'comDiscord' },
        {pattern: /^DISCORDCHANNEL/i, parser: 'comDiscord' },
        {pattern: /^ABOUT/i, parser: 'comAbout' },
        {pattern: /^TURTLE/i, parser: 'comTurtle'},
        {pattern: /^RAVEN/i, parser: 'comRaven'},
        {pattern: /^NODES/i, parser: 'comNodes' },
        {pattern: /^NOTES/i, parser: 'comNanda' },
        {pattern: /^NOTES AND/i, parser: 'comNanda' },
        {pattern: /^NOTESAND/i, parser: 'comNanda' },
        {pattern: /^NOTES AND ANNOUCEMENTS/i, parser: 'comNanda' },
        {pattern: /^NOTESANDANNOUCEMENTS/i, parser: 'comNanda' },
        {pattern: /^NOTES ANDANNOUCEMENTS/i, parser: 'comNanda' },
        {pattern: /^NOTESAND ANNOUCEMENTS/i, parser: 'comNanda' },
        {pattern: /^GLOBAL/i, parser: 'gtnw' },
        {pattern: /^THERMONUCLEAR/i, parser: 'gtnw' },
        {pattern: /^WAR/i, parser: 'gtnw' },
        {pattern: /^GLOBAL WAR/i, parser: 'gtnw' },
        {pattern: /^GLOBALWAR/i, paser: 'gtnw' },
        {pattern: /^GLOBAL THERMONUCLEAR/i, parser: 'gtnw' },
        {pattern: /^GLOBALTHERMONUCLEAR/i, parser: 'gtnw' },
        {pattern: /^THERMONUCLEAR WAR/i, parser: 'gtnw' },
        {pattern: /^THERMONUCLEARWAR/i, parser: 'gtnw' },
        {pattern: /^GLOBAL THERMONUCLEAR WAR/i, parser: 'gtnw' },
        {pattner: /^GLOBALTHERMONUCLEAR WAR/i, parser: 'gtnw' },
        {pattern: /^GLOBAL THERMONUCLEARWAR/i, parser: 'gtnw' }
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
        '0) DISCORD CHANNEL',
        '1) ABOUT',
        '2) iTECH NEWS',
        '3) COMING SOON!',
        '4) ARCHIVE',
        '5) NOTES AND ANNOUCEMENTS',
        '6) GLOBAL THERMONUCLEAR WAR',
        '8) JOBS',
        ' '
    ];

    OS.output.pushBuffer( page0 );
    this.prompt();

};

classShell.prototype.comResume = function() {
    OS.output.pushBuffer([ '...Loading CV...' ]);
    var l = Math.max(0,parseInt($(window).width()/2-300));
    var t = Math.max(0,parseInt($(window).height()/2-400));
    window.open('http://ryanroper.com/rmroper.pdf','_blank','width=600,height=800,left='+l+',top:'+t);
    this.prompt();
};

classShell.prototype.comHelp = function() {

    var page0 = [
        ' ',
        " Available commands:",
        ' ',
        ' HELP - show this screen',
        ' WELCOME - show welcome screen',
        ' ', /*
        ' RUN [filename] - load and execute program (type "CATALOG" to list)',
        ' LIST [filename] - show program source code',
        ' LOAD [filename] - load program into memory',
        ' CATALOG - list available files',
        ' '*/
    ];

    OS.output.pushBuffer( page0 );
    this.prompt();

};

classShell.prototype.comAbout = function() {

    window.open("about.html","_self");

    this.prompt();

};

classShell.prototype.comNanda = function() {

    window.open("nanda.html","_self");

    this.prompt();

};

classShell.prototype.comNodes = function() {

    window.open("archives.html","_self");

    this.prompt();

};

classShell.prototype.admin = function() {

    OS.output.pushBuffer([
        ' ',
        'TURTLE ADMIN',
        'RAVEN ADMIN',
        ' '
    ])

    this.prompt();

};

classShell.prototype.comDiscord = function() {

    window.open("https://discord.gg/gaDYSKj","_self");

    this.prompt();

};

classShell.prototype.comTurtleAdmin = function() {

    window.open("http://turtle.psrcrypto.com/admin.html","_self");

    this.prompt();

};

classShell.prototype.comRavenAdmin = function() {

    window.open("http://pool.raven.psrcrypto.com:8000/admin","_self");

    this.prompt();

};

classShell.prototype.jobs = function() {
  
    window.open("jobs.html","_self");
    
    this.prompt();
    
};

classShell.prototype.comContact = function() {
    OS.output.pushBuffer([
        'D.O.D. PENSION FILES INDICATE CURRENT MAILING AS: ',
        ' ',
        'ROPER, RYAN M',
        'LENEXA, KANSAS',
        'sysop' + '@' + 'ryanroper' + '.' + 'c' + 'om',
        '(720) 257-9266'
    ]);
    this.prompt();
};

classShell.prototype.comTurtle = function() {

    window.open("https://newsitech.weebly.com/","_self"); 
    OS. output.pushBuffer([
        ' '
    ])
    this.prompt();

};

classShell.prototype.comRaven = function() {
    
    window.open("index.html","_self"); 
    OS. output.pushBuffer([
        ' '
    ])
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
