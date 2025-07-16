import Resolver from '@forge/resolver';

const resolver = new Resolver();

resolver.define('getText', (req: any): string => {
  console.log(req);
  return 'Hello, world!';
});

export const handler: any = resolver.getDefinitions();
