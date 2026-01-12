const { source } = require('./lib/source');

// Need to mock or ensure environment is correct for this to run in node directly if relying on webpack stuff
// Actually better to run as a route or just check the code logic.
// But let's look at the output via a console log in the page or a route.

console.log('Keys:', Object.keys(source.pageTree));
if (source.pageTree['en']) {
    console.log('EN Tree:', JSON.stringify(source.pageTree['en'], null, 2));
}
if (source.pageTree['zh']) {
    console.log('ZH Tree:', JSON.stringify(source.pageTree['zh'], null, 2));
}
