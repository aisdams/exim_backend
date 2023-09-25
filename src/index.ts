import buildServer from './server';
import prisma from './utils/prisma';

const app = buildServer();

async function main() {
  prisma.$on('query', (e) => {
    console.log('Query: ' + e.query);
    console.log('Params: ' + e.params);
    console.log('Duration: ' + e.duration + 'ms');
  });

  try {
    app.listen({ port: 8089 });
    console.log(`Server ready at http://localhost:8089`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
