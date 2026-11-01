const [major,minor]=process.versions.node.split('.').map(Number);
if(major<20||(major===20&&minor<9)){
 console.error(`VELORA requires Node.js 20.9 or newer. Your version is ${process.version}. Install Node.js 22 LTS or newer, then run npm ci.`);
 process.exit(1);
}
