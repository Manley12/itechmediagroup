
var classOS = function ( config ) {

    log('OS 1.0');
    this.output = null;
    this.input = null;

    if ('object' === typeof(config)) {
        hydrate(this,config);
    }

};


var classOutput = function( config ) {

    this.APPLE = String.fromCharCode(174);
    this.CRLF = "\n";

    this.output = '';
    this.outputBuffer = '';
    this.audioBuffer = '';
    this.loaded = false;
    this.config = {
        bufferDelay: 20,
        cursorDelay: 800
    };

    this.sound = function ( len ) {

        var tag;
        var filename = '/audio/' + len;

        // Prefer HTML5 audio
        tag = document.createElement('audio');
        if (typeof tag.canPlayType === 'function') {
            tag.setAttribute('preload', 'true');
            if (tag.canPlayType('audio/mp3')) {
                tag.setAttribute('src', filename + '.mp3');
            } else if (tag.canPlayType('audio/ogg')) {
                tag.setAttribute('src', filename + '.ogg');
            } else if (tag.canPlayType('audio/wav')) {
             tag.setAttribute('src', filename + '.wav');
            }
            tag.play();
            //this.play = function() { tag.play(); };
            //this.stop = function() { tag.pause(); tag.currentTime = 0; };
            return;
        }

        // Fallback for IE<9
        tag = document.createElement('bgsound');
        if ('loop' in tag) {
            tag.src = filename + '.wav';
            tag.loop = 1;
            document.body.appendChild(tag);
            //this.play = function() { document.body.appendChild(tag); };
            //this.stop = function() { document.body.removeChild(tag); };
            return;
        }

    };

    this.$cursor = $('#cursor');

    this.bufferTimer = false;
    this.cursorTimer = false;


    if ('object' === typeof(config)) {
        hydrate(this.config,config);
    }

    this.cursorTimer = window.setInterval( this._blinkCursor.bind(this), this.config.cursorDelay );
    this.bufferTimer = window.setInterval( this._unshiftBuffer.bind(this), this.config.bufferDelay );

};

classOutput.prototype.deleteChar = function ( n ) {

    var output = this.$cursor.parent().html();
    var cursorPos = output.indexOf( this.$cursor.get(0).outerHTML);
    output = output.substring(0,cursorPos-1) + output.substring(cursorPos);
    this.$cursor.parent().html( output );
    this.$cursor = $('#cursor');

};

classOutput.prototype.pushBuffer = function ( str ) {
    if ('object' === typeof(str)) {
        str = str.join( this.CRLF ) + this.CRLF;
    }
    this.outputBuffer += str;
    this.output += str;
    return this.outputBuffer;
};

classOutput.prototype._unshiftBuffer = function () {
    if (this.outputBuffer.length) {
        var nextChar = this.outputBuffer.charAt(0);
        var pos = this.$cursor.offset();
        if (pos.left+20>$(window).width()) {
            this.$cursor.before( "\n" );
        }
        this.$cursor.before( nextChar );
        this.outputBuffer = this.outputBuffer.substring(1);

        if ((!this.outputBuffer.length) && (! nextChar.match(/\s/))) {
            this.sound(1);
        } else if (nextChar.match(/\s/)) {
            var nextWord = this.outputBuffer.replace(/\n/g,' ').replace(/\s.*/,'');
            var wordLength = nextWord.length;
            var n=Math.pow(2, Math.ceil(Math.log(wordLength)/Math.log(2)));
            this.sound(n || 1);
        }
        $(window).scrollTop($(document).height());
    }
};

classOutput.prototype._blinkCursor = function () {
    var cursorCode = 167;
    var $cursor = this.$cursor;
    if (cursorCode==$cursor.html().charCodeAt(0)) {
        $cursor.html($cursor.data('content'));
    } else {
        $cursor.data('content',$cursor.html() || ' ');
        $cursor.html(String.fromCharCode(cursorCode));
    }
};


var classInput = function( config ) {

    this.inputBuffer = [];
    this.charListeners = [];
    this.lineListeners = [];
    this.isShift = false;
    this.config = {
    };

    if ('object' === typeof(config)) {
        hydrate(this.config,config);
    }

    $(document).keydown( (function(e) {
        //e.preventDefault();
        if (8 == e.keyCode) {
            e.preventDefault();
        }

        if (16 == e.keyCode) {
            this.isShift = true;
        } else {
            this._keypress( e.keyCode );
        }

//        return false;
    }).bind(this) );


    $(document).keyup( (function(e) {
        if (16 == e.keyCode) { this.isShift = false; }
        e.preventDefault();
    }).bind(this) );


};

