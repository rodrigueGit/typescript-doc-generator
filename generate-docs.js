"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yaml = require("js-yaml");
var Handlebars = require("handlebars");
var generateDocs = function () {
    // Load YAML data
    var doc = yaml.load(fs.readFileSync('METADATA/services.yml', 'utf8'));
    // Compile the template
    var templateSource = fs.readFileSync('TEMPLATES/service.hbs', 'utf8');
    var template = Handlebars.compile(templateSource);
    // Generate Markdown for each service
    doc.services.forEach(function (service) {
        var result = template(service);
        fs.writeFileSync("docs/".concat(service.name, ".md"), result);
    });
};
generateDocs();
