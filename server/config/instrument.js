import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: "https://85f0b34ba30a624fd31ea418b5ab6ee0@o4509628663332864.ingest.us.sentry.io/4509628669427712",
    integrations: [Sentry.mongooseIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

// ✅ You can remove these lines unless you're specifically using them
// Sentry.profiler.startProfiler();
// Sentry.startSpan({
//     name: "My first transaction"
// }, () => {});
// Sentry.profiler.stopProfiler();// 