classInput.prototype.appendBuffer = function (chr) {
    OS.output.pushBuffer(chr);
};

classInput.prototype.subtractBuffer = function (n) {
    OS.output.deleteChar.call(OS.output,n);
};

classInput.prototype._keypress = function (code) {
  //  log(code); log(this.isShift);

    var shiftMap = {
      48: 41,
      49: 33,
      50: 64,
      51: 35,
      52: 36,
      53: 37,
      54: 94,
      55: 38,
      56: 42,
      57: 40,
      59: 58,
      39: 34
    };

    var altMap = {
        190: 46
    };

    if (code>=32 && code<=255) {
        if (code==91) {
            return;
        }
        if (code>=65 && code<=90) {
            code = code + (this.isShift ? 0 : 32);
        } else if (this.isShift && shiftMap[code]) {
            code = shiftMap[code];
        } else if (altMap[code]) {
            code = altMap[code];
        }
        var chr = String.fromCharCode(code);
        this.appendBuffer(chr);

        if (! this.inputBuffer.length) {
            this.inputBuffer.push('');
        }
        this.inputBuffer[this.inputBuffer.length-1] += chr;

    } else if (code == 8) {  // Backspace
        this.subtractBuffer(1);
        if (this.inputBuffer.length) {
            var n = this.inputBuffer.length-1;
            this.inputBuffer[n] = this.inputBuffer[n].substring(0,this.inputBuffer[n].length-1);
        }
    } else if (code == 13) {
        this.appendBuffer("\n");
        this.inputBuffer.push('');
        if (this.lineListeners.length) {
            var listener = this.lineListeners.shift();
            var line = this.inputBuffer.shift();
            listener(line);
        }
    }

    return false;
};


//--------------------------------------------------------------------------------
// Ryan's utility functions

var fnull = function (){};
var pagereload = function () { window.location.reload(); }

var hydrate = function ( obj, objProperties ) {
    if ('object' === typeof(objProperties)) {
        for (var key in objProperties) {
            obj[key] = objProperties[key];
        }
    }
}

var var_dump = function( x ) {
    if ('string'==typeof(x) || 'function'!==typeof($.toJSON)) {
        return x;
    } else {
        return $.toJSON(x);
    }
};

var log = function ( x ) {
    try {
        console.info( x );
    } catch (e) { }
    return false;
};

var merge = $.extend;   // Borrow jQuery functionality

var coalesce = function() {
    i = 0;
    while (i<arguments.length && (('undefined' == typeof(arguments[i])) || !arguments[i])) { i++; }
    return arguments[i];
};

// LZW compression, courtesy of http://jsolait.net/
// Available under LGPL
function compress(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

function decompress(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

function pad(x,n) {
    var m = n-String(parseInt(x)).length;
    return m>0 ? Array(m+1).join('0') + x : x;
}

function padRight(x,n) {
    var m = n-String(parseInt(x)).length;
    return m>0 ? '' + x + Array(m+1).join('0') : x;
}
var padLeft = pad;



function changeFirstCharToUpper(str)
{
    return str.charAt(0).toUpperCase() + str.substring(1,str.length).toLowerCase();
}

function getDate( timestamp ) {
    var d = new Date(timestamp*1000);
    return timestamp ? pad( d.getMonth()+1, 2) + '/' + pad( d.getDate(), 2) + '/' + d.getFullYear() : '';
}

function getDatestamp( timestamp ) {
    var d = new Date(timestamp*1000);
    return '' + d.getFullYear() + '-' + pad( d.getMonth()+1, 2) + '-' + pad( d.getDate(), 2);
}


// Recursively interprets a dot-path parameter of an object
function path( obj, fullPath ) {
        var arrPath = fullPath.split('.');
        if (! obj) { return null; }
        if ('undefined' == obj[arrPath[0]]) { return null; }
        return (1==arrPath.length) ? obj[arrPath[0]] : path(obj[arrPath[0]],arrPath.slice(1).join('.'));
}


// Adapted by rroper from PrototypeJS :)
Function.prototype.bind = function(context) {
    if (arguments.length < 1) return this;
    var __method = this, args = Array.prototype.slice.call(arguments,1);
    return function() {
      var a = Array.prototype.slice.call(arguments);
      return __method.apply(context, args.concat(a));
    }
};

//Adapted by rroper
Function.prototype.curry = function() {
    var __method = this, args = Array.prototype.slice.call(arguments,0);
    return function() {
      var a = Array.prototype.slice.call(arguments);
      return __method.apply(null, args.concat(a));
    }
};


//---------------------------------
