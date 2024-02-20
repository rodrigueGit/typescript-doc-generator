import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as Handlebars from 'handlebars';

const generateDocs = () => {
    // Load YAML data
    const doc = yaml.load(fs.readFileSync('METADATA/services.yml', 'utf8')) as any;

    // Compile the service template
    const templateSource = fs.readFileSync('TEMPLATES/service.hbs', 'utf8');
    const template = Handlebars.compile(templateSource);

    // Generate Markdown for each service
    doc.services.forEach((service: any) => {
        const result = template(service);
        fs.writeFileSync(`docs/${service.name}.md`, result);
    });

    // Load YAML data
    const docInfoFlows = yaml.load(fs.readFileSync('METADATA/infoflows.yml', 'utf8')) as any;

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