import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="empty-state not-found">
      <p className="eyebrow">A LITTLE LOST?</p>
      <h1>
        Let’s find your
        <br />
        <em>beautiful beginning.</em>
      </h1>
      <p>We couldn’t find that invitation.</p>
      <Link className="button" href="/templates">
        Back to the collection →
      </Link>
    </main>
  );
}
