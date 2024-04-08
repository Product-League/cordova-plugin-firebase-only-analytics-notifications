var fs = require('fs');
var path = require('path');

module.exports = function(context) {
    var gradlePropertiesPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'gradle.properties');

    fs.readFile(gradlePropertiesPath, 'utf8', function(err, data) {
        if (err) {
            console.error("Error reading gradle.properties:", err);
            return;
        }

        if (data.indexOf('android.enableJetifier=true') === -1) {
            data += '\nandroid.enableJetifier=true\n';

            fs.writeFile(gradlePropertiesPath, data, 'utf8', function(err) {
                if (err) {
                    console.error("Error writing to gradle.properties:", err);
                } else {
                    console.log("Added android.enableJetifier=true to gradle.properties");
                }
            });
        } else {
            console.log("android.enableJetifier=true already exists in gradle.properties");
        }
    });
};
