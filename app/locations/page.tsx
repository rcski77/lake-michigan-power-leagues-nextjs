import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHeader from "@/app/components/PageHeader";
import { locations } from "@/app/data/locations";

export default function LocationsPage() {
  const makeMapUrl = (addressLines: string[]) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLines.join(", "))}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      <PageHeader 
        title="Locations"
        subtitle="Playing venues, addresses, and seating info"
      />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <div key={loc.name} className="bg-white border-2 border-red-200 rounded-xl shadow-xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-red-900">{loc.name}</h2>
                  <p className="text-sm text-gray-600">Courts {loc.courts}</p>
                </div>
                <Link
                  href={makeMapUrl(loc.addressLines)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Google Maps"
                  title="Open in Google Maps"
                  className="inline-flex items-center gap-1.5 rounded-full border border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300 p-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {/* Map pin icon (outline) */}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a3 3 0 100-6 3 3 0 000 6z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 8c0 7-7 11-7 11S5 15 5 8a7 7 0 1114 0z"/>
                  </svg>
                  {/* Small arrow to indicate action */}
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-1 text-gray-800">
                {loc.addressLines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 border-2 border-red-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 font-bold text-red-900">Seating</div>
                  <div className="p-3 bg-white text-gray-800">
                    <div className="flex items-start gap-2">
                      {loc.seatingAvailable && <span className="text-green-600" aria-hidden="true">✓</span>}
                      <span>{loc.seatingText}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-2 border-red-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 font-bold text-red-900">Apparel</div>
                  <div className="p-3 bg-white text-gray-800">
                    <div className="flex items-start gap-2">
                      {loc.apparel && <span className="text-green-600" aria-hidden="true">✓</span>}
                      <span>
                        {loc.apparel ? "Fine Designs – apparel available on site" : "No tournament apparel sold here"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-2 border-red-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-red-50 font-bold text-red-900">Concessions</div>
                  <div className="p-3 bg-white text-gray-800">
                    <div className="flex items-start gap-2">
                      {loc.concessions && <span className="text-green-600" aria-hidden="true">✓</span>}
                      <span>
                        {loc.concessions ? "Concessions available" : "No concessions available onsite"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
