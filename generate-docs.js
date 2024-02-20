"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const Handlebars = __importStar(require("handlebars"));
const generateDocs = () => {
    // Load YAML data
    const doc = yaml.load(fs.readFileSync('METADATA/services.yml', 'utf8'));
    // Compile the service template
    const templateSource = fs.readFileSync('TEMPLATES/service.hbs', 'utf8');
    const template = Handlebars.compile(templateSource);
    // Generate Markdown for each service
    doc.services.forEach((service) => {
        const result = template(service);
        fs.writeFileSync(`docs/${service.name}.md`, result);
    });
    // Load YAML data
    const docInfoFlows = yaml.load(fs.readFileSync('METADATA/infoflows.yml', 'utf8'));
    // Compile the service template
    const templateInfoFlowSource = fs.readFileSync('TEMPLATES/infoflows.hbs', 'utf8');
    const templateInfoFlow = Handlebars.compile(templateInfoFlowSource);
    // Generate Markdown for each service
    const result = templateInfoFlow(docInfoFlows);
    fs.writeFileSync(`docs/infoflows.md`, result);
    // Load partial
    Handlebars.registerPartial('mermaid', '{{diagram}}');
    // Compile the service template
    const templateInterfacesSource = fs.readFileSync('TEMPLATES/interfaces.hbs', 'utf8');
    const templateInterfaces = Handlebars.compile(templateInterfacesSource);
    // Generate Markdown for interfaces
    docInfoFlows.diagram = fs.readFileSync('docs/infoflows.md', 'utf8');
    const interfaces = templateInterfaces(docInfoFlows);
    fs.writeFileSync('docs/interfaces.md', interfaces);
};
generateDocs();
