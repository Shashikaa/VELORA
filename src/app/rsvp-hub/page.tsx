"use client";
import { Download, Heart, Users, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useWedding } from "@/context/WeddingContext";
import { TEMPLATES } from "@/data/templates";
import { downloadText } from "@/lib/invitation";
export default function Responses() {
  const { responses, clearResponses } = useWedding();
  const accepted = responses.filter((r) => r.attending);
  const field = (value: unknown) => {
    const s = String(value);
    return (
      '"' + (/^[=+\-@\t\r]/.test(s) ? "'" : "") + s.replace(/"/g, '""') + '"'
    );
  };
  return (
    <main id="main" className="responses-page section-pad">
      <p className="eyebrow">YOUR LITTLE PRACTICE RUN</p>
      <h1>
        Demo <em>responses.</em>
      </h1>
      <p>
        Responses submitted in invitation previews on this browser. This is a
        local demonstration, not a shared guest management service.
      </p>
      <div className="response-stats">
        <div>
          <Heart size={20} />
          <strong>{responses.length}</strong>
          <span>Responses</span>
        </div>
        <div>
          <Check size={20} />
          <strong>{accepted.length}</strong>
          <span>Accepted</span>
        </div>
        <div>
          <Users size={20} />
          <strong>{accepted.reduce((s, r) => s + r.guests, 0)}</strong>
          <span>Guests attending</span>
        </div>
      </div>
      {responses.length ? (
        <>
          <div className="response-actions">
            <button
              className="button outline"
              onClick={() =>
                downloadText(
                  "\uFEFF" +
                    [
                      [
                        "Name",
                        "Attendance",
                        "Guests",
                        "Design",
                        "Note",
                        "Date",
                      ],
                      ...responses.map((r) => [
                        r.name,
                        r.attending ? "Accepted" : "Declined",
                        r.guests,
                        r.templateId,
                        r.note,
                        r.createdAt,
                      ]),
                    ]
                      .map((row) => row.map(field).join(","))
                      .join("\r\n"),
                  "velora-demo-responses.csv",
                  "text/csv;charset=utf-8",
                )
              }
            >
              <Download size={15} /> Export CSV
            </button>
            <button
              className="text-link"
              onClick={() => {
                if (
                  window.confirm("Clear all demo responses from this device?")
                )
                  clearResponses();
              }}
            >
              Clear demo data
            </button>
          </div>
          <div className="response-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Design</th>
                  <th>Response</th>
                  <th>Guests</th>
                  <th>A little note</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((r) => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>
                      {TEMPLATES.find((t) => t.id === r.templateId)?.name}
                    </td>
                    <td>
                      {r.attending
                        ? "Joyfully accepts"
                        : "Regretfully declines"}
                    </td>
                    <td>{r.guests}</td>
                    <td>{r.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <Heart size={30} />
          <h2>A little quiet for now.</h2>
          <p>Try an invitation and submit a demo RSVP. It will appear here.</p>
          <Link className="button" href="/templates">
            Explore invitations <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </main>
  );
}
