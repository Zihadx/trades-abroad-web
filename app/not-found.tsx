import Link from "next/link";
export default function NotFound() { return (<div className="container-x grid min-h-[70vh] place-content-center gap-6 text-center"><h1 className="font-display text-6xl font-semibold">404</h1><p className="text-mute">That page isn’t on the map.</p><Link href="/" className="btn btn-lime mx-auto">Back home</Link></div>); }
