"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (<div className="container-x grid min-h-[70vh] place-content-center gap-5 text-center"><h1 className="font-display text-4xl font-semibold">Something went wrong.</h1><p className="text-mute">Please try again.</p><button onClick={reset} className="btn btn-lime mx-auto">Try again</button></div>);
}
