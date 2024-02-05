import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as Handlebars from 'handlebars';

const generateDocs = () => {
    // Load YAML data
    const doc = yaml.load(fs.readFileSync('METADATA/services.yml', 'utf8')) as any;

    // Compile the template
    const templateSource = fs.readFileSync('TEMPLATES/service.hbs', 'utf8');
    const template = Handlebars.compile(templateSource);

    // Generate Markdown for each service
    doc.services.forEach((service: any) => {
        const result = template(service);
        fs.writeFileSync(`docs/${service.name}.md`, result);
    });
};

generateDocs();