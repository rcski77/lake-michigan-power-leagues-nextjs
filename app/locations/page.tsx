import Link from "next/link";
import Image from "next/image";
import { unstable_cache } from "next/cache";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import PageHeader from "@/app/components/PageHeader";
import WaveDivider from "../components/WaveDivider";
import { client } from "@/src/sanity/client";
import { BanknotesIcon, CreditCardIcon } from "@heroicons/react/24/outline";

// Revalidate page every 1 hour (ISR - Incremental Static Regeneration)
export const revalidate = 3600;

interface SanityLocation {
  _id: string;
  locationName: string;
  addressLine1: string;
  addressLine2: string;
  seating?: string;
  concessions?: boolean;
  paymentMethods?: string[];
}

// Cache locations for 1 hour (3600 seconds)
const getLocations = unstable_cache(
  async (): Promise<SanityLocation[]> => {
    const query = `*[_type == "location"] | order(locationName asc)`;
    return await client.fetch(query);
  },
  ["locations"],
  { revalidate: 3600 }
);

export default async function LocationsPage() {
  const sanityLocations = await getLocations();

  const makeMapUrl = (addressLines: string[]) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLines.join(", "))}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Navbar />
      <PageHeader 
        title="Locations"
        subtitle="Playing venues, addresses, and seating info"
      />

      <WaveDivider />

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sanityLocations.map((loc) => (
            <div key={loc._id} className="bg-white border-2 border-orange-200 rounded-xl shadow-xl p-6 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-orange-900">{loc.locationName}</h2>
                </div>
                <Link
                  href={makeMapUrl([loc.addressLine1, loc.addressLine2])}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open in Google Maps"
                  title="Open in Google Maps"
                  className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
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
                <p>{loc.addressLine1}</p>
                <p>{loc.addressLine2}</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="grid grid-cols-1 border-2 border-orange-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-orange-50 font-bold text-orange-900">Seating</div>
                  <div className="p-3 bg-white text-gray-800">
                    <div className="flex items-start gap-2">
                      {loc.seating && <span className="text-green-600" aria-hidden="true">✓</span>}
                      <span>{loc.seating || "Information not available"}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-2 border-orange-300 rounded-lg overflow-hidden">
                  <div className="p-3 bg-orange-50 font-bold text-orange-900">Concessions</div>
                  <div className="p-3 bg-white text-gray-800">
                    <div className="flex items-start gap-2">
                      {loc.concessions && <span className="text-green-600" aria-hidden="true">✓</span>}
                      <span>
                        {loc.concessions ? "Concessions available" : "No concessions available onsite"}
                      </span>
                    </div>
                  </div>
                </div>
                {loc.paymentMethods && loc.paymentMethods.length > 0 && (
                  <div className="grid grid-cols-1 border-2 border-orange-300 rounded-lg overflow-hidden">
                    <div className="p-3 bg-orange-50 font-bold text-orange-900">Payment Methods</div>
                    <div className="p-3 bg-white text-gray-800">
                      <div className="flex flex-wrap items-center gap-3">
                        {loc.paymentMethods.map((method) => (
                          <div
                            key={method}
                            title={method.replace(/_/g, " ")}
                            className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            {method === "google_pay" && (
                              <Image
                                src="/google-pay-mark_800.svg"
                                alt="Google Pay"
                                width={84}
                                height={84}
                                className="h-6 w-auto scale-175 origin-center"
                              />
                            )}
                            {method === "apple_pay" && (
                              <Image
                                src="/Apple_Pay_Mark_RGB_041619.svg"
                                alt="Apple Pay"
                                width={56}
                                height={56}
                                className="h-6 w-auto"
                              />
                            )}
                            {method === "cash" && (
                              <BanknotesIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
                            )}
                            {method === "credit_card" && (
                              <CreditCardIcon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                            )}
                            {method === "venmo" && (
                              <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19.5 1h-15C3.12 1 1 3.12 1 5.5v13C1 20.88 3.12 23 5.5 23h13c2.38 0 4.5-2.12 4.5-4.5v-13C23 3.12 20.88 1 19.5 1zm-3.34 15.5c-1.46 1.46-3.8 2.28-5.66 2.28-1.86 0-4.2-.82-5.66-2.28C3.38 15.04 2.56 12.7 2.56 10.84c0-1.86.82-4.2 2.28-5.66 1.46-1.46 3.8-2.28 5.66-2.28 1.86 0 4.2.82 5.66 2.28 1.46 1.46 2.28 3.8 2.28 5.66 0 1.86-.82 4.2-2.28 5.66z"/>
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
