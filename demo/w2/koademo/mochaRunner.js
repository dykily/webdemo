const Mocha = require("mocha");
const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions:{
        reportDir: './docs/mochawesome-reporter',
    }
});
mocha.addFile("./test/api.spec.js");
mocha.run(function(res){
    console.log("---- done ----");
    console.log(res);
    process.exit();
});