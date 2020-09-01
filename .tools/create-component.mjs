import fs from 'fs';
import { dirname, resolve } from 'path';

function toKebab(str = '') {
  return str
    .replace(/^(.)/, ($1) => $1.toLowerCase())
    .replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
}

const template = (params) => `import React from 'react';
import styled from 'styled-components';

export interface I${params.name}Props {};

interface I${params.name}StyleProps {};

const ${params.name}Style = styled.div<I${params.name}StyleProps>\`\`;

export const ${params.name}: React.FC<I${params.name}Props> = props => {
  return (
    <${params.name}Style>
      <div />
    </${params.name}Style>
  );
};
`;

const storybookTemplate = (params) => `import React from 'react';
import { I${params.name}Props, ${params.name} } from './${toKebab(
  params.name
)}';
import { Story } from '@storybook/react/types-6-0';

const Template: Story<I${params.name}Props> = function(args) {
  return <${params.name} {...args} />
}

export default {
  title: '${params.name}',
  component: ${params.name},
}

export const Normal = Template.bind({});
Normal.args = {};
`;

function writeFileRecursive(data = '', absPath = '') {
  fs.mkdirSync(dirname(absPath), { recursive: true });
  fs.writeFileSync(absPath, data);
}

const componentName = process.argv[2]
const folderName = toKebab(componentName)
const modulePath = resolve(process.cwd(), 'src', 'components', folderName)


console.log(
  'write file to',
  modulePath
);

writeFileRecursive(template({name: componentName}), resolve(modulePath, `${folderName}.tsx`))
writeFileRecursive(storybookTemplate({name: componentName}), resolve(modulePath, `${folderName}.stories.tsx`))
