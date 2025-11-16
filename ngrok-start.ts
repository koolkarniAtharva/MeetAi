import ngrok from 'ngrok';

(async function() {
  try {
    const url = await ngrok.connect({
      addr: 3000,
      authtoken: '342tbzhCW78OTycGwwXxPTodm2u_28LfRyLEHmrvHEF2YevQm',
      domain: 'unsubtle-alan-proadvertizing.ngrok-free.dev'
    });
    console.log(`ngrok tunnel opened at: ${url}`);
    console.log('Press Ctrl+C to stop');
  } catch (error) {
    console.error('Error starting ngrok:', error);
    process.exit(1);
  }
})();

process.on('SIGINT', async () => {
  console.log('\nStopping ngrok...');
  await ngrok.kill();
  process.exit(0);
});