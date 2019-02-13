// Global variable OS
var OS = null;

$(document).ready(function() {

    var output = new classOutput();
    var input = new classInput();

    OS = new classOS( {
        output: output,
        input: input
    });

    OS.output.pushBuffer([
        'iTech Media Group>',
        ' JOBS',
        '  '
    ]);

    var shell = new classShell();
    shell.start();

});
